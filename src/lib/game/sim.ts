import {
  CITIES,
  ORIGINS,
  SPACE_NODES,
} from "@/lib/game/map-data";
import {
  DOME_ANGLE,
  DOME_LAT,
  DOME_LON,
  EARTH_R,
  SAT_R,
  _t0,
  _t1,
  _t2,
  angleBetween,
  copyV,
  crossV,
  distV,
  latLonToVec,
  lenV,
  maddV,
  normV,
  scaleV,
  setV,
  slerpV,
  subV,
  vec,
  type Vec,
} from "@/lib/game/math";

export type ThreatKind = "icbm" | "hypersonic" | "cruise" | "decoy";
export type Layer = "space" | "mid" | "term";
export type SimMode = "idle" | "spawning" | "combat" | "rest" | "defeat" | "victory";

export type FxEvent =
  | { kind: "intercept"; x: number; y: number; z: number; layer: Layer; score: number }
  | { kind: "impact"; x: number; y: number; z: number; city: number }
  | { kind: "launch"; x: number; y: number; z: number }
  | { kind: "pulse" }
  | { kind: "wave"; n: number; name: string }
  | { kind: "rest" }
  | { kind: "defeat" }
  | { kind: "victory" }
  | { kind: "alarm" };

export type Missile = {
  alive: boolean;
  id: number;
  kind: ThreatKind;
  t: number;
  speed: number;
  fromN: Vec;
  toN: Vec;
  weave: Vec;
  city: number;
  pos: Vec;
  assigned: number;
  trail: Float32Array;
};

export type Interceptor = {
  alive: boolean;
  id: number;
  pos: Vec;
  target: number;
  speed: number;
  trail: Float32Array;
};

export type CityState = { hits: number; dead: boolean };

const MAX_M = 40;
const MAX_I = 28;
const TRAIL = 14;
const TRAIL_STRIDE = TRAIL * 3;
const TOTAL_WAVES = 8;

const WAVE_NAMES = [
  "PROBE",
  "RAID",
  "SWARM",
  "GLIDE",
  "COMBINED",
  "DECOY RAIN",
  "ASSAULT",
  "FULL RAID",
];

type WaveSpec = { kind: ThreatKind; count: number; origin?: number }[];

function waveSpec(n: number): WaveSpec {
  switch (n) {
    case 1:
      return [{ kind: "icbm", count: 3, origin: 0 }];
    case 2:
      return [{ kind: "icbm", count: 5 }];
    case 3:
      return [
        { kind: "icbm", count: 3 },
        { kind: "cruise", count: 5 },
      ];
    case 4:
      return [{ kind: "hypersonic", count: 6 }];
    case 5:
      return [
        { kind: "icbm", count: 4 },
        { kind: "hypersonic", count: 4 },
        { kind: "cruise", count: 4 },
      ];
    case 6:
      return [
        { kind: "icbm", count: 4 },
        { kind: "decoy", count: 6 },
        { kind: "hypersonic", count: 3 },
      ];
    case 7:
      return [
        { kind: "icbm", count: 6 },
        { kind: "hypersonic", count: 6 },
        { kind: "cruise", count: 6 },
      ];
    default:
      return [
        { kind: "icbm", count: 8 },
        { kind: "hypersonic", count: 8 },
        { kind: "cruise", count: 6 },
        { kind: "decoy", count: 4 },
      ];
  }
}

function kindSpeed(kind: ThreatKind, wave: number): number {
  const w = 1 + (wave - 1) * 0.06;
  switch (kind) {
    case "icbm":
      return 0.085 * w;
    case "hypersonic":
      return 0.145 * w;
    case "cruise":
      return 0.07 * w;
    case "decoy":
      return 0.09 * w;
  }
}

function kindDamage(kind: ThreatKind): number {
  switch (kind) {
    case "icbm":
      return 16;
    case "hypersonic":
      return 14;
    case "cruise":
      return 8;
    case "decoy":
      return 0;
  }
}

