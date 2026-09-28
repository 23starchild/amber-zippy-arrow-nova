import { lazy, Suspense, useEffect, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Overlay } from "@/components/hud/Overlay";
import { useGame } from "@/lib/game/store";

const GoldDomeScene = lazy(() => import("@/components/game/GoldDomeScene"));

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  const [mounted, setMounted] = useState(false);
  const hydrate = useGame((s) => s.hydrate);
  const togglePause = useGame((s) => s.togglePause);
  const toggleAuto = useGame((s) => s.toggleAuto);
  const toggleMute = useGame((s) => s.toggleMute);
  const pulse = useGame((s) => s.pulse);
  const engage = useGame((s) => s.engage);
  const skipBriefing = useGame((s) => s.skipBriefing);

  useEffect(() => {
    setMounted(true);
    hydrate();
  }, [hydrate]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const phase = useGame.getState().phase;
      if (
        e.code === "Space" ||
        e.code === "ArrowUp" ||
        e.code === "ArrowDown"
      ) {
        e.preventDefault();
      }
      if (e.code === "KeyM") toggleMute();
      if (phase === "title" && (e.code === "Enter" || e.code === "Space")) {
        engage();
        return;
      }
      if (phase === "briefing" && (e.code === "Enter" || e.code === "Space")) {
        skipBriefing();
        return;
      }
      if (phase === "playing" || phase === "paused") {
        if (e.code === "Space" || e.code === "Escape" || e.code === "KeyP") {
          togglePause();
        }
        if (e.code === "KeyA") toggleAuto();
        if (e.code === "KeyQ") pulse();
      }
    };
    window.addEventListener("keydown", onKey, { passive: false });
    return () => window.removeEventListener("keydown", onKey);
  }, [engage, skipBriefing, toggleAuto, toggleMute, togglePause, pulse]);

  return (
    <main className="relative h-dvh w-full overflow-hidden bg-obsidian text-ivory">
      {mounted ? (
        <Suspense fallback={null}>
          <GoldDomeScene />
        </Suspense>
      ) : null}
      <Overlay />
    </main>
  );
}
