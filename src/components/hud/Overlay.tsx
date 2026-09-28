import {
  Crosshair,
  Pause,
  Play,
  RotateCcw,
  Shield,
  Target,
  Volume2,
  VolumeX,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useGame } from "@/lib/game/store";

function IntegrityBar({ value }: { value: number }) {
  const low = value <= 28;
  return (
    <div className="flex min-w-0 flex-col gap-1.5">
      <div className="flex items-baseline justify-between gap-3">
        <span className="text-2xs font-medium tracking-[0.22em] text-muted uppercase">
          Shield
        </span>
        <span
          className={cn(
            "font-display text-sm tabular-nums tracking-wide",
            low ? "text-crimson" : "text-gold-soft",
          )}
        >
          {Math.round(value)}%
        </span>
      </div>
      <div className="h-1 overflow-hidden rounded-full bg-line">
        <div
          className={cn(
            "h-full rounded-full transition-[width,background-color] duration-[var(--motion-fast)] ease-[var(--ease-out)]",
            low ? "bg-crimson" : "bg-gold",
          )}
          style={{ width: `${Math.max(2, value)}%` }}
        />
      </div>
    </div>
  );
}

function HudChip({
  label,
  value,
  warn = false,
}: {
  label: string;
  value: string | number;
  warn?: boolean;
}) {
  return (
    <div className="flex min-w-0 flex-col gap-0.5">
      <span className="text-2xs font-medium tracking-[0.2em] text-muted uppercase">
        {label}
      </span>
      <span
        className={cn(
          "font-display text-base tabular-nums leading-none tracking-wide sm:text-lg",
          warn ? "text-crimson" : "text-ivory",
        )}
      >
        {value}
      </span>
    </div>
  );
}

function Title() {
  const engage = useGame((s) => s.engage);
  const high = useGame((s) => s.highScore);
  const best = useGame((s) => s.bestWave);
  return (
    <div className="overlay-panel relative flex h-full flex-col items-center justify-center px-5 py-8">
      <div className="absolute top-5 right-5 left-5 flex items-center justify-between text-2xs tracking-[0.28em] text-muted uppercase">
        <span>Homeland Shield</span>
        <span className="hidden sm:inline">Command</span>
      </div>
      <div className="flex flex-col items-center text-center">
        <Shield
          className="mb-4 size-8 text-gold sm:mb-7 sm:size-12"
          strokeWidth={1.25}
        />
        <p className="rise delay-1 mb-2 text-2xs tracking-[0.36em] text-gold uppercase sm:mb-3 sm:tracking-[0.42em]">
          Golden Dome for America
        </p>
        <h1 className="rise delay-2 font-display text-[clamp(2.6rem,13vw,7.2rem)] leading-[0.9] font-medium tracking-[0.06em] text-ivory text-balance sm:tracking-[0.12em]">
          GOLD
          <span className="block text-gold">DOME</span>
        </h1>
        <p className="rise delay-3 mt-4 max-w-sm text-pretty text-sm leading-relaxed text-muted sm:mt-6 sm:text-base">
          Layered missile defense. Space interceptors, midcourse kinetics,
          terminal batteries. Hold the shield.
        </p>
        <Button
          className="rise delay-4 pointer-events-auto mt-7 min-w-[200px] tracking-[0.28em] uppercase sm:mt-10"
          size="xl"
          onClick={engage}
        >
          Engage
        </Button>
        {high > 0 && (
          <p className="rise delay-5 mt-4 text-2xs tracking-[0.18em] text-muted uppercase">
            Best {high.toLocaleString()} · Wave {best}
          </p>
        )}
      </div>
      <p className="absolute bottom-5 hidden max-w-md text-center text-2xs leading-relaxed tracking-[0.08em] text-muted sm:block">
        Click a threat to intercept. Drag to orbit. Scroll to zoom.
      </p>
    </div>
  );
}

function Briefing() {
  const go = useGame((s) => s.skipBriefing);
  return (
    <div className="overlay-panel pointer-events-auto flex h-full items-center justify-center px-5">
      <div className="surface-modal w-full max-w-md p-6 sm:p-8">
        <p className="text-2xs tracking-[0.32em] text-gold uppercase">
          Standing order
        </p>
        <h2 className="mt-2 font-display text-3xl tracking-[0.06em] text-ivory">
          Three layers
        </h2>
        <ol className="mt-6 space-y-4 text-sm leading-relaxed text-muted">
          <li>
            <span className="text-gold-soft">01 Space</span>
            <span className="mt-1 block text-ivory/90">
              Boost and midcourse intercepts from the constellation. Highest
              score.
            </span>
          </li>
          <li>
            <span className="text-gold-soft">02 Terminal</span>
            <span className="mt-1 block text-ivory/90">
              Ground batteries under the dome. Last chance on leakers.
            </span>
          </li>
          <li>
            <span className="text-gold-soft">03 Pulse</span>
            <span className="mt-1 block text-ivory/90">
              One dome pulse per wave. Sweeps the cap. Spend it well.
            </span>
          </li>
        </ol>
        <Button
          className="mt-8 w-full tracking-[0.22em] uppercase"
          size="lg"
          onClick={go}
        >
          Take command
        </Button>
      </div>
    </div>
  );
}

