import { create } from "zustand";
import { audio } from "@/lib/game/audio";
import {
  drainEvents,
  fireAt,
  fireNearestToRay,
  firePulse,
  resetSim,
  sim,
  startRun,
  stepSim,
  TOTAL_WAVE_COUNT,
  type Layer,
} from "@/lib/game/sim";
import { vec, type Vec } from "@/lib/game/math";
import { CITIES } from "@/lib/game/map-data";

export type Phase =
  | "title"
  | "briefing"
  | "playing"
  | "paused"
  | "defeat"
  | "victory";

export type Toast = { id: number; text: string; tone: "gold" | "warn" };

const SAVE_KEY = "gold-dome-v1";
const SAVE_VERSION = 1;

type Save = {
  version: number;
  highScore: number;
  bestWave: number;
  muted: boolean;
  seenBriefing: boolean;
  shake: boolean;
};

const defaults: Save = {
  version: SAVE_VERSION,
  highScore: 0,
  bestWave: 0,
  muted: false,
  seenBriefing: false,
  shake: true,
};

function loadSave(): Save {
  try {
    const raw = localStorage.getItem(SAVE_KEY);
    if (!raw) return { ...defaults };
    const parsed = JSON.parse(raw) as Partial<Save>;
    return { ...defaults, ...parsed, version: SAVE_VERSION };
  } catch {
    return { ...defaults };
  }
}

function persist(partial: Partial<Save>) {
  try {
    const cur = loadSave();
    localStorage.setItem(SAVE_KEY, JSON.stringify({ ...cur, ...partial }));
  } catch {
    /* private mode */
  }
}

export type GameState = {
  phase: Phase;
  wave: number;
  waveName: string;
  score: number;
  combo: number;
  integrity: number;
  rounds: number;
  pulseReady: boolean;
  auto: boolean;
  muted: boolean;
  shake: boolean;
  highScore: number;
  bestWave: number;
  threats: number;
  cities: { name: string; short: string; dead: boolean; hits: number }[];
  restT: number;
  flash: number;
  flashTone: "gold" | "crimson";
  toasts: Toast[];
  reducedMotion: boolean;
  totalWaves: number;
};

type Actions = {
  hydrate: () => void;
  engage: () => void;
  skipBriefing: () => void;
  togglePause: () => void;
  toggleAuto: () => void;
  toggleMute: () => void;
  toggleShake: () => void;
  pulse: () => void;
  interceptId: (id: number) => void;
  interceptRay: (origin: Vec, dir: Vec) => void;
  tick: (dt: number) => void;
  rearm: () => void;
  toTitle: () => void;
};

let toastId = 1;
let hudAcc = 0;
let alarmCd = 0;

function snapCities() {
  return CITIES.map((c, i) => {
    const s = sim.cities[i]!;
    return { name: c.name, short: c.short, dead: s.dead, hits: s.hits };
  });
}

function applyHud(set: (p: Partial<GameState>) => void, get: () => GameState) {
  const high = Math.max(get().highScore, sim.score);
  const best = Math.max(get().bestWave, sim.wave);
  if (high !== get().highScore || best !== get().bestWave) {
    persist({ highScore: high, bestWave: best });
  }
  set({
    wave: sim.wave,
    score: sim.score,
    combo: sim.combo,
    integrity: sim.integrity,
    rounds: sim.rounds,
    pulseReady: sim.pulseReady,
    auto: sim.auto,
    threats: sim.aliveThreats,
    cities: snapCities(),
    restT: sim.restT,
    highScore: high,
    bestWave: best,
  });
}

