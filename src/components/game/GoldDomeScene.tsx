import { useEffect, useMemo, useRef, type ReactNode } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, Stars } from "@react-three/drei";
import { Bloom, EffectComposer } from "@react-three/postprocessing";
import * as THREE from "three";
import {
  paintClouds,
  paintDayMap,
  paintLights,
} from "@/lib/game/earth-texture";
import {
  DOME_ANGLE,
  DOME_LAT,
  DOME_LON,
  DOME_R,
  EARTH_R,
  SAT_R,
  latLonToVec,
  vec,
} from "@/lib/game/math";
import {
  TRAIL_POINTS,
  drainVfx,
  sampleMissilePos,
  sim,
  type Missile,
} from "@/lib/game/sim";
import { rayDir, rayOrigin, useGame } from "@/lib/game/store";

const SUN = new THREE.Vector3(-0.25, 0.42, -0.86).normalize();
const DOME_CENTER = new THREE.Vector3();
{
  const c = vec();
  latLonToVec(DOME_LAT, DOME_LON, 1, c);
  DOME_CENTER.set(c.x, c.y, c.z);
}

const CAM = vec();
latLonToVec(DOME_LAT, DOME_LON, 3.2, CAM);

const EARTH_VERT = /* glsl */ `
varying vec3 vN;
varying vec3 vW;
varying vec2 vUv;
void main() {
  vUv = uv;
  vN = normalize((modelMatrix * vec4(normal, 0.0)).xyz);
  vec4 w = modelMatrix * vec4(position, 1.0);
  vW = w.xyz;
  gl_Position = projectionMatrix * viewMatrix * w;
}
`;

const EARTH_FRAG = /* glsl */ `
uniform sampler2D uDay;
uniform sampler2D uLights;
uniform vec3 uSun;
varying vec3 vN;
varying vec3 vW;
varying vec2 vUv;
void main() {
  vec3 n = normalize(vN);
  vec3 day = texture2D(uDay, vUv).rgb;
  vec3 lights = texture2D(uLights, vUv).rgb;
  float ndl = dot(n, normalize(uSun));
  vec3 col = day * (0.045 + 0.95 * max(ndl, 0.0));
  col += day * 0.07 * (ndl * 0.5 + 0.5);
  float night = smoothstep(0.18, -0.08, ndl);
  col += lights * night * 1.65;
  vec3 view = normalize(cameraPosition - vW);
  float fres = pow(1.0 - max(dot(view, n), 0.0), 3.2);
  col += vec3(0.42, 0.58, 0.88) * fres * 0.2;
  gl_FragColor = vec4(col, 1.0);
}
`;

const ATMO_VERT = /* glsl */ `
varying vec3 vN;
varying vec3 vW;
void main() {
  vN = normalize((modelMatrix * vec4(normal, 0.0)).xyz);
  vec4 w = modelMatrix * vec4(position, 1.0);
  vW = w.xyz;
  gl_Position = projectionMatrix * viewMatrix * w;
}
`;

const ATMO_FRAG = /* glsl */ `
varying vec3 vN;
varying vec3 vW;
void main() {
  vec3 n = normalize(vN);
  vec3 view = normalize(cameraPosition - vW);
  float fres = pow(1.0 - abs(dot(view, n)), 2.35);
  vec3 col = mix(vec3(0.28, 0.48, 0.92), vec3(0.78, 0.62, 0.28), 0.22);
  gl_FragColor = vec4(col, fres * 0.5);
}
`;

const DOME_VERT = /* glsl */ `
varying vec3 vN;
varying vec3 vW;
void main() {
  vN = normalize((modelMatrix * vec4(normal, 0.0)).xyz);
  vec4 w = modelMatrix * vec4(position, 1.0);
  vW = w.xyz;
  gl_Position = projectionMatrix * viewMatrix * w;
}
`;

