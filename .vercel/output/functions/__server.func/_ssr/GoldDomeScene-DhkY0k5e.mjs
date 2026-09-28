import { i as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { B as Vector2, C as MathUtils, G as require_jsx_runtime, M as RepeatWrapping, N as SRGBColorSpace, O as Object3D, V as Vector3, _ as Float32BufferAttribute, a as useFrame, d as CanvasTexture, f as Color, j as Raycaster, l as BufferAttribute, n as OrbitControls, o as useThree, p as ConeGeometry, r as Canvas, t as Stars, u as BufferGeometry } from "../_libs/@react-three/drei+[...].mjs";
import { a as drainVfx, c as DOME_LAT, d as SAT_R, f as latLonToVec, g as US_FILL, h as CONTINENTS, i as useGame, l as DOME_LON, m as CITY_LIGHTS, n as rayDir, o as sim, p as vec, r as rayOrigin, s as DOME_ANGLE, u as DOME_R } from "./routes-DPMEbfF6.mjs";
import { n as EffectComposer, t as Bloom } from "../_libs/@react-three/postprocessing+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/GoldDomeScene-DhkY0k5e.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function lonLatToXy(lon, lat, w, h) {
	return {
		x: (lon + 180) / 360 * w,
		y: (90 - lat) / 180 * h
	};
}
function hash2(ix, iy) {
	const n = Math.sin(ix * 127.1 + iy * 311.7) * 43758.5453;
	return n - Math.floor(n);
}
function noise2(x, y) {
	const ix = Math.floor(x);
	const iy = Math.floor(y);
	const fx = x - ix;
	const fy = y - iy;
	const ux = fx * fx * (3 - 2 * fx);
	const uy = fy * fy * (3 - 2 * fy);
	const a = hash2(ix, iy);
	const b = hash2(ix + 1, iy);
	const c = hash2(ix, iy + 1);
	const d = hash2(ix + 1, iy + 1);
	return a + (b - a) * ux + (c - a) * uy + (a - b - c + d) * ux * uy;
}
function fbm(x, y) {
	let v = 0;
	let a = .5;
	let f = 1;
	for (let i = 0; i < 5; i++) {
		v += a * noise2(x * f, y * f);
		a *= .5;
		f *= 2;
	}
	return v;
}
function pathPoly(ctx, pts, w, h) {
	ctx.beginPath();
	for (let i = 0; i < pts.length; i++) {
		const p = pts[i];
		if (!p) continue;
		const { x, y } = lonLatToXy(p[1] ?? 0, p[0] ?? 0, w, h);
		if (i === 0) ctx.moveTo(x, y);
		else ctx.lineTo(x, y);
	}
	ctx.closePath();
}
function drawGraticule(ctx, w, h) {
	ctx.strokeStyle = "rgba(201,162,39,0.11)";
	ctx.lineWidth = 1;
	for (let lat = -75; lat <= 75; lat += 15) {
		const y = (90 - lat) / 180 * h;
		ctx.beginPath();
		ctx.moveTo(0, y);
		ctx.lineTo(w, y);
		ctx.stroke();
	}
	for (let lon = -180; lon < 180; lon += 15) {
		const x = (lon + 180) / 360 * w;
		ctx.beginPath();
		ctx.moveTo(x, 0);
		ctx.lineTo(x, h);
		ctx.stroke();
	}
	ctx.strokeStyle = "rgba(201,162,39,0.22)";
	const eq = 90 / 180 * h;
	ctx.beginPath();
	ctx.moveTo(0, eq);
	ctx.lineTo(w, eq);
	ctx.stroke();
}
function paintDayMap(ctx, w, h) {
	const ocean = ctx.createLinearGradient(0, 0, 0, h);
	ocean.addColorStop(0, "#070b12");
	ocean.addColorStop(.5, "#0a1018");
	ocean.addColorStop(1, "#06080d");
	ctx.fillStyle = ocean;
	ctx.fillRect(0, 0, w, h);
	const img = ctx.getImageData(0, 0, w, h);
	const data = img.data;
	for (let y = 0; y < h; y += 2) for (let x = 0; x < w; x += 2) {
		const n = fbm(x * .006, y * .01);
		const i = (y * w + x) * 4;
		const d = (n - .5) * 10;
		if (!data) continue;
		data[i] = Math.max(0, (data[i] ?? 0) + d);
		data[i + 1] = Math.max(0, (data[i + 1] ?? 0) + d * 1.1);
		data[i + 2] = Math.max(0, (data[i + 2] ?? 0) + d * 1.4);
		if (x + 1 < w) {
			const i2 = i + 4;
			data[i2] = data[i];
			data[i2 + 1] = data[i + 1];
			data[i2 + 2] = data[i + 2];
			data[i2 + 3] = 255;
		}
	}
	ctx.putImageData(img, 0, 0);
	ctx.lineJoin = "round";
	ctx.lineCap = "round";
	for (const poly of CONTINENTS) {
		pathPoly(ctx, poly, w, h);
		ctx.fillStyle = "rgba(58, 46, 28, 0.92)";
		ctx.fill();
	}
	pathPoly(ctx, US_FILL, w, h);
	ctx.fillStyle = "rgba(92, 70, 32, 0.95)";
	ctx.fill();
	ctx.strokeStyle = "rgba(201,162,39,0.55)";
	ctx.lineWidth = 1.35;
	for (const poly of CONTINENTS) {
		pathPoly(ctx, poly, w, h);
		ctx.stroke();
	}
	ctx.strokeStyle = "rgba(232,213,163,0.85)";
	ctx.lineWidth = 1.8;
	pathPoly(ctx, US_FILL, w, h);
	ctx.stroke();
	drawGraticule(ctx, w, h);
	ctx.fillStyle = "rgba(201,162,39,0.35)";
	for (const c of CITY_LIGHTS) {
		const { x, y } = lonLatToXy(c.lon, c.lat, w, h);
		ctx.beginPath();
		ctx.arc(x, y, 1.2 * c.w, 0, Math.PI * 2);
		ctx.fill();
	}
}
function paintLights(ctx, w, h) {
	ctx.fillStyle = "#000";
	ctx.fillRect(0, 0, w, h);
	for (const c of CITY_LIGHTS) {
		const { x, y } = lonLatToXy(c.lon, c.lat, w, h);
		const g = ctx.createRadialGradient(x, y, 0, x, y, 7 * c.w);
		g.addColorStop(0, `rgba(255, 214, 140, 0.95)`);
		g.addColorStop(.35, `rgba(232, 181, 74, ${.45 * c.w})`);
		g.addColorStop(1, "rgba(0,0,0,0)");
		ctx.fillStyle = g;
		ctx.fillRect(x - 10 * c.w, y - 10 * c.w, 20 * c.w, 20 * c.w);
	}
}
function paintClouds(ctx, w, h) {
	const img = ctx.createImageData(w, h);
	const data = img.data;
	for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) {
		const n = fbm(x * .012 + 20, y * .02);
		const polar = 1 - Math.abs(y / h * 2 - 1);
		const a = Math.max(0, n - .55) * 1.8 * (.35 + .65 * polar);
		const i = (y * w + x) * 4;
		data[i] = 220;
		data[i + 1] = 214;
		data[i + 2] = 200;
		data[i + 3] = Math.min(255, a * 140);
	}
	ctx.putImageData(img, 0, 0);
}
var SUN = new Vector3(-.25, .42, -.86).normalize();
var DOME_CENTER = new Vector3();
{
	const c = vec();
	latLonToVec(DOME_LAT, DOME_LON, 1, c);
	DOME_CENTER.set(c.x, c.y, c.z);
}
var CAM = vec();
latLonToVec(DOME_LAT, DOME_LON, 3.2, CAM);
var EARTH_VERT = `
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
var EARTH_FRAG = `
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
var ATMO_VERT = `
varying vec3 vN;
varying vec3 vW;
void main() {
  vN = normalize((modelMatrix * vec4(normal, 0.0)).xyz);
  vec4 w = modelMatrix * vec4(position, 1.0);
  vW = w.xyz;
  gl_Position = projectionMatrix * viewMatrix * w;
}
`;
var ATMO_FRAG = `
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
var DOME_VERT = `
varying vec3 vN;
varying vec3 vW;
void main() {
  vN = normalize((modelMatrix * vec4(normal, 0.0)).xyz);
  vec4 w = modelMatrix * vec4(position, 1.0);
  vW = w.xyz;
  gl_Position = projectionMatrix * viewMatrix * w;
}
`;
var DOME_FRAG = `
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
function makeCanvasTex(w, h, paint, srgb = true) {
	const c = document.createElement("canvas");
	c.width = w;
	c.height = h;
	const ctx = c.getContext("2d");
	if (!ctx) throw new Error("2d");
	paint(ctx, w, h);
	const tex = new CanvasTexture(c);
	if (srgb) tex.colorSpace = SRGBColorSpace;
	tex.anisotropy = 8;
	tex.wrapS = RepeatWrapping;
	tex.needsUpdate = true;
	return tex;
}
function Earth() {
	const day = (0, import_react.useMemo)(() => makeCanvasTex(1024, 512, paintDayMap), []);
	const lights = (0, import_react.useMemo)(() => makeCanvasTex(1024, 512, paintLights, false), []);
	const clouds = (0, import_react.useMemo)(() => makeCanvasTex(512, 256, paintClouds, false), []);
	(0, import_react.useEffect)(() => {
		return () => {
			day.dispose();
			lights.dispose();
			clouds.dispose();
		};
	}, [
		day,
		lights,
		clouds
	]);
	const uniforms = (0, import_react.useMemo)(() => ({
		uDay: { value: day },
		uLights: { value: lights },
		uSun: { value: SUN }
	}), [day, lights]);
	const cloudRef = (0, import_react.useRef)(null);
	useFrame((_, dt) => {
		if (cloudRef.current) cloudRef.current.rotation.y += dt * .004;
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("sphereGeometry", { args: [
			1,
			64,
			48
		] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("shaderMaterial", {
			vertexShader: EARTH_VERT,
			fragmentShader: EARTH_FRAG,
			uniforms
		})] }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
			ref: cloudRef,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("sphereGeometry", { args: [
				1.012,
				48,
				32
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshBasicMaterial", {
				map: clouds,
				transparent: true,
				opacity: .28,
				depthWrite: false,
				side: 2
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("sphereGeometry", { args: [
			1.045,
			48,
			32
		] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("shaderMaterial", {
			vertexShader: ATMO_VERT,
			fragmentShader: ATMO_FRAG,
			transparent: true,
			depthWrite: false,
			side: 1
		})] })
	] });
}
function buildDomeLattice() {
	const up = DOME_CENTER.clone().normalize();
	const tmp = Math.abs(up.y) < .92 ? new Vector3(0, 1, 0) : new Vector3(1, 0, 0);
	const east = new Vector3().crossVectors(tmp, up).normalize();
	const north = new Vector3().crossVectors(up, east).normalize();
	const r = DOME_R;
	const pts = [];
	const point = (theta, phi, out) => {
		const c = Math.cos(theta);
		const s = Math.sin(theta);
		out.copy(up).multiplyScalar(c * r).addScaledVector(east, Math.cos(phi) * s * r).addScaledVector(north, Math.sin(phi) * s * r);
	};
	const a = new Vector3();
	const b = new Vector3();
	const meridians = 20;
	const rings = 7;
	const segs = 10;
	for (let m = 0; m < meridians; m++) {
		const phi = m / meridians * Math.PI * 2;
		for (let i = 0; i < segs; i++) {
			point(i / segs * DOME_ANGLE, phi, a);
			point((i + 1) / segs * DOME_ANGLE, phi, b);
			pts.push(a.x, a.y, a.z, b.x, b.y, b.z);
		}
	}
	for (let k = 1; k <= rings; k++) {
		const theta = k / rings * DOME_ANGLE;
		const n = 48;
		for (let i = 0; i < n; i++) {
			point(theta, i / n * Math.PI * 2, a);
			point(theta, (i + 1) / n * Math.PI * 2, b);
			pts.push(a.x, a.y, a.z, b.x, b.y, b.z);
		}
	}
	const geo = new BufferGeometry();
	geo.setAttribute("position", new Float32BufferAttribute(pts, 3));
	return geo;
}
function Dome() {
	const matRef = (0, import_react.useRef)(null);
	const lattice = (0, import_react.useMemo)(() => buildDomeLattice(), []);
	(0, import_react.useEffect)(() => () => lattice.dispose(), [lattice]);
	const uniforms = (0, import_react.useMemo)(() => ({
		uCenter: { value: DOME_CENTER },
		uAngle: { value: DOME_ANGLE },
		uTime: { value: 0 },
		uPulse: { value: 0 },
		uIntegrity: { value: 1 }
	}), []);
	useFrame((_, dt) => {
		const m = matRef.current;
		if (!m) return;
		m.uniforms.uTime.value += dt;
		m.uniforms.uPulse.value = MathUtils.damp(m.uniforms.uPulse.value, sim.trauma * 1.4, 6, dt);
		m.uniforms.uIntegrity.value = MathUtils.damp(m.uniforms.uIntegrity.value, sim.integrity / 100, 4, dt);
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("sphereGeometry", { args: [
		DOME_R,
		64,
		48
	] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("shaderMaterial", {
		ref: matRef,
		vertexShader: DOME_VERT,
		fragmentShader: DOME_FRAG,
		uniforms,
		transparent: true,
		depthWrite: false,
		side: 2
	})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("lineSegments", {
		geometry: lattice,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("lineBasicMaterial", {
			color: "#e0c36a",
			transparent: true,
			opacity: .55,
			blending: 2,
			depthWrite: false
		})
	})] });
}
function Satellites() {
	const ref = (0, import_react.useRef)(null);
	const dummy = (0, import_react.useMemo)(() => new Object3D(), []);
	const axisX = (0, import_react.useMemo)(() => new Vector3(1, 0, 0), []);
	const axisY = (0, import_react.useMemo)(() => new Vector3(0, 1, 0), []);
	const count = 24;
	useFrame(({ clock }) => {
		const mesh = ref.current;
		if (!mesh) return;
		const t = clock.elapsedTime * .07;
		for (let i = 0; i < count; i++) {
			const plane = i % 3;
			const idx = Math.floor(i / 3);
			const raan = plane * Math.PI * 2 / 3;
			const inc = .92;
			const nu = idx * Math.PI * 2 / 8 + t * (1 + plane * .05);
			dummy.position.set(Math.cos(nu) * SAT_R, 0, Math.sin(nu) * SAT_R);
			dummy.position.applyAxisAngle(axisX, inc);
			dummy.position.applyAxisAngle(axisY, raan);
			dummy.lookAt(0, 0, 0);
			dummy.scale.setScalar(.026);
			dummy.updateMatrix();
			mesh.setMatrixAt(i, dummy.matrix);
		}
		mesh.instanceMatrix.needsUpdate = true;
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("instancedMesh", {
		ref,
		args: [
			void 0,
			void 0,
			count
		],
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("octahedronGeometry", { args: [1, 0] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
			color: "#e8d5a3",
			emissive: "#c9a227",
			emissiveIntensity: .85,
			metalness: .8,
			roughness: .25
		})]
	});
}
function Batteries() {
	const dummy = (0, import_react.useMemo)(() => new Object3D(), []);
	const ref = (0, import_react.useRef)(null);
	const n = sim.batteries.length;
	const up = (0, import_react.useMemo)(() => new Vector3(0, 1, 0), []);
	const radial = (0, import_react.useMemo)(() => new Vector3(), []);
	(0, import_react.useEffect)(() => {
		const mesh = ref.current;
		if (!mesh) return;
		for (let i = 0; i < n; i++) {
			const p = sim.batteries[i];
			dummy.position.set(p.x, p.y, p.z);
			radial.set(p.x, p.y, p.z).normalize();
			dummy.quaternion.setFromUnitVectors(up, radial);
			dummy.scale.set(.012, .028, .012);
			dummy.updateMatrix();
			mesh.setMatrixAt(i, dummy.matrix);
		}
		mesh.instanceMatrix.needsUpdate = true;
	}, [
		dummy,
		n,
		up,
		radial
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("instancedMesh", {
		ref,
		args: [
			void 0,
			void 0,
			n
		],
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("coneGeometry", { args: [
			1,
			1,
			5
		] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
			color: "#c9a227",
			emissive: "#8a6a32",
			emissiveIntensity: .4,
			metalness: .7,
			roughness: .3
		})]
	});
}
var missileIds = /* @__PURE__ */ new Int16Array(40);
function kindScale(m) {
	if (m.kind === "cruise") return .018;
	if (m.kind === "hypersonic") return .022;
	return .026;
}
function Projectiles() {
	const mRef = (0, import_react.useRef)(null);
	const iRef = (0, import_react.useRef)(null);
	const dummy = (0, import_react.useMemo)(() => new Object3D(), []);
	const look = (0, import_react.useMemo)(() => new Vector3(), []);
	const mColor = (0, import_react.useMemo)(() => new Color(), []);
	const trailM = (0, import_react.useRef)(null);
	const trailI = (0, import_react.useRef)(null);
	const mGeo = (0, import_react.useMemo)(() => {
		const g = new BufferGeometry();
		g.setAttribute("position", new BufferAttribute(/* @__PURE__ */ new Float32Array(3120), 3));
		return g;
	}, []);
	const iGeo = (0, import_react.useMemo)(() => {
		const g = new BufferGeometry();
		g.setAttribute("position", new BufferAttribute(/* @__PURE__ */ new Float32Array(2184), 3));
		return g;
	}, []);
	const mBody = (0, import_react.useMemo)(() => {
		const g = new ConeGeometry(.7, 2.4, 5);
		g.rotateX(Math.PI / 2);
		return g;
	}, []);
	const iBody = (0, import_react.useMemo)(() => {
		const g = new ConeGeometry(.45, 2.1, 4);
		g.rotateX(Math.PI / 2);
		return g;
	}, []);
	(0, import_react.useEffect)(() => () => {
		mGeo.dispose();
		iGeo.dispose();
		mBody.dispose();
		iBody.dispose();
	}, [
		mGeo,
		iGeo,
		mBody,
		iBody
	]);
	useFrame(() => {
		const mm = mRef.current;
		const ii = iRef.current;
		if (!mm || !ii) return;
		let mi = 0;
		const mArr = mGeo.attributes.position.array;
		let mw = 0;
		for (const m of sim.missiles) {
			if (!m.alive) continue;
			dummy.position.set(m.pos.x, m.pos.y, m.pos.z);
			look.set(m.pos.x + (m.pos.x - (m.trail[3] ?? m.pos.x)), m.pos.y + (m.pos.y - (m.trail[4] ?? m.pos.y)), m.pos.z + (m.pos.z - (m.trail[5] ?? m.pos.z)));
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
			for (let s = 0; s < 13; s++) {
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
		const iArr = iGeo.attributes.position.array;
		let iw = 0;
		for (const ic of sim.interceptors) {
			if (!ic.alive) continue;
			dummy.position.set(ic.pos.x, ic.pos.y, ic.pos.z);
			look.set(ic.pos.x + (ic.pos.x - (ic.trail[3] ?? ic.pos.x)), ic.pos.y + (ic.pos.y - (ic.trail[4] ?? ic.pos.y)), ic.pos.z + (ic.pos.z - (ic.trail[5] ?? ic.pos.z)));
			dummy.lookAt(look);
			dummy.scale.setScalar(.016);
			dummy.updateMatrix();
			ii.setMatrixAt(ij, dummy.matrix);
			const trail = ic.trail;
			for (let s = 0; s < 13; s++) {
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
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("instancedMesh", {
			ref: mRef,
			args: [
				mBody,
				void 0,
				40
			],
			frustumCulled: false,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
				color: "#e23d3d",
				emissive: "#c23b3b",
				emissiveIntensity: .9,
				metalness: .2,
				roughness: .4
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("instancedMesh", {
			ref: iRef,
			args: [
				iBody,
				void 0,
				28
			],
			frustumCulled: false,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
				color: "#f0d78a",
				emissive: "#c9a227",
				emissiveIntensity: 1.2,
				metalness: .5,
				roughness: .25
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("lineSegments", {
			ref: trailM,
			geometry: mGeo,
			frustumCulled: false,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("lineBasicMaterial", {
				color: "#ff5a48",
				transparent: true,
				opacity: .7,
				blending: 2,
				depthWrite: false,
				toneMapped: false
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("lineSegments", {
			ref: trailI,
			geometry: iGeo,
			frustumCulled: false,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("lineBasicMaterial", {
				color: "#ffe09a",
				transparent: true,
				opacity: .85,
				blending: 2,
				depthWrite: false,
				toneMapped: false
			})
		})
	] });
}
function Vfx() {
	const ref = (0, import_react.useRef)(null);
	const dummy = (0, import_react.useMemo)(() => new Object3D(), []);
	const color = (0, import_react.useMemo)(() => new Color(), []);
	const bursts = (0, import_react.useRef)(Array.from({ length: 48 }, () => ({
		alive: false,
		x: 0,
		y: 0,
		z: 0,
		t: 0,
		life: .6,
		mag: 1,
		gold: true
	})));
	useFrame((_, dt) => {
		const mesh = ref.current;
		if (!mesh) return;
		for (const e of drainVfx()) {
			if (e.kind !== "intercept" && e.kind !== "impact" && e.kind !== "pulse") continue;
			const slot = bursts.current.find((b) => !b.alive) ?? bursts.current[0];
			slot.alive = true;
			slot.t = 0;
			slot.life = e.kind === "pulse" ? .9 : .55;
			slot.mag = e.kind === "pulse" ? 2.4 : e.kind === "impact" ? 1.4 : .9;
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
			const s = b.mag * (.04 + k * .22);
			dummy.position.set(b.x, b.y, b.z);
			dummy.scale.setScalar(s);
			dummy.rotation.set(0, 0, 0);
			dummy.updateMatrix();
			mesh.setMatrixAt(n, dummy.matrix);
			if (b.gold) color.setRGB(1, .86, .45);
			else color.setRGB(1, .28, .18);
			color.multiplyScalar(1 - k);
			mesh.setColorAt(n, color);
			n++;
		}
		mesh.count = n;
		mesh.visible = n > 0;
		mesh.instanceMatrix.needsUpdate = true;
		if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("instancedMesh", {
		ref,
		args: [
			void 0,
			void 0,
			48
		],
		frustumCulled: false,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("sphereGeometry", { args: [
			1,
			12,
			10
		] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshBasicMaterial", {
			color: "#fff4d0",
			transparent: true,
			opacity: .65,
			blending: 2,
			depthWrite: false
		})]
	});
}
function ShakeGroup({ children }) {
	const ref = (0, import_react.useRef)(null);
	const reduced = useGame((s) => s.reducedMotion);
	const shakeOn = useGame((s) => s.shake);
	useFrame(({ clock }) => {
		const g = ref.current;
		if (!g) return;
		const trauma = reduced || !shakeOn ? 0 : sim.trauma;
		const s = trauma * trauma;
		const t = clock.elapsedTime * 28;
		g.position.set(Math.sin(t * 1.7) * s * .045, Math.cos(t * 1.9) * s * .032, Math.sin(t * 2.3) * s * .04);
		g.rotation.z = Math.sin(t * 1.3) * s * .012;
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("group", {
		ref,
		children
	});
}
function SimDriver() {
	useFrame((_, dt) => {
		useGame.getState().tick(Math.min(dt, .1));
	});
	return null;
}
function Controls() {
	const phase = useGame((s) => s.phase);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(OrbitControls, {
		makeDefault: true,
		enablePan: false,
		enableDamping: true,
		dampingFactor: .08,
		minDistance: 2.05,
		maxDistance: 6.8,
		autoRotate: phase === "title" || phase === "briefing",
		autoRotateSpeed: .35,
		rotateSpeed: .72,
		zoomSpeed: .7,
		target: [
			0,
			0,
			0
		]
	});
}
function ClickFire() {
	const { camera, gl } = useThree();
	const down = (0, import_react.useRef)({
		x: 0,
		y: 0
	});
	const ndc = (0, import_react.useMemo)(() => new Vector2(), []);
	const raycaster = (0, import_react.useMemo)(() => new Raycaster(), []);
	(0, import_react.useEffect)(() => {
		const el = gl.domElement;
		const onDown = (e) => {
			down.current.x = e.clientX;
			down.current.y = e.clientY;
		};
		const onUp = (e) => {
			if (useGame.getState().phase !== "playing") return;
			if (Math.hypot(e.clientX - down.current.x, e.clientY - down.current.y) > 9) return;
			const rect = el.getBoundingClientRect();
			ndc.x = (e.clientX - rect.left) / rect.width * 2 - 1;
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
	}, [
		camera,
		gl,
		ndc,
		raycaster
	]);
	return null;
}
function Lights() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ambientLight", {
			intensity: .18,
			color: "#8a9bb8"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("directionalLight", {
			position: [
				SUN.x * 8,
				SUN.y * 8,
				SUN.z * 8
			],
			intensity: 2.35,
			color: "#fff4e0"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("pointLight", {
			position: [
				DOME_CENTER.x * 1.4,
				DOME_CENTER.y * 1.4,
				DOME_CENTER.z * 1.4
			],
			intensity: 1.6,
			color: "#e0c36a",
			distance: 4
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("hemisphereLight", { args: [
			"#1c2436",
			"#0a0806",
			.35
		] })
	] });
}
function GoldDomeScene() {
	const cheap = typeof window !== "undefined" && (window.innerWidth < 480 || window.devicePixelRatio > 2.5);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Canvas, {
		className: "gold-dome-canvas absolute inset-0 h-full w-full touch-none",
		dpr: cheap ? [1, 1.25] : [1, 1.75],
		gl: {
			antialias: !cheap,
			alpha: false,
			powerPreference: "high-performance"
		},
		camera: {
			position: [
				CAM.x,
				CAM.y,
				CAM.z
			],
			fov: 42,
			near: .08,
			far: 80
		},
		onCreated: ({ gl, scene }) => {
			gl.setClearColor("#05060a");
			gl.toneMapping = 4;
			gl.toneMappingExposure = 1.12;
			scene.background = new Color("#05060a");
		},
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SimDriver, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ClickFire, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Controls, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lights, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stars, {
				radius: 60,
				depth: 30,
				count: cheap ? 900 : 2200,
				factor: 2.6,
				saturation: 0,
				fade: true,
				speed: .25
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ShakeGroup, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Earth, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dome, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Satellites, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Batteries, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Projectiles, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Vfx, {})
			] }),
			!cheap && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EffectComposer, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bloom, {
				luminanceThreshold: .72,
				intensity: .85,
				mipmapBlur: true,
				luminanceSmoothing: .2
			}) })
		]
	});
}
//#endregion
export { GoldDomeScene as default };