function PlayingHud() {
  const wave = useGame((s) => s.wave);
  const waveName = useGame((s) => s.waveName);
  const score = useGame((s) => s.score);
  const combo = useGame((s) => s.combo);
  const integrity = useGame((s) => s.integrity);
  const rounds = useGame((s) => s.rounds);
  const pulseReady = useGame((s) => s.pulseReady);
  const auto = useGame((s) => s.auto);
  const muted = useGame((s) => s.muted);
  const threats = useGame((s) => s.threats);
  const cities = useGame((s) => s.cities);
  const restT = useGame((s) => s.restT);
  const total = useGame((s) => s.totalWaves);
  const pause = useGame((s) => s.togglePause);
  const toggleAuto = useGame((s) => s.toggleAuto);
  const toggleMute = useGame((s) => s.toggleMute);
  const pulse = useGame((s) => s.pulse);

  return (
    <div className="pointer-events-none absolute inset-0 flex flex-col justify-between p-3 sm:p-5">
      <div className="pointer-events-auto flex items-start justify-between gap-3">
        <div className="surface-hud w-min min-w-[11.5rem] max-w-[52%] p-3 sm:min-w-[16rem] sm:p-4">
          <div className="mb-3 flex items-center gap-2">
            <Shield className="size-4 text-gold" strokeWidth={1.5} />
            <span className="font-display text-sm tracking-[0.22em] text-ivory uppercase">
              Gold Dome
            </span>
          </div>
          <IntegrityBar value={integrity} />
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            className="surface-icon"
            aria-label={muted ? "Unmute" : "Mute"}
            onClick={toggleMute}
          >
            {muted ? <VolumeX className="size-4" /> : <Volume2 className="size-4" />}
          </button>
          <button
            type="button"
            className="surface-icon"
            aria-label="Pause"
            onClick={pause}
          >
            <Pause className="size-4" />
          </button>
        </div>
      </div>

      <div className="pointer-events-none flex justify-center">
        {restT > 0 && (
          <div className="surface-hud px-4 py-2 text-2xs tracking-[0.28em] text-gold-soft uppercase">
            Wave clear · Next in {Math.ceil(restT)}
          </div>
        )}
      </div>

      <div className="pointer-events-auto flex flex-col gap-3">
        <div className="flex flex-wrap gap-1.5">
          {cities.map((c) => (
            <span
              key={c.short}
              className={cn(
                "rounded-full px-2 py-1 text-2xs tracking-[0.14em] uppercase",
                c.dead
                  ? "bg-crimson/15 text-crimson line-through"
                  : "bg-ivory/6 text-muted",
              )}
            >
              {c.short}
            </span>
          ))}
        </div>

        <div className="surface-hud hidden flex-wrap items-end justify-between gap-4 p-3 sm:flex sm:p-4">
          <HudChip label="Wave" value={`${wave}/${total}`} />
          <HudChip label="Track" value={waveName || "—"} />
          <HudChip label="Score" value={score.toLocaleString()} />
          <HudChip label="Threats" value={threats} warn={threats > 8} />
          <HudChip label="Rounds" value={rounds} warn={rounds <= 2} />
          {combo > 1 && <HudChip label="Combo" value={`×${combo}`} />}
        </div>
        <div className="surface-hud grid grid-cols-3 gap-3 p-3 sm:hidden">
          <HudChip label="Wave" value={`${wave}/${total}`} />
          <HudChip label="Score" value={score.toLocaleString()} />
          <HudChip label="Rounds" value={rounds} warn={rounds <= 2} />
        </div>

        <div className="flex gap-2">
          <Button
            variant={auto ? "gold" : "ghost"}
            size="md"
            className="min-h-11 flex-1 tracking-[0.16em] uppercase"
            onClick={toggleAuto}
          >
            <Target className="size-4" />
            Auto
          </Button>
          <Button
            variant={pulseReady ? "gold" : "ghost"}
            size="md"
            className="min-h-11 flex-1 tracking-[0.16em] uppercase"
            disabled={!pulseReady}
            onClick={pulse}
          >
            <Zap className="size-4" />
            Pulse
          </Button>
        </div>
        <p className="hidden text-center text-2xs tracking-[0.14em] text-muted uppercase sm:block">
          Click threats to fire · Space pause · A auto
        </p>
        <p className="text-center text-2xs tracking-[0.14em] text-muted uppercase sm:hidden">
          Tap inbound tracks to intercept
        </p>
      </div>
    </div>
  );
}