const DOME_FRAG = /* glsl */ `
uniform vec3 uCenter;
uniform float uAngle;
uniform float uTime;
uniform float uPulse;
uniform float uIntegrity;
varying vec3 vN;
varying vec3 vW;
void main() {
  vec3 n = normalize(vW);
  float ang = acos(clamp(dot(n, normalize(uCenter)), -1.0, 1.0));
  if (ang > uAngle) discard;
  vec3 view = normalize(cameraPosition - vW);
  float fres = pow(1.0 - abs(dot(view, normalize(vN))), 1.85);
  float edge = smoothstep(uAngle, uAngle - 0.035, ang);
  float pulse = 0.55 + 0.28 * sin(uTime * 1.35) + uPulse;
  float crack = mix(1.0, 0.55, 1.0 - uIntegrity);
  vec3 gold = mix(vec3(0.88, 0.72, 0.32), vec3(0.75, 0.22, 0.18), 1.0 - uIntegrity);
  float alpha = (0.05 + fres * 0.62) * edge * pulse * crack;
  gl_FragColor = vec4(gold, clamp(alpha, 0.0, 0.85));
}
`;

function makeCanvasTex(
  w: number,
  h: number,
  paint: (ctx: CanvasRenderingContext2D, w: number, h: number) => void,
  srgb = true,
) {
  const c = document.createElement("canvas");
  c.width = w;
  c.height = h;
  const ctx = c.getContext("2d");
  if (!ctx) throw new Error("2d");
  paint(ctx, w, h);
  const tex = new THREE.CanvasTexture(c);
  if (srgb) tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = 8;
  tex.wrapS = THREE.RepeatWrapping;
  tex.needsUpdate = true;
  return tex;
}

function Earth() {
  const day = useMemo(() => makeCanvasTex(1024, 512, paintDayMap), []);
  const lights = useMemo(
    () => makeCanvasTex(1024, 512, paintLights, false),
    [],
  );
  const clouds = useMemo(
    () => makeCanvasTex(256, 128, paintClouds, false),
    [],
  );
  useEffect(() => {
    return () => {
      day.dispose();
      lights.dispose();
      clouds.dispose();
    };
  }, [day, lights, clouds]);

  const uniforms = useMemo(
    () => ({
      uDay: { value: day },
      uLights: { value: lights },
      uSun: { value: SUN },
    }),
    [day, lights],
  );

  const cloudRef = useRef<THREE.Mesh>(null);
  useFrame((_, dt) => {
    if (cloudRef.current) cloudRef.current.rotation.y += dt * 0.004;
  });

  return (
    <group>
      <mesh>
        <sphereGeometry args={[EARTH_R, 64, 48]} />
        <shaderMaterial
          vertexShader={EARTH_VERT}
          fragmentShader={EARTH_FRAG}
          uniforms={uniforms}
        />
      </mesh>
      <mesh ref={cloudRef}>
        <sphereGeometry args={[EARTH_R + 0.012, 48, 32]} />
        <meshBasicMaterial
          map={clouds}
          transparent
          opacity={0.28}
          depthWrite={false}
          side={THREE.DoubleSide}
        />
      </mesh>
      <mesh>
        <sphereGeometry args={[EARTH_R + 0.045, 48, 32]} />
        <shaderMaterial
          vertexShader={ATMO_VERT}
          fragmentShader={ATMO_FRAG}
          transparent
          depthWrite={false}
          side={THREE.BackSide}
        />
      </mesh>
    </group>
  );
}