export const useGame = create<GameState & Actions>((set, get) => ({
  phase: "title",
  wave: 0,
  waveName: "",
  score: 0,
  combo: 0,
  integrity: 100,
  rounds: 10,
  pulseReady: true,
  auto: false,
  muted: false,
  shake: true,
  highScore: 0,
  bestWave: 0,
  threats: 0,
  cities: CITIES.map((c) => ({
    name: c.name,
    short: c.short,
    dead: false,
    hits: 0,
  })),
  restT: 0,
  flash: 0,
  flashTone: "gold",
  toasts: [],
  reducedMotion: false,
  totalWaves: TOTAL_WAVE_COUNT,

  hydrate() {
    const s = loadSave();
    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    audio.setMuted(s.muted);
    set({
      highScore: s.highScore,
      bestWave: s.bestWave,
      muted: s.muted,
      shake: s.shake,
      reducedMotion: !!reduce,
    });
  },

  engage() {
    audio.unlock();
    audio.ui();
    const save = loadSave();
    persist({ seenBriefing: true });
    if (save.seenBriefing) {
      startRun(true);
      sim.paused = false;
      set({ phase: "playing", auto: true, waveName: "PROBE" });
    } else {
      set({ phase: "briefing" });
    }
  },

  skipBriefing() {
    audio.unlock();
    audio.ui();
    persist({ seenBriefing: true });
    startRun(true);
    sim.paused = false;
    set({ phase: "playing", auto: true, waveName: "PROBE" });
  },

  togglePause() {
    const { phase } = get();
    if (phase === "playing") {
      sim.paused = true;
      set({ phase: "paused" });
    } else if (phase === "paused") {
      sim.paused = false;
      set({ phase: "playing" });
    }
    audio.ui();
  },

  toggleAuto() {
    sim.auto = !sim.auto;
    set({ auto: sim.auto });
    audio.ui();
  },

  toggleMute() {
    const muted = !get().muted;
    audio.setMuted(muted);
    persist({ muted });
    set({ muted });
  },

  toggleShake() {
    const shake = !get().shake;
    persist({ shake });
    set({ shake });
    audio.ui();
  },

  interceptId(id: number) {
    if (get().phase !== "playing") return;
    fireAt(id);
  },

  interceptRay(origin: Vec, dir: Vec) {
    if (get().phase !== "playing") return;
    fireNearestToRay(origin, dir);
  },

  pulse() {
    firePulse();
  },

  tick(dt: number) {
    const { phase, flash } = get();
    if (flash > 0) set({ flash: Math.max(0, flash - dt * 3.2) });
    if (phase !== "playing") {
      if (phase === "title" || phase === "briefing") {
        /* idle globe */
      }
      return;
    }
    stepSim(dt);
    hudAcc += dt;
    alarmCd = Math.max(0, alarmCd - dt);

    const events = drainEvents();
    const toasts = get().toasts.slice(-4);
    let nextFlash = get().flash;
    let tone: "gold" | "crimson" = get().flashTone;
    let nextPhase = get().phase;
    let waveName = get().waveName;

    for (const e of events) {
      if (e.kind === "launch") audio.launch();
      if (e.kind === "intercept") {
        audio.intercept(e.layer as Layer);
        nextFlash = Math.min(1, nextFlash + 0.45);
        tone = "gold";
        toasts.push({
          id: toastId++,
          text: `+${e.score}  ${e.layer.toUpperCase()}`,
          tone: "gold",
        });
      }
      if (e.kind === "impact") {
        audio.impact();
        nextFlash = 1;
        tone = "crimson";
        toasts.push({ id: toastId++, text: "LEAKER", tone: "warn" });
      }
      if (e.kind === "pulse") audio.pulse();
      if (e.kind === "wave") {
        audio.wave();
        waveName = e.name;
        toasts.push({
          id: toastId++,
          text: `WAVE ${e.n}  ${e.name}`,
          tone: "gold",
        });
      }
      if (e.kind === "rest") {
        toasts.push({ id: toastId++, text: "WAVE CLEAR", tone: "gold" });
      }
      if (e.kind === "alarm" && alarmCd <= 0) {
        audio.alarm();
        alarmCd = 3;
      }
      if (e.kind === "defeat") {
        audio.impact();
        nextPhase = "defeat";
      }
      if (e.kind === "victory") {
        audio.wave();
        nextPhase = "victory";
      }
    }

    if (toasts.length > 5) toasts.splice(0, toasts.length - 5);

    if (events.length || hudAcc > 0.1 || nextPhase !== phase) {
      hudAcc = 0;
      applyHud(set, get);
      set({
        phase: nextPhase,
        flash: nextFlash,
        flashTone: tone,
        toasts,
        waveName,
      });
    }
  },

  rearm() {
    audio.ui();
    audio.unlock();
    const auto = get().auto;
    startRun(true);
    sim.paused = false;
    set({ phase: "playing", waveName: "PROBE", flash: 0, toasts: [], auto: true });
  },

  toTitle() {
    audio.ui();
    resetSim();
    set({
      phase: "title",
      wave: 0,
      score: 0,
      integrity: 100,
      threats: 0,
      toasts: [],
      flash: 0,
    });
  },
}));

export const rayOrigin = vec();
export const rayDir = vec();
