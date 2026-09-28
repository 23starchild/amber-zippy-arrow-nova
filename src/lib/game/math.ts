export const EARTH_R = 1;
export const DOME_R = 1.09;
export const SAT_R = 1.36;
export const DOME_LAT = 39.8;
export const DOME_LON = -98.6;
export const DOME_ANGLE = 0.5;
export const DEG = Math.PI / 180;

export type Vec = { x: number; y: number; z: number };

export function vec(x = 0, y = 0, z = 0): Vec {
  return { x, y, z };
}

export function setV(o: Vec, x: number, y: number, z: number): Vec {
  o.x = x;
  o.y = y;
  o.z = z;
  return o;
}

export function copyV(o: Vec, a: Vec): Vec {
  o.x = a.x;
  o.y = a.y;
  o.z = a.z;
  return o;
}

export function addV(o: Vec, a: Vec, b: Vec): Vec {
  o.x = a.x + b.x;
  o.y = a.y + b.y;
  o.z = a.z + b.z;
  return o;
}

export function subV(o: Vec, a: Vec, b: Vec): Vec {
  o.x = a.x - b.x;
  o.y = a.y - b.y;
  o.z = a.z - b.z;
  return o;
}

export function scaleV(o: Vec, a: Vec, s: number): Vec {
  o.x = a.x * s;
  o.y = a.y * s;
  o.z = a.z * s;
  return o;
}

export function maddV(o: Vec, a: Vec, b: Vec, s: number): Vec {
  o.x = a.x + b.x * s;
  o.y = a.y + b.y * s;
  o.z = a.z + b.z * s;
  return o;
}

export function lenV(a: Vec): number {
  return Math.hypot(a.x, a.y, a.z);
}

export function distV(a: Vec, b: Vec): number {
  return Math.hypot(a.x - b.x, a.y - b.y, a.z - b.z);
}

export function normV(o: Vec, a: Vec): Vec {
  const l = lenV(a) || 1;
  o.x = a.x / l;
  o.y = a.y / l;
  o.z = a.z / l;
  return o;
}

export function dotV(a: Vec, b: Vec): number {
  return a.x * b.x + a.y * b.y + a.z * b.z;
}

export function crossV(o: Vec, a: Vec, b: Vec): Vec {
  o.x = a.y * b.z - a.z * b.y;
  o.y = a.z * b.x - a.x * b.z;
  o.z = a.x * b.y - a.y * b.x;
  return o;
}

export function lerpV(o: Vec, a: Vec, b: Vec, t: number): Vec {
  o.x = a.x + (b.x - a.x) * t;
  o.y = a.y + (b.y - a.y) * t;
  o.z = a.z + (b.z - a.z) * t;
  return o;
}

export function slerpV(o: Vec, a: Vec, b: Vec, t: number): Vec {
  let d = dotV(a, b);
  d = d < -1 ? -1 : d > 1 ? 1 : d;
  const theta = Math.acos(d);
  if (theta < 1e-4) return lerpV(o, a, b, t);
  const sinT = Math.sin(theta);
  const sa = Math.sin((1 - t) * theta) / sinT;
  const sb = Math.sin(t * theta) / sinT;
  o.x = a.x * sa + b.x * sb;
  o.y = a.y * sa + b.y * sb;
  o.z = a.z * sa + b.z * sb;
  return o;
}

export function latLonToVec(lat: number, lon: number, r: number, out: Vec): Vec {
  const la = lat * DEG;
  const lo = lon * DEG;
  const cl = Math.cos(la);
  out.x = r * cl * Math.cos(lo);
  out.y = r * Math.sin(la);
  out.z = r * cl * Math.sin(lo);
  return out;
}

export function lonLatFromVec(v: Vec): { lat: number; lon: number } {
  const r = lenV(v) || 1;
  const lat = Math.asin(v.y / r) / DEG;
  const lon = Math.atan2(v.z, v.x) / DEG;
  return { lat, lon };
}

export function clamp(n: number, a: number, b: number): number {
  return n < a ? a : n > b ? b : n;
}

export function angleBetween(a: Vec, b: Vec): number {
  const d = clamp(dotV(a, b) / ((lenV(a) || 1) * (lenV(b) || 1)), -1, 1);
  return Math.acos(d);
}

export const _t0 = vec();
export const _t1 = vec();
export const _t2 = vec();
export const _t3 = vec();