function buildDomeLattice(): THREE.BufferGeometry {
  const up = DOME_CENTER.clone().normalize();
  const tmp =
    Math.abs(up.y) < 0.92
      ? new THREE.Vector3(0, 1, 0)
      : new THREE.Vector3(1, 0, 0);
  const east = new THREE.Vector3().crossVectors(tmp, up).normalize();
  const north = new THREE.Vector3().crossVectors(up, east).normalize();
  const r = DOME_R;
  const pts: number[] = [];
  const point = (theta: number, phi: number, out: THREE.Vector3) => {
    const c = Math.cos(theta);
    const s = Math.sin(theta);
    out
      .copy(up)
      .multiplyScalar(c * r)
      .addScaledVector(east, Math.cos(phi) * s * r)
      .addScaledVector(north, Math.sin(phi) * s * r);
  };
  const a = new THREE.Vector3();
  const b = new THREE.Vector3();
  const meridians = 20;
  const rings = 7;
  const segs = 10;
  for (let m = 0; m < meridians; m++) {
    const phi = (m / meridians) * Math.PI * 2;
    for (let i = 0; i < segs; i++) {
      point((i / segs) * DOME_ANGLE, phi, a);
      point(((i + 1) / segs) * DOME_ANGLE, phi, b);
      pts.push(a.x, a.y, a.z, b.x, b.y, b.z);
    }
  }
  for (let k = 1; k <= rings; k++) {
    const theta = (k / rings) * DOME_ANGLE;
    const n = 48;
    for (let i = 0; i < n; i++) {
      point(theta, (i / n) * Math.PI * 2, a);
      point(theta, ((i + 1) / n) * Math.PI * 2, b);
      pts.push(a.x, a.y, a.z, b.x, b.y, b.z);
    }
  }
  const geo = new THREE.BufferGeometry();
  geo.setAttribute("position", new THREE.Float32BufferAttribute(pts, 3));
  return geo;
}

function Dome() {
  const matRef = useRef<THREE.ShaderMaterial>(null);
  const lattice = useMemo(() => buildDomeLattice(), []);
  useEffect(() => () => lattice.dispose(), [lattice]);

  const uniforms = useMemo(
    () => ({
      uCenter: { value: DOME_CENTER },
      uAngle: { value: DOME_ANGLE },
      uTime: { value: 0 },
      uPulse: { value: 0 },
      uIntegrity: { value: 1 },
    }),
    [],
  );

  useFrame((_, dt) => {
    const m = matRef.current;
    if (!m) return;
    m.uniforms.uTime.value += dt;
    m.uniforms.uPulse.value = THREE.MathUtils.damp(
      m.uniforms.uPulse.value,
      sim.trauma * 1.4,
      6,
      dt,
    );
    m.uniforms.uIntegrity.value = THREE.MathUtils.damp(
      m.uniforms.uIntegrity.value,
      sim.integrity / 100,
      4,
      dt,
    );
  });

  return (
    <group>
      <mesh>
        <sphereGeometry args={[DOME_R, 64, 48]} />
        <shaderMaterial
          ref={matRef}
          vertexShader={DOME_VERT}
          fragmentShader={DOME_FRAG}
          uniforms={uniforms}
          transparent
          depthWrite={false}
          side={THREE.DoubleSide}
        />
      </mesh>
      <lineSegments geometry={lattice}>
        <lineBasicMaterial
          color="#e0c36a"
          transparent
          opacity={0.55}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </lineSegments>
    </group>
  );
}

