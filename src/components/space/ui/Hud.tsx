"use client";

import { pad, planetHref, projects, reportHref, wrapIndex } from "@/lib/projects";
import type { DisplayMode, View } from "../sceneState";

interface HudProps {
  view: View;
  cur: number;
  mode: DisplayMode;
  setMode: (m: DisplayMode) => void;
  onHover: (index: number) => void;
  go: (href: string) => void;
}

/** Barre du bas : étapes (vue d'ensemble + planètes), bascule 3D/Liste, précédent/suivant */
export function Hud({ view, cur, mode, setMode, onHover, go }: HudProps) {
  const prev = projects[wrapIndex(cur - 1)];
  const next = projects[wrapIndex(cur + 1)];
  const toNeighbour = (p: (typeof projects)[number]) =>
    go(view === "report" ? reportHref(p) : planetHref(p));

  const steps = (onSys: boolean) => (
    <div
      className="hud-group"
      onMouseOut={() => {
        if (view === "system") onHover(-1);
      }}
    >
      <button className={`step all${onSys ? " on" : ""}`} onClick={() => go("/")}>
        Vue d&apos;ensemble
      </button>
      {projects.map((p, i) => {
        const on = !onSys && i === cur;
        return (
          <button
            key={p.slug}
            className={`step${on ? " on" : ""}`}
            aria-label={p.title}
            onClick={() => go(planetHref(p))}
            onMouseOver={() => {
              if (view === "system") onHover(i);
            }}
          >
            {pad(i)}
            {on ? ` ${p.title}` : ""}
          </button>
        );
      })}
    </div>
  );

  return (
    <footer className="hud">
      <div className="hud-system">
        <span className="hud-note">
          Scroll, <span className="key">←</span>
          <span className="key">→</span> ou clic
        </span>
        {steps(true)}
        <div className="seg" role="group" aria-label="Affichage">
          <button aria-pressed={mode === "3d"} onClick={() => setMode("3d")}>
            3D
          </button>
          <button aria-pressed={mode === "list"} onClick={() => setMode("list")}>
            Liste
          </button>
        </div>
      </div>

      <div className="hud-focus">
        <button className="nav-btn" onClick={() => toNeighbour(prev)}>
          <span className="key">←</span>
          <span className="nm">
            {pad(wrapIndex(cur - 1))} {prev.title}
          </span>
        </button>
        {steps(false)}
        <button className="nav-btn" onClick={() => toNeighbour(next)}>
          <span className="nm">
            {pad(wrapIndex(cur + 1))} {next.title}
          </span>
          <span className="key">→</span>
        </button>
      </div>
    </footer>
  );
}
