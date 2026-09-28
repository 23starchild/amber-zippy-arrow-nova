import {
  CITY_LIGHTS,
  CONTINENTS,
  US_FILL,
} from "@/lib/game/map-data";

function lonLatToXy(
  lon: number,
  lat: number,
  w: number,
  h: number,
): { x: number; y: number } {
  return {
    x: ((lon + 180) / 360) * w,
    y: ((90 - lat) / 180) * h,
  };
}

function hash2(ix: number, iy: number): number {
  const n = Math.sin(ix * 127.1 + iy * 311.7) * 43758.5453;
  return n - Math.floor(n);
}

function noise2(x: number, y: number): number {
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

function fbm(x: number, y: number): number {
  let v = 0;
  let a = 0.5;
  let f = 1;
  for (let i = 0; i < 5; i++) {
    v += a * noise2(x * f, y * f);
    a *= 0.5;
    f *= 2;
  }
  return v;
}

function pathPoly(
  ctx: CanvasRenderingContext2D,
  pts: number[][],
  w: number,
  h: number,
) {
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

function drawGraticule(ctx: CanvasRenderingContext2D, w: number, h: number) {
  ctx.strokeStyle = "rgba(201,162,39,0.11)";
  ctx.lineWidth = 1;
  for (let lat = -75; lat <= 75; lat += 15) {
    const y = ((90 - lat) / 180) * h;
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(w, y);
    ctx.stroke();
  }
  for (let lon = -180; lon < 180; lon += 15) {
    const x = ((lon + 180) / 360) * w;
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, h);
    ctx.stroke();
  }
  ctx.strokeStyle = "rgba(201,162,39,0.22)";
  const eq = (90 / 180) * h;
  ctx.beginPath();
  ctx.moveTo(0, eq);
  ctx.lineTo(w, eq);
  ctx.stroke();
}

export function paintDayMap(ctx: CanvasRenderingContext2D, w: number, h: number) {
  const ocean = ctx.createLinearGradient(0, 0, 0, h);
  ocean.addColorStop(0, "#070b12");
  ocean.addColorStop(0.5, "#0a1018");
  ocean.addColorStop(1, "#06080d");
  ctx.fillStyle = ocean;
  ctx.fillRect(0, 0, w, h);

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

export function paintLights(ctx: CanvasRenderingContext2D, w: number, h: number) {
  ctx.fillStyle = "#000";
  ctx.fillRect(0, 0, w, h);
  for (const c of CITY_LIGHTS) {
    const { x, y } = lonLatToXy(c.lon, c.lat, w, h);
    const g = ctx.createRadialGradient(x, y, 0, x, y, 7 * c.w);
    g.addColorStop(0, `rgba(255, 214, 140, ${0.95})`);
    g.addColorStop(0.35, `rgba(232, 181, 74, ${0.45 * c.w})`);
    g.addColorStop(1, "rgba(0,0,0,0)");
    ctx.fillStyle = g;
    ctx.fillRect(x - 10 * c.w, y - 10 * c.w, 20 * c.w, 20 * c.w);
  }
}

export function paintClouds(ctx: CanvasRenderingContext2D, w: number, h: number) {
  const img = ctx.createImageData(w, h);
  const data = img.data;
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const n = fbm(x * 0.012 + 20, y * 0.02);
      const polar = 1 - Math.abs((y / h) * 2 - 1);
      const a = Math.max(0, n - 0.55) * 1.8 * (0.35 + 0.65 * polar);
      const i = (y * w + x) * 4;
      data[i] = 220;
      data[i + 1] = 214;
      data[i + 2] = 200;
      data[i + 3] = Math.min(255, a * 140);
    }
  }
  ctx.putImageData(img, 0, 0);
}
