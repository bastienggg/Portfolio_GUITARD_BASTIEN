"use client";

import { pad, planetHref, projects } from "@/lib/projects";
import type { View } from "../sceneState";

interface TopBarProps {
  view: View;
  cur: number;
  musicOn: boolean;
  onToggleMusic: () => void;
  go: (href: string) => void;
}

export function TopBar({ view, cur, musicOn, onToggleMusic, go }: TopBarProps) {
  const p = projects[cur];

  return (
    <header className="top">
      <button className="logo" aria-label="Retour au système" onClick={() => go("/")}>
        <span className="logo-mark">BG</span>
        <span className="logo-name">bastien.guitard</span>
      </button>

      <nav className="crumbs" aria-label="Fil d'Ariane">
        <button onClick={() => go("/")}>Système</button>
        {view === "focus" && (
          <>
            <span aria-hidden="true">/</span>
            <span className="here">
              {pad(cur)} {p.title}
            </span>
          </>
        )}
        {view === "report" && (
          <>
            <span aria-hidden="true">/</span>
            <button className="here here-link" onClick={() => go(planetHref(p))}>
              {pad(cur)} {p.title}
            </button>
            <span aria-hidden="true">/</span>
            <span>Rapport</span>
          </>
        )}
      </nav>

      <div className="top-right">
        <button
          className="sound"
          aria-pressed={musicOn}
          aria-label={musicOn ? "Couper la musique" : "Activer la musique"}
          onClick={onToggleMusic}
        >
          <span className="eq" aria-hidden="true">
            <i />
            <i />
            <i />
            <i />
          </span>
          <span>{musicOn ? "Son on" : "Son off"}</span>
        </button>
      </div>
    </header>
  );
}
