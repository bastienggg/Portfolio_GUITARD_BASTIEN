import { useEffect, useRef } from "react";
import { planetHref, projectCount, projects, wrapIndex } from "@/lib/projects";
import type { DisplayMode, View } from "@/components/space/sceneState";

interface NavState {
  view: View;
  cur: number;
  mode: DisplayMode;
  go: (href: string) => void;
  setMode: (m: DisplayMode) => void;
  leaveIntro: (withSound: boolean) => void;
}

const WHEEL_THRESHOLD = 40;
const NAV_LOCK_MS = 950;
const SWIPE_MIN = 50;

/**
 * Clavier (← → Échap, Entrée sur l'intro), molette et swipe vertical :
 * Système → 01 → 02 → … → dernière → retour au système, et inversement.
 */
export function useSpaceNavigation(state: NavState) {
  const live = useRef(state);
  live.current = state;

  useEffect(() => {
    let navLock = 0;
    let wheelAcc = 0;
    let wheelIdle: ReturnType<typeof setTimeout> | undefined;
    let touchY: number | null = null;

    const stepPlanet = (dir: number) => {
      const now = performance.now();
      if (now < navLock) return;
      navLock = now + NAV_LOCK_MS;
      const { view, cur, go } = live.current;
      if (view === "system") {
        go(planetHref(projects[dir > 0 ? 0 : projectCount - 1]));
      } else if (view === "focus") {
        const nxt = cur + dir;
        go(nxt < 0 || nxt >= projectCount ? "/" : planetHref(projects[nxt]));
      }
    };

    const scrollNavAllowed = (target: EventTarget | null) => {
      const { view, mode } = live.current;
      if (view !== "system" && view !== "focus") return false;
      if (view === "system" && mode === "list") return false;
      // Laisse défiler le panneau de la vue planète s'il déborde (mobile)
      const f = document.getElementById("focus");
      if (f && target instanceof Node && f.contains(target) && f.scrollHeight > f.clientHeight + 4) {
        return false;
      }
      return true;
    };

    const onKey = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement | null;
      if (t?.closest?.("input, textarea")) return;
      const { view, cur, mode, go, setMode, leaveIntro } = live.current;

      if (view === "intro") {
        if (e.key === "Enter" && !t?.classList.contains("mute-enter")) {
          e.preventDefault();
          leaveIntro(true);
        }
        return;
      }
      if (e.key === "Escape") {
        if (view === "report") go(planetHref(projects[cur]));
        else if (view === "focus") go("/");
        else if (mode === "list") setMode("3d");
      }
      if (view === "focus" || view === "system") {
        if (e.key === "ArrowRight") go(planetHref(projects[view === "system" ? 0 : wrapIndex(cur + 1)]));
        if (e.key === "ArrowLeft")
          go(planetHref(projects[view === "system" ? projectCount - 1 : wrapIndex(cur - 1)]));
      }
    };

    const onWheel = (e: WheelEvent) => {
      if (!scrollNavAllowed(e.target)) return;
      e.preventDefault();
      clearTimeout(wheelIdle);
      wheelIdle = setTimeout(() => (wheelAcc = 0), 220);
      wheelAcc += e.deltaY;
      if (Math.abs(wheelAcc) > WHEEL_THRESHOLD) {
        stepPlanet(wheelAcc > 0 ? 1 : -1);
        wheelAcc = 0;
      }
    };

    const onTouchStart = (e: TouchEvent) => {
      touchY = e.touches.length === 1 ? e.touches[0].clientY : null;
    };
    const onTouchEnd = (e: TouchEvent) => {
      if (touchY === null || !scrollNavAllowed(e.target)) {
        touchY = null;
        return;
      }
      const dy = touchY - e.changedTouches[0].clientY;
      touchY = null;
      if (Math.abs(dy) > SWIPE_MIN) stepPlanet(dy > 0 ? 1 : -1);
    };

    window.addEventListener("keydown", onKey);
    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchend", onTouchEnd, { passive: true });
    return () => {
      clearTimeout(wheelIdle);
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchend", onTouchEnd);
    };
  }, []);
}