function altitude(kind: ThreatKind, t: number): number {
  const s = Math.sin(Math.PI * t);
  switch (kind) {
    case "icbm":
      return 0.04 + 0.92 * s;
    case "decoy":
      return 0.05 + 0.78 * s;
    case "hypersonic":
      return 0.05 + 0.32 * s;
    case "cruise":
      return 0.018 + 0.045 * s;
  }
}

export function sampleMissilePos(m: Missile, t: number, out: Vec): Vec {
  slerpV(_t2, m.fromN, m.toN, t);
  if (m.kind === "hypersonic") {
    const w = Math.sin(t * 14) * 0.06 * (1 - Math.abs(2 * t - 1));
    maddV(_t2, _t2, m.weave, w);
    normV(_t2, _t2);
  }
  return scaleV(out, _t2, EARTH_R + altitude(m.kind, t));
}

function layerOf(alt: number): Layer {
  if (alt > 0.42) return "space";
  if (alt > 0.14) return "mid";
  return "term";
}

function pushTrail(trail: Float32Array, p: Vec) {
  for (let i = TRAIL_STRIDE - 1; i >= 3; i--) {
    trail[i] = trail[i - 3] ?? 0;
  }
  trail[0] = p.x;
  trail[1] = p.y;
  trail[2] = p.z;
}

function placeMissile(m: Missile, t: number) {
  sampleMissilePos(m, t, m.pos);
}

export type Sim = {
  mode: SimMode;
  paused: boolean;
  auto: boolean;
  wave: number;
  score: number;
  combo: number;
  comboT: number;
  integrity: number;
  rounds: number;
  pulseReady: boolean;
  cities: CityState[];
  missiles: Missile[];
  interceptors: Interceptor[];
  events: FxEvent[];
  vfx: FxEvent[];
  trauma: number;
  domePos: Vec;
  spaceNodes: Vec[];
  batteries: Vec[];
  spawnQueue: { kind: ThreatKind; origin: number; city: number; delay: number }[];
  restT: number;
  autoCd: number;
  toSpawn: number;
  aliveThreats: number;
  hitsThisWave: number;
};

function emptyMissile(id: number): Missile {
  return {
    alive: false,
    id,
    kind: "icbm",
    t: 0,
    speed: 0.1,
    fromN: vec(),
    toN: vec(),
    weave: vec(),
    city: 0,
    pos: vec(),
    assigned: 0,
    trail: new Float32Array(TRAIL_STRIDE),
  };
}

function emptyInterceptor(id: number): Interceptor {
  return {
    alive: false,
    id,
    pos: vec(),
    target: -1,
    speed: 1.4,
    trail: new Float32Array(TRAIL_STRIDE),
  };
}

export const TRAIL_POINTS = TRAIL;

function createSim(): Sim {
  const domePos = latLonToVec(DOME_LAT, DOME_LON, 1, vec());
  const spaceNodes = SPACE_NODES.map((n) => latLonToVec(n.lat, n.lon, SAT_R, vec()));
  const batteries = CITIES.map((c) =>
    latLonToVec(c.lat, c.lon, EARTH_R + 0.02, vec()),
  );
  return {
    mode: "idle",
    paused: false,
    auto: false,
    wave: 0,
    score: 0,
    combo: 0,
    comboT: 0,
    integrity: 100,
    rounds: 10,
    pulseReady: true,
    cities: CITIES.map(() => ({ hits: 0, dead: false })),
    missiles: Array.from({ length: MAX_M }, (_, i) => emptyMissile(i)),
    interceptors: Array.from({ length: MAX_I }, (_, i) => emptyInterceptor(i)),
    events: [],
    vfx: [],
    trauma: 0,
    domePos,
    spaceNodes,
    batteries,
    spawnQueue: [],
    restT: 0,
    autoCd: 0,
    toSpawn: 0,
    aliveThreats: 0,
    hitsThisWave: 0,
  };
}

export const sim: Sim = createSim();

export function resetSim() {
  const next = createSim();
  Object.assign(sim, next);
}