function Satellites() {
  const ref = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const axisX = useMemo(() => new THREE.Vector3(1, 0, 0), []);
  const axisY = useMemo(() => new THREE.Vector3(0, 1, 0), []);
  const count = 24;

  useFrame(({ clock }) => {
    const mesh = ref.current;
    if (!mesh) return;
    const t = clock.elapsedTime * 0.07;
    for (let i = 0; i < count; i++) {
      const plane = i % 3;
      const idx = Math.floor(i / 3);
      const raan = (plane * Math.PI * 2) / 3;
      const inc = 0.92;
      const nu = (idx * Math.PI * 2) / 8 + t * (1 + plane * 0.05);
      dummy.position.set(Math.cos(nu) * SAT_R, 0, Math.sin(nu) * SAT_R);
      dummy.position.applyAxisAngle(axisX, inc);
      dummy.position.applyAxisAngle(axisY, raan);
      dummy.lookAt(0, 0, 0);
      dummy.scale.setScalar(0.026);
      dummy.updateMatrix();
      mesh.setMatrixAt(i, dummy.matrix);
    }
    mesh.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={ref} args={[undefined, undefined, count]}>
      <octahedronGeometry args={[1, 0]} />
      <meshStandardMaterial
        color="#e8d5a3"
        emissive="#c9a227"
        emissiveIntensity={0.85}
        metalness={0.8}
        roughness={0.25}
      />
    </instancedMesh>
  );
}

function Batteries() {
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const ref = useRef<THREE.InstancedMesh>(null);
  const n = sim.batteries.length;
  const up = useMemo(() => new THREE.Vector3(0, 1, 0), []);
  const radial = useMemo(() => new THREE.Vector3(), []);
  useEffect(() => {
    const mesh = ref.current;
    if (!mesh) return;
    for (let i = 0; i < n; i++) {
      const p = sim.batteries[i]!;
      dummy.position.set(p.x, p.y, p.z);
      radial.set(p.x, p.y, p.z).normalize();
      dummy.quaternion.setFromUnitVectors(up, radial);
      dummy.scale.set(0.012, 0.028, 0.012);
      dummy.updateMatrix();
      mesh.setMatrixAt(i, dummy.matrix);
    }
    mesh.instanceMatrix.needsUpdate = true;
  }, [dummy, n, up, radial]);
  return (
    <instancedMesh ref={ref} args={[undefined, undefined, n]}>
      <coneGeometry args={[1, 1, 5]} />
      <meshStandardMaterial
        color="#c9a227"
        emissive="#8a6a32"
        emissiveIntensity={0.4}
        metalness={0.7}
        roughness={0.3}
      />
    </instancedMesh>
  );
}

const missileIds = new Int16Array(40);

function kindScale(m: Missile) {
  if (m.kind === "cruise") return 0.048;
  if (m.kind === "hypersonic") return 0.058;
  return 0.07;
}

function Projectiles() {
  const mRef = useRef<THREE.InstancedMesh>(null);
  const iRef = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const look = useMemo(() => new THREE.Vector3(), []);
  const mColor = useMemo(() => new THREE.Color(), []);
  const trailM = useRef<THREE.LineSegments>(null);
  const trailI = useRef<THREE.LineSegments>(null);

  const mGeo = useMemo(() => {
    const g = new THREE.BufferGeometry();
    g.setAttribute(
      "position",
      new THREE.BufferAttribute(
        new Float32Array(40 * (TRAIL_POINTS - 1) * 2 * 3),
        3,
      ),
    );
    return g;
  }, []);
  const iGeo = useMemo(() => {
    const g = new THREE.BufferGeometry();
    g.setAttribute(
      "position",
      new THREE.BufferAttribute(
        new Float32Array(28 * (TRAIL_POINTS - 1) * 2 * 3),
        3,
      ),
    );
    return g;
  }, []);
  const mBody = useMemo(() => {
    const g = new THREE.ConeGeometry(0.7, 2.4, 5);
    g.rotateX(Math.PI / 2);
    return g;
  }, []);
  const iBody = useMemo(() => {
    const g = new THREE.ConeGeometry(0.45, 2.1, 4);
    g.rotateX(Math.PI / 2);
    return g;
  }, []);

  useEffect(
    () => () => {
      mGeo.dispose();
      iGeo.dispose();
      mBody.dispose();
      iBody.dispose();
    },
    [mGeo, iGeo, mBody, iBody],
  );

  useFrame(() => {
    const mm = mRef.current;
    const ii = iRef.current;
    if (!mm || !ii) return;

    let mi = 0;
    const mArr = mGeo.attributes.position.array as Float32Array;
    let mw = 0;
    for (const m of sim.missiles) {
      if (!m.alive) continue;
      dummy.position.set(m.pos.x, m.pos.y, m.pos.z);
      look.set(
        m.pos.x + (m.pos.x - (m.trail[3] ?? m.pos.x)),
        m.pos.y + (m.pos.y - (m.trail[4] ?? m.pos.y)),
        m.pos.z + (m.pos.z - (m.trail[5] ?? m.pos.z)),
      );
      dummy.lookAt(look);
      dummy.scale.setScalar(kindScale(m));
      dummy.updateMatrix();
      mm.setMatrixAt(mi, dummy.matrix);
      if (m.kind === "hypersonic") mColor.set("#ff6a4a");
      else if (m.kind === "cruise") mColor.set("#e8a05c");
      else if (m.kind === "decoy") mColor.set("#a86b4a");
      else mColor.set("#e23d3d");
      mm.setColorAt(mi, mColor);
      missileIds[mi] = m.id;
      const trail = m.trail;
      for (let s = 0; s < TRAIL_POINTS - 1; s++) {
        const a = s * 3;
        const b = (s + 1) * 3;
        mArr[mw++] = trail[a] ?? 0;
        mArr[mw++] = trail[a + 1] ?? 0;
        mArr[mw++] = trail[a + 2] ?? 0;
        mArr[mw++] = trail[b] ?? 0;
        mArr[mw++] = trail[b + 1] ?? 0;
        mArr[mw++] = trail[b + 2] ?? 0;
      }
      mi++;
    }
    mm.count = mi;
    mm.visible = mi > 0;
    mm.instanceMatrix.needsUpdate = true;
    if (mm.instanceColor) mm.instanceColor.needsUpdate = true;
    mGeo.attributes.position.needsUpdate = true;
    mGeo.setDrawRange(0, mw / 3);

    let ij = 0;
    const iArr = iGeo.attributes.position.array as Float32Array;
    let iw = 0;
    for (const ic of sim.interceptors) {
      if (!ic.alive) continue;
      dummy.position.set(ic.pos.x, ic.pos.y, ic.pos.z);
      look.set(
        ic.pos.x + (ic.pos.x - (ic.trail[3] ?? ic.pos.x)),
        ic.pos.y + (ic.pos.y - (ic.trail[4] ?? ic.pos.y)),
        ic.pos.z + (ic.pos.z - (ic.trail[5] ?? ic.pos.z)),
      );
      dummy.lookAt(look);
      dummy.scale.setScalar(0.016);
      dummy.updateMatrix();
      ii.setMatrixAt(ij, dummy.matrix);
      const trail = ic.trail;
      for (let s = 0; s < TRAIL_POINTS - 1; s++) {
        const a = s * 3;
        const b = (s + 1) * 3;
        iArr[iw++] = trail[a] ?? 0;
        iArr[iw++] = trail[a + 1] ?? 0;
        iArr[iw++] = trail[a + 2] ?? 0;
        iArr[iw++] = trail[b] ?? 0;
        iArr[iw++] = trail[b + 1] ?? 0;
        iArr[iw++] = trail[b + 2] ?? 0;
      }
      ij++;
    }
    ii.count = ij;
    ii.visible = ij > 0;
    ii.instanceMatrix.needsUpdate = true;
    iGeo.attributes.position.needsUpdate = true;
    iGeo.setDrawRange(0, iw / 3);
  });

  return (
    <>
      <instancedMesh
        ref={mRef}
        args={[mBody, undefined, 40]}
        frustumCulled={false}
      >
        <meshStandardMaterial
          color="#e23d3d"
          emissive="#c23b3b"
          emissiveIntensity={0.9}
          metalness={0.2}
          roughness={0.4}
        />
      </instancedMesh>
      <instancedMesh
        ref={iRef}
        args={[iBody, undefined, 28]}
        frustumCulled={false}
      >
        <meshStandardMaterial
          color="#f0d78a"
          emissive="#c9a227"
          emissiveIntensity={1.2}
          metalness={0.5}
          roughness={0.25}
        />
      </instancedMesh>
      <lineSegments ref={trailM} geometry={mGeo} frustumCulled={false}>
        <lineBasicMaterial
          color="#ff5a48"
          transparent
          opacity={0.7}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
          toneMapped={false}
        />
      </lineSegments>
      <lineSegments ref={trailI} geometry={iGeo} frustumCulled={false}>
        <lineBasicMaterial
          color="#ffe09a"
          transparent
          opacity={0.85}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
          toneMapped={false}
        />
      </lineSegments>
    </>
  );
}

type Burst = {
  alive: boolean;
  x: number;
  y: number;
  z: number;
  t: number;
  life: number;
  mag: number;
  gold: boolean;
};

function Vfx() {
  const ref = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const color = useMemo(() => new THREE.Color(), []);
  const bursts = useRef<Burst[]>(
    Array.from({ length: 48 }, () => ({
      alive: false,
      x: 0,
      y: 0,
      z: 0,
      t: 0,
      life: 0.6,
      mag: 1,
      gold: true,
    })),
  );

  useFrame((_, dt) => {
    const mesh = ref.current;
    if (!mesh) return;
    for (const e of drainVfx()) {
      if (e.kind !== "intercept" && e.kind !== "impact" && e.kind !== "pulse")
        continue;
      const slot = bursts.current.find((b) => !b.alive) ?? bursts.current[0]!;
      slot.alive = true;
      slot.t = 0;
      slot.life = e.kind === "pulse" ? 0.9 : 0.55;
      slot.mag = e.kind === "pulse" ? 2.4 : e.kind === "impact" ? 1.4 : 0.9;
      slot.gold = e.kind !== "impact";
      if (e.kind === "pulse") {
        slot.x = DOME_CENTER.x * DOME_R;
        slot.y = DOME_CENTER.y * DOME_R;
        slot.z = DOME_CENTER.z * DOME_R;
      } else {
        slot.x = e.x;
        slot.y = e.y;
        slot.z = e.z;
      }
    }
    let n = 0;
    for (const b of bursts.current) {
      if (!b.alive) continue;
      b.t += dt;
      if (b.t >= b.life) {
        b.alive = false;
        continue;
      }
      const k = b.t / b.life;
      const s = b.mag * (0.04 + k * 0.22);
      dummy.position.set(b.x, b.y, b.z);
      dummy.scale.setScalar(s);
      dummy.rotation.set(0, 0, 0);
      dummy.updateMatrix();
      mesh.setMatrixAt(n, dummy.matrix);
      if (b.gold) color.setRGB(1, 0.86, 0.45);
      else color.setRGB(1, 0.28, 0.18);
      color.multiplyScalar(1 - k);
      mesh.setColorAt(n, color);
      n++;
    }
    mesh.count = n;
    mesh.visible = n > 0;
    mesh.instanceMatrix.needsUpdate = true;
    if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;
  });

  return (
    <instancedMesh ref={ref} args={[undefined, undefined, 48]} frustumCulled={false}>
      <sphereGeometry args={[1, 12, 10]} />
      <meshBasicMaterial
        color="#fff4d0"
        transparent
        opacity={0.65}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </instancedMesh>
  );
}

function ShakeGroup({ children }: { children: ReactNode }) {
  const ref = useRef<THREE.Group>(null);
  const reduced = useGame((s) => s.reducedMotion);
  const shakeOn = useGame((s) => s.shake);
  useFrame(({ clock }) => {
    const g = ref.current;
    if (!g) return;
    const trauma = reduced || !shakeOn ? 0 : sim.trauma;
    const s = trauma * trauma;
    const t = clock.elapsedTime * 28;
    g.position.set(
      Math.sin(t * 1.7) * s * 0.045,
      Math.cos(t * 1.9) * s * 0.032,
      Math.sin(t * 2.3) * s * 0.04,
    );
    g.rotation.z = Math.sin(t * 1.3) * s * 0.012;
  });
  return <group ref={ref}>{children}</group>;
}

function SimDriver() {
  useFrame((_, dt) => {
    useGame.getState().tick(Math.min(dt, 0.1));
  });
  return null;
}

function Controls() {
  const phase = useGame((s) => s.phase);
  const cinematic = phase === "title" || phase === "briefing";
  return (
    <OrbitControls
      makeDefault
      enablePan={false}
      enableDamping
      dampingFactor={0.08}
      minDistance={2.05}
      maxDistance={6.8}
      autoRotate={cinematic}
      autoRotateSpeed={0.35}
      rotateSpeed={0.72}
      zoomSpeed={0.7}
      target={[0, 0, 0]}
    />
  );
}

function ClickFire() {
  const { camera, gl } = useThree();
  const down = useRef({ x: 0, y: 0 });
  const ndc = useMemo(() => new THREE.Vector2(), []);
  const raycaster = useMemo(() => new THREE.Raycaster(), []);

  useEffect(() => {
    const el = gl.domElement;
    const onDown = (e: PointerEvent) => {
      down.current.x = e.clientX;
      down.current.y = e.clientY;
    };
    const onUp = (e: PointerEvent) => {
      if (useGame.getState().phase !== "playing") return;
      if (Math.hypot(e.clientX - down.current.x, e.clientY - down.current.y) > 9)
        return;
      const rect = el.getBoundingClientRect();
      ndc.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      ndc.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
      raycaster.setFromCamera(ndc, camera);
      const o = raycaster.ray.origin;
      const d = raycaster.ray.direction;
      rayOrigin.x = o.x;
      rayOrigin.y = o.y;
      rayOrigin.z = o.z;
      rayDir.x = d.x;
      rayDir.y = d.y;
      rayDir.z = d.z;
      useGame.getState().interceptRay(rayOrigin, rayDir);
    };
    el.addEventListener("pointerdown", onDown);
    el.addEventListener("pointerup", onUp);
    return () => {
      el.removeEventListener("pointerdown", onDown);
      el.removeEventListener("pointerup", onUp);
    };
  }, [camera, gl, ndc, raycaster]);
  return null;
}

function Lights() {
  return (
    <>
      <ambientLight intensity={0.18} color="#8a9bb8" />
      <directionalLight
        position={[SUN.x * 8, SUN.y * 8, SUN.z * 8]}
        intensity={2.35}
        color="#fff4e0"
      />
      <pointLight
        position={[DOME_CENTER.x * 1.4, DOME_CENTER.y * 1.4, DOME_CENTER.z * 1.4]}
        intensity={1.6}
        color="#e0c36a"
        distance={4}
      />
      <hemisphereLight args={["#1c2436", "#0a0806", 0.35]} />
    </>
  );
}

export default function GoldDomeScene() {
  const cheap =
    typeof window !== "undefined" &&
    (window.innerWidth < 480 || window.devicePixelRatio > 2.5);

  return (
    <Canvas
      className="gold-dome-canvas absolute inset-0 h-full w-full touch-none"
      dpr={cheap ? [1, 1.25] : [1, 1.75]}
      gl={{
        antialias: !cheap,
        alpha: false,
        powerPreference: "high-performance",
      }}
      camera={{
        position: [CAM.x, CAM.y, CAM.z],
        fov: 42,
        near: 0.08,
        far: 80,
      }}
      onCreated={({ gl, scene }) => {
        gl.setClearColor("#05060a");
        gl.toneMapping = THREE.ACESFilmicToneMapping;
        gl.toneMappingExposure = 1.12;
        scene.background = new THREE.Color("#05060a");
      }}
    >
      <SimDriver />
      <ClickFire />
      <Controls />
      <Lights />
      <Stars
        radius={60}
        depth={30}
        count={cheap ? 900 : 2200}
        factor={2.6}
        saturation={0}
        fade
        speed={0.25}
      />
      <ShakeGroup>
        <Earth />
        <Dome />
        <Satellites />
        <Batteries />
        <Projectiles />
        <Vfx />
      </ShakeGroup>
      {!cheap && (
        <EffectComposer>
          <Bloom
            luminanceThreshold={0.72}
            intensity={0.85}
            mipmapBlur
            luminanceSmoothing={0.2}
          />
        </EffectComposer>
      )}
    </Canvas>
  );
}
