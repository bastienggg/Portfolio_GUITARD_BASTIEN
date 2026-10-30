"use client";

import { pad, projects, reportHref, total } from "@/lib/projects";
import { LinkButton, Placeholder, StatusPill, WinDots } from "./bits";

interface FocusPanelProps {
  cur: number;
  go: (href: string) => void;
}

/** Vue planète : panneau de gauche et fenêtre d'aperçu */
export function FocusPanel({ cur, go }: FocusPanelProps) {
  const p = projects[cur];

  return (
    <>
      <section className="focus" id="focus" aria-live="polite">
        <div className="head">
          <span>
            PLANÈTE <b>{pad(cur)}</b> / {total}
          </span>
          <StatusPill project={p} />
        </div>
        <div className="titles">
          <h2>{p.title}</h2>
          <p className="tag">
            {p.tagline} <em>{p.taglineAccent}</em>
          </p>
        </div>
        <p className="sum">{p.summary}</p>
        <div className="stack">
          {p.stack.map((t) => (
            <span key={t} className="chip">
              {t}
            </span>
          ))}
        </div>
        <div className="acts">
          <button className="btn" onClick={() => go(reportHref(p))}>
            En savoir plus →
          </button>
          <LinkButton url={p.links.demo} label="Démo" offLabel="Démo bientôt" />
        </div>
      </section>

      <div className="preview">
        <div className="win-bar">
          <WinDots />
          <span>aperçu · {p.slug}</span>
          <span>▶</span>
        </div>
        <Placeholder src={p.preview} alt="Vidéo / GIF du projet" />
      </div>
    </>
  );
}