function emit(e: FxEvent) {
  sim.events.push(e);
  sim.vfx.push(e);
}

export function drainVfx(): FxEvent[] {
  if (sim.vfx.length === 0) return [];
  const out = sim.vfx.slice();
  sim.vfx.length = 0;
  return out;
}

export function drainEvents(): FxEvent[] {
  if (sim.events.length === 0) return [];
  const out = sim.events.slice();
  sim.events.length = 0;
  return out;
}

function allocMissile(): Missile | null {
  for (const m of sim.missiles) if (!m.alive) return m;
  return null;
}

function allocInterceptor(): Interceptor | null {
  for (const i of sim.interceptors) if (!i.alive) return i;
  return null;
}

function spawnOne(kind: ThreatKind, originIdx: number, cityIdx: number) {
  const m = allocMissile();
  if (!m) return;
  const origin = ORIGINS[originIdx % ORIGINS.length]!;
  const city = CITIES[cityIdx % CITIES.length]!;
  latLonToVec(origin.lat, origin.lon, 1, m.fromN);
  latLonToVec(city.lat, city.lon, 1, m.toN);
  subV(_t0, m.toN, m.fromN);
  crossV(m.weave, m.fromN, _t0);
  normV(m.weave, m.weave);
  m.kind = kind;
  m.t = kind === "cruise" ? 0.04 : 0.1;
  m.speed = kindSpeed(kind, sim.wave);
  m.city = cityIdx;
  m.assigned = 0;
  m.alive = true;
  placeMissile(m, m.t);
  for (let i = 0; i < TRAIL; i++) pushTrail(m.trail, m.pos);
}

function beginWave(n: number) {
  sim.wave = n;
  sim.pulseReady = true;
  sim.hitsThisWave = 0;
  const spec = waveSpec(n);
  sim.spawnQueue.length = 0;
  let delay = 0.15;
  for (const part of spec) {
    for (let i = 0; i < part.count; i++) {
      const origin =
        part.origin ?? Math.floor(Math.random() * ORIGINS.length);
      let city = Math.floor(Math.random() * CITIES.length);
      let guard = 0;
      while (sim.cities[city]?.dead && guard++ < 12) {
        city = Math.floor(Math.random() * CITIES.length);
      }
      sim.spawnQueue.push({
        kind: part.kind,
        origin,
        city,
        delay,
      });
      delay += 0.38 + Math.random() * 0.55;
    }
  }
  sim.toSpawn = sim.spawnQueue.length;
  sim.mode = "spawning";
  const bonus = n === 1 ? 10 : 4;
  sim.rounds = Math.min(18, sim.rounds + bonus);
  emit({ kind: "wave", n, name: WAVE_NAMES[n - 1] ?? "RAID" });
}

export function startRun(autoDefault = false) {
  resetSim();
  sim.auto = autoDefault;
  sim.mode = "spawning";
  beginWave(1);
}

function killMissile(m: Missile, layer: Layer, scored: boolean) {
  m.alive = false;
  const alt = lenV(m.pos) - EARTH_R;
  const L = layer ?? layerOf(alt);
  let pts = L === "space" ? 320 : L === "mid" ? 210 : 110;
  if (m.kind === "hypersonic") pts += 80;
  if (m.kind === "decoy") pts = 40;
  if (scored) {
    sim.combo += 1;
    sim.comboT = 1.25;
    const mult = 1 + Math.min(8, sim.combo - 1) * 0.15;
    const gain = Math.round(pts * mult);
    sim.score += gain;
    emit({
      kind: "intercept",
      x: m.pos.x,
      y: m.pos.y,
      z: m.pos.z,
      layer: L,
      score: gain,
    });
  }
  sim.trauma = Math.min(1, sim.trauma + 0.28);
}

