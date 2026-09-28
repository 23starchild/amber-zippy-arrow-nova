type AudioApi = {
  unlock: () => void;
  setMuted: (muted: boolean) => void;
  setMaster: (v: number) => void;
  launch: () => void;
  intercept: (layer: "space" | "mid" | "term") => void;
  impact: () => void;
  pulse: () => void;
  alarm: () => void;
  ui: () => void;
  wave: () => void;
};

let ctx: AudioContext | null = null;
let master: GainNode | null = null;
let sfx: GainNode | null = null;
let music: GainNode | null = null;
let muted = false;
let masterVal = 0.7;
let droneTimer = 0;

function ensure(): AudioContext | null {
  if (typeof window === "undefined") return null;
  if (!ctx) {
    const AC =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext })
        .webkitAudioContext;
    if (!AC) return null;
    ctx = new AC({ latencyHint: "interactive" });
    master = ctx.createGain();
    sfx = ctx.createGain();
    music = ctx.createGain();
    sfx.gain.value = 0.85;
    music.gain.value = 0.22;
    sfx.connect(master);
    music.connect(master);
    master.connect(ctx.destination);
    applyMute();
  }
  return ctx;
}

function applyMute() {
  if (!master || !ctx) return;
  const v = muted ? 0 : masterVal * masterVal;
  master.gain.setTargetAtTime(v, ctx.currentTime, 0.03);
}

function envGain(duration: number, peak: number): GainNode | null {
  if (!ctx || !sfx) return null;
  const g = ctx.createGain();
  g.gain.setValueAtTime(0.0001, ctx.currentTime);
  g.gain.exponentialRampToValueAtTime(peak, ctx.currentTime + 0.012);
  g.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration);
  g.connect(sfx);
  return g;
}

function tone(
  freq: number,
  duration: number,
  type: OscillatorType,
  peak: number,
  slide = 0,
) {
  if (!ctx) return;
  const g = envGain(duration, peak);
  if (!g) return;
  const o = ctx.createOscillator();
  o.type = type;
  o.frequency.setValueAtTime(freq, ctx.currentTime);
  if (slide) {
    o.frequency.exponentialRampToValueAtTime(
      Math.max(20, freq + slide),
      ctx.currentTime + duration,
    );
  }
  o.connect(g);
  o.start();
  o.stop(ctx.currentTime + duration + 0.02);
}

function noise(duration: number, peak: number, hp = 400) {
  if (!ctx) return;
  const g = envGain(duration, peak);
  if (!g) return;
  const n = ctx.createBuffer(1, Math.floor(ctx.sampleRate * duration), ctx.sampleRate);
  const ch = n.getChannelData(0);
  for (let i = 0; i < ch.length; i++) ch[i] = Math.random() * 2 - 1;
  const src = ctx.createBufferSource();
  src.buffer = n;
  const f = ctx.createBiquadFilter();
  f.type = "highpass";
  f.frequency.value = hp;
  src.connect(f);
  f.connect(g);
  src.start();
}

function startDrone() {
  if (!ctx || !music) return;
  const t = ctx.currentTime;
  const make = (freq: number, type: OscillatorType, gVal: number) => {
    const o = ctx!.createOscillator();
    const g = ctx!.createGain();
    o.type = type;
    o.frequency.value = freq;
    g.gain.value = gVal;
    o.connect(g);
    g.connect(music!);
    o.start(t);
  };
  make(55, "sine", 0.35);
  make(82.5, "sine", 0.22);
  make(110.2, "triangle", 0.08);
  droneTimer = 1;
}

export const audio: AudioApi = {
  unlock() {
    const c = ensure();
    if (!c) return;
    if (c.state === "suspended") void c.resume();
    if (!droneTimer) startDrone();
    document.addEventListener(
      "visibilitychange",
      () => {
        if (document.visibilityState === "visible") {
          const ac = ensure();
          if (ac && ac.state === "suspended") void ac.resume();
        }
      },
      { passive: true },
    );
  },
  setMuted(v) {
    muted = v;
    ensure();
    applyMute();
  },
  setMaster(v) {
    masterVal = v;
    ensure();
    applyMute();
  },
  launch() {
    if (!ensure()) return;
    noise(0.12, 0.22, 800);
    tone(420, 0.22, "sawtooth", 0.07, -280);
    tone(180, 0.18, "sine", 0.08, -80);
  },
  intercept(layer) {
    if (!ensure()) return;
    const base = layer === "space" ? 880 : layer === "mid" ? 640 : 420;
    noise(0.08, 0.18, 1200);
    tone(base, 0.16, "square", 0.05, 200);
    tone(base * 0.5, 0.22, "sine", 0.09, -100);
  },
  impact() {
    if (!ensure()) return;
    noise(0.35, 0.3, 80);
    tone(70, 0.5, "sine", 0.22, -40);
    tone(38, 0.55, "triangle", 0.14, -10);
  },
  pulse() {
    if (!ensure()) return;
    tone(220, 0.7, "sine", 0.16, -140);
    tone(330, 0.5, "triangle", 0.08, -80);
    noise(0.4, 0.16, 200);
  },
  alarm() {
    if (!ensure()) return;
    tone(620, 0.18, "square", 0.05);
    tone(480, 0.22, "square", 0.05);
  },
  ui() {
    if (!ensure()) return;
    tone(740, 0.06, "sine", 0.04);
  },
  wave() {
    if (!ensure()) return;
    tone(196, 0.4, "sine", 0.08, 80);
    tone(294, 0.35, "triangle", 0.05, 40);
  },
};
