"use client";

import { useState } from "react";
import { pad, planetHref, projects, statusLabel, total } from "@/lib/projects";
import { overlayEls } from "../sceneState";
import { StatusDot } from "./bits";

interface PlanetOverlaysProps {
  hovered: number;
  onHover: (index: number) => void;
  go: (href: string) => void;
}

/**
 * Étiquettes des planètes + carte de survol. Leur position est écrite
 * à chaque frame par <OverlaySync> via overlayEls.
 */
export function PlanetOverlays({ hovered, onHover, go }: PlanetOverlaysProps) {
  // La carte garde le dernier projet affiché pendant son fondu de sortie
  const [shown, setShown] = useState(-1);
  if (hovered >= 0 && hovered !== shown) setShown(hovered);
  const p = shown >= 0 ? projects[shown] : null;

  return (
    <>
      <div id="labels">
        {projects.map((proj, i) => (
          <button
            key={proj.slug}
            ref={(el) => {
              overlayEls.labels[i] = el;
            }}
            type="button"
            className={`plabel${hovered === i ? " on" : ""}`}
            aria-label={`${proj.title}, ${proj.kind}, en savoir plus`}
            onMouseEnter={() => onHover(i)}
            onMouseLeave={() => onHover(-1)}
            onFocus={() => onHover(i)}
            onBlur={() => onHover(-1)}
            onClick={() => go(planetHref(proj))}
          >
            <b>{pad(i)}</b>
            {proj.title} <span>· {proj.kind}</span>
          </button>
        ))}
      </div>

      <div
        ref={(el) => {
          overlayEls.card = el;
        }}
        className={`hovercard${hovered >= 0 ? " show" : ""}`}
        aria-hidden="true"
      >
        {p && (
          <>
            <div className="meta">
              <span>
                PLANÈTE {pad(shown)} / {total}
              </span>
              <span className="status">
                <StatusDot project={p} />
                {statusLabel(p)}
              </span>
            </div>
            <strong>{p.title}</strong>
            <p>{p.summary}</p>
            <div className="chips">
              {p.stack.slice(0, 3).map((t) => (
                <span key={t} className="chip">
                  {t}
                </span>
              ))}
            </div>
            <span className="go">En savoir plus →</span>
          </>
        )}
      </div>
    </>
  );
}