function impact(m: Missile) {
  m.alive = false;
  if (m.kind === "decoy") return;
  const city = sim.cities[m.city];
  if (city && !city.dead) {
    city.hits += 1;
    if (city.hits >= 2) city.dead = true;
  }
  sim.integrity = Math.max(0, sim.integrity - kindDamage(m.kind));
  sim.hitsThisWave += 1;
  sim.combo = 0;
  emit({ kind: "impact", x: m.pos.x, y: m.pos.y, z: m.pos.z, city: m.city });
  sim.trauma = Math.min(1, sim.trauma + 0.55);
  if (sim.integrity <= 22) emit({ kind: "alarm" });
  if (sim.integrity <= 0) {
    sim.integrity = 0;
    sim.mode = "defeat";
    emit({ kind: "defeat" });
  }
}

function pickOrigin(m: Missile): Vec {
  const alt = lenV(m.pos) - EARTH_R;
  const pool = alt > 0.2 ? sim.spaceNodes : sim.batteries;
  let best = pool[0]!;
  let bestD = Infinity;
  for (const p of pool) {
    const d = distV(p, m.pos);
    if (d < bestD) {
      bestD = d;
      best = p;
    }
  }
  return best;
}

export function fireAt(id: number): boolean {
  if (sim.mode !== "spawning" && sim.mode !== "combat") return false;
  if (sim.rounds <= 0) return false;
  const m = sim.missiles[id];
  if (!m?.alive) return false;
  if (m.assigned >= 2) return false;
  const ic = allocInterceptor();
  if (!ic) return false;
  const origin = pickOrigin(m);
  copyV(ic.pos, origin);
  ic.target = m.id;
  ic.speed = m.kind === "hypersonic" ? 1.65 : 1.42;
  ic.alive = true;
  m.assigned += 1;
  sim.rounds -= 1;
  for (let i = 0; i < TRAIL; i++) pushTrail(ic.trail, ic.pos);
  emit({ kind: "launch", x: origin.x, y: origin.y, z: origin.z });
  return true;
}

export function fireNearestToRay(origin: Vec, dir: Vec): boolean {
  let best = -1;
  let bestScore = -Infinity;
  for (const m of sim.missiles) {
    if (!m.alive) continue;
    subV(_t0, m.pos, origin);
    const t = Math.max(0, _t0.x * dir.x + _t0.y * dir.y + _t0.z * dir.z);
    maddV(_t1, origin, dir, t);
    const d = distV(_t1, m.pos);
    const score = 1.4 - d - (1 - m.t) * 0.15;
    if (d < 0.55 && score > bestScore) {
      bestScore = score;
      best = m.id;
    }
  }
  if (best < 0) {
    let imminent = -1;
    let eta = Infinity;
    for (const m of sim.missiles) {
      if (!m.alive || m.kind === "decoy") continue;
      const e = (1 - m.t) / m.speed;
      if (e < eta) {
        eta = e;
        imminent = m.id;
      }
    }
    if (imminent >= 0 && eta < 3.2) best = imminent;
  }
  if (best < 0) return false;
  return fireAt(best);
}

export function fireCity(cityIndex: number): boolean {
  let best = -1;
  let eta = Infinity;
  for (const m of sim.missiles) {
    if (!m.alive || m.city !== cityIndex) continue;
    const e = (1 - m.t) / m.speed;
    if (e < eta) {
      eta = e;
      best = m.id;
    }
  }
  if (best < 0) return false;
  return fireAt(best);
}

export function firePulse(): boolean {
  if (!sim.pulseReady) return false;
  if (sim.mode !== "spawning" && sim.mode !== "combat") return false;
  sim.pulseReady = false;
  emit({ kind: "pulse" });
  sim.trauma = Math.min(1, sim.trauma + 0.72);
  for (const m of sim.missiles) {
    if (!m.alive) continue;
    const ang = angleBetween(m.pos, sim.domePos);
    const alt = lenV(m.pos) - EARTH_R;
    if (ang < DOME_ANGLE + 0.12 && alt < 0.38) {
      killMissile(m, "term", m.kind !== "decoy");
    }
  }
  return true;
}

