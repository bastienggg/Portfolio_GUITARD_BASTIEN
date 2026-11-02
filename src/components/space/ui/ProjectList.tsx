"use client";

import { pad, planetHref, projects, statusLabel, total } from "@/lib/projects";

/** Vue « liste » de tous les projets (alternative à la 3D) */
export function ProjectList({ go }: { go: (href: string) => void }) {
  return (
    <section className="list" aria-label="Tous les projets">
      <div className="list-head">
        <span>Tous les projets</span>
        <span>{total}</span>
      </div>
      <div>
        {projects.map((p, i) => (
          <button key={p.slug} className="list-row" onClick={() => go(planetHref(p))}>
            <span className="n">{pad(i)}</span>
            <span className="ball" style={{ background: p.planet.color }} />
            <span className="txt">
              <span className="t">{p.title}</span>
              <span className="sub">{p.summary}</span>
            </span>
            <span className="k">
              {p.kind} · {statusLabel(p)} →
            </span>
          </button>
        ))}
      </div>
    </section>
  );
}