function PauseModal() {
  const resume = useGame((s) => s.togglePause);
  const toTitle = useGame((s) => s.toTitle);
  const shake = useGame((s) => s.shake);
  const toggleShake = useGame((s) => s.toggleShake);
  const muted = useGame((s) => s.muted);
  const toggleMute = useGame((s) => s.toggleMute);
  return (
    <div className="overlay-panel pointer-events-auto flex h-full items-center justify-center px-5">
      <div className="surface-modal w-full max-w-sm p-6 sm:p-8">
        <p className="text-2xs tracking-[0.32em] text-gold uppercase">Hold</p>
        <h2 className="mt-1 font-display text-3xl text-ivory">Paused</h2>
        <div className="mt-6 flex flex-col gap-2">
          <Button size="lg" className="tracking-[0.18em] uppercase" onClick={resume}>
            <Play className="size-4" />
            Resume
          </Button>
          <Button
            variant="ghost"
            size="lg"
            className="tracking-[0.14em] uppercase"
            onClick={toggleMute}
          >
            {muted ? "Sound off" : "Sound on"}
          </Button>
          <Button
            variant="ghost"
            size="lg"
            className="tracking-[0.14em] uppercase"
            onClick={toggleShake}
          >
            {shake ? "Shake on" : "Shake off"}
          </Button>
          <Button
            variant="ghost"
            size="lg"
            className="tracking-[0.14em] uppercase"
            onClick={toTitle}
          >
            End watch
          </Button>
        </div>
      </div>
    </div>
  );
}

function EndCard({
  title,
  kicker,
  onAgain,
  onHome,
}: {
  title: string;
  kicker: string;
  onAgain: () => void;
  onHome: () => void;
}) {
  const score = useGame((s) => s.score);
  const high = useGame((s) => s.highScore);
  const wave = useGame((s) => s.wave);
  return (
    <div className="overlay-panel pointer-events-auto flex h-full items-center justify-center px-5">
      <div className="surface-modal w-full max-w-sm p-6 text-center sm:p-8">
        <p className="text-2xs tracking-[0.32em] text-gold uppercase">{kicker}</p>
        <h2 className="mt-2 font-display text-4xl tracking-[0.04em] text-ivory text-balance">
          {title}
        </h2>
        <p className="mt-5 font-display text-3xl tabular-nums text-gold-soft">
          {score.toLocaleString()}
        </p>
        <p className="mt-1 text-2xs tracking-[0.16em] text-muted uppercase">
          Wave {wave} · Best {high.toLocaleString()}
        </p>
        <div className="mt-8 flex flex-col gap-2">
          <Button
            size="lg"
            className="tracking-[0.2em] uppercase"
            onClick={onAgain}
          >
            <RotateCcw className="size-4" />
            Rearm
          </Button>
          <Button
            variant="ghost"
            size="lg"
            className="tracking-[0.16em] uppercase"
            onClick={onHome}
          >
            Stand down
          </Button>
        </div>
      </div>
    </div>
  );
}

function Toasts() {
  const toasts = useGame((s) => s.toasts);
  return (
    <div className="pointer-events-none absolute top-1/3 right-3 flex flex-col items-end gap-1.5 sm:right-6">
      {toasts.slice(-4).map((t) => (
        <div
          key={t.id}
          className={cn(
            "rounded-[var(--radius-sm)] px-3 py-1.5 text-2xs tracking-[0.18em] uppercase",
            t.tone === "gold"
              ? "bg-gold/15 text-gold-soft"
              : "bg-crimson/18 text-crimson",
          )}
        >
          {t.text}
        </div>
      ))}
    </div>
  );
}

function Flash() {
  const flash = useGame((s) => s.flash);
  const tone = useGame((s) => s.flashTone);
  if (flash <= 0.02) return null;
  return (
    <div
      className={cn(
        "pointer-events-none absolute inset-0",
        tone === "gold" ? "bg-gold" : "bg-crimson",
      )}
      style={{ opacity: flash * (tone === "gold" ? 0.14 : 0.2) }}
      aria-hidden
    />
  );
}

export function Overlay() {
  const phase = useGame((s) => s.phase);
  const rearm = useGame((s) => s.rearm);
  const toTitle = useGame((s) => s.toTitle);

  return (
    <div className="pointer-events-none absolute inset-0 z-10">
      <Flash />
      {phase === "title" && <Title />}
      {phase === "briefing" && <Briefing />}
      {(phase === "playing" || phase === "paused") && <PlayingHud />}
      {phase === "playing" && <Toasts />}
      {phase === "paused" && <PauseModal />}
      {phase === "defeat" && (
        <EndCard
          title="Shield broken"
          kicker="Leaker"
          onAgain={rearm}
          onHome={toTitle}
        />
      )}
      {phase === "victory" && (
        <EndCard
          title="The dome holds"
          kicker="Raid defeated"
          onAgain={rearm}
          onHome={toTitle}
        />
      )}
      {(phase === "title" || phase === "briefing") && (
        <Crosshair className="pointer-events-none absolute top-5 right-5 hidden size-4 text-muted sm:block" />
      )}
    </div>
  );
}