function mostImminent(): Missile | null {
  let best: Missile | null = null;
  let eta = Infinity;
  for (const m of sim.missiles) {
    if (!m.alive || m.assigned > 0) continue;
    if (m.kind === "decoy") continue;
    const e = (1 - m.t) / m.speed;
    if (e < eta) {
      eta = e;
      best = m;
    }
  }
  return best;
}

function countAlive(): number {
  let n = 0;
  for (const m of sim.missiles) if (m.alive && m.kind !== "decoy") n++;
  return n;
}

function countAllAlive(): number {
  let n = 0;
  for (const m of sim.missiles) if (m.alive) n++;
  return n;
}

export function stepSim(dt: number) {
  if (sim.paused) return;
  if (sim.mode === "idle" || sim.mode === "defeat" || sim.mode === "victory") {
    sim.trauma = Math.max(0, sim.trauma - dt * 1.6);
    return;
  }

  const cap = dt > 0.05 ? 0.05 : dt;

  if (sim.comboT > 0) {
    sim.comboT -= cap;
    if (sim.comboT <= 0) sim.combo = 0;
  }
  sim.trauma = Math.max(0, sim.trauma - cap * 1.7);

  if (sim.mode === "rest") {
    sim.restT -= cap;
    if (sim.restT <= 0) {
      if (sim.wave >= TOTAL_WAVES) {
        sim.mode = "victory";
        emit({ kind: "victory" });
      } else {
        beginWave(sim.wave + 1);
      }
    }
  }

  if (sim.mode === "spawning") {
    for (const item of sim.spawnQueue) item.delay -= cap;
    const ready = sim.spawnQueue.filter((s) => s.delay <= 0);
    sim.spawnQueue = sim.spawnQueue.filter((s) => s.delay > 0);
    for (const s of ready) spawnOne(s.kind, s.origin, s.city);
    if (sim.spawnQueue.length === 0) sim.mode = "combat";
  }

  for (const m of sim.missiles) {
    if (!m.alive) continue;
    m.t += m.speed * cap;
    if (m.kind === "decoy" && m.t >= 0.72) {
      m.alive = false;
      continue;
    }
    if (m.t >= 1) {
      placeMissile(m, 1);
      impact(m);
      if (sim.integrity <= 0) return;
      continue;
    }
    placeMissile(m, m.t);
    pushTrail(m.trail, m.pos);
  }

  for (const ic of sim.interceptors) {
    if (!ic.alive) continue;
    const tgt = sim.missiles[ic.target];
    if (!tgt?.alive) {
      ic.alive = false;
      continue;
    }
    subV(_t0, tgt.pos, ic.pos);
    const d = lenV(_t0);
    normV(_t1, _t0);
    const step = ic.speed * cap;
    if (d < 0.055 + step * 0.5) {
      const alt = lenV(tgt.pos) - EARTH_R;
      killMissile(tgt, layerOf(alt), true);
      ic.alive = false;
      continue;
    }
    maddV(ic.pos, ic.pos, _t1, step);
    pushTrail(ic.trail, ic.pos);
  }

  if (sim.auto) {
    sim.autoCd -= cap;
    if (sim.autoCd <= 0 && sim.rounds > 0) {
      const m = mostImminent();
      if (m) {
        const eta = (1 - m.t) / m.speed;
        if (eta < 5.2) {
          fireAt(m.id);
          sim.autoCd = 0.52;
        }
      }
    }
  }

  sim.aliveThreats = countAlive();
  const any = countAllAlive();

  if (
    (sim.mode === "combat" || sim.mode === "spawning") &&
    sim.spawnQueue.length === 0 &&
    any === 0
  ) {
    sim.mode = "rest";
    sim.restT = 3.1;
    emit({ kind: "rest" });
  }
}

export const TOTAL_WAVE_COUNT = TOTAL_WAVES;

export function inDome(p: Vec): boolean {
  return angleBetween(p, sim.domePos) < DOME_ANGLE;
}

export function setVFromThree(
  o: Vec,
  x: number,
  y: number,
  z: number,
): Vec {
  return setV(o, x, y, z);
}
