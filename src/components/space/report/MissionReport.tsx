"use client";

import { pad, planetHref, projects, reportHref, statusLabel, total, wrapIndex } from "@/lib/projects";
import { LinkButton, Placeholder, StatusDot, WinDots } from "../ui/bits";
import { ReportPlanet } from "./ReportPlanet";

interface MissionReportProps {
  index: number;
  /** Faux quand le rapport est masqué : coupe le rendu 3D */
  active: boolean;
  go: (href: string) => void;
}

/** Page détaillée d'un projet (« rapport de mission »), entièrement remplie par projects.json */
export function MissionReport({ index, active, go }: MissionReportProps) {
  const p = projects[index];
  const prev = projects[wrapIndex(index - 1)];
  const nextI = wrapIndex(index + 1);
  const nx = projects[nextI];
  const spot = p.planet.spot;
  const facts: [string, string][] = [
    ["Rôle", p.role],
    ["Cadre", p.context],
    ["Durée", p.duration],
    ["Équipe", p.team],
    ["Année", p.year],
  ];

  return (
    <>
      <div className="r-bar">
        <div className="wrap">
          <div className="r-nav">
            <button aria-label="Rapport précédent" onClick={() => go(reportHref(prev))}>
              ←
            </button>
            <span>
              RAPPORT <b>{pad(index)}</b>/ {total}
            </span>
            <button aria-label="Rapport suivant" onClick={() => go(reportHref(nx))}>
              →
            </button>
          </div>
          <button className="r-back" onClick={() => go(planetHref(p))}>
            ← Retour
          </button>
        </div>
      </div>

      <section className="r-hero">
        <div className="r-orbit" aria-hidden="true" />
        {p.planet.model ? (
          <div className="r-planet is-3d" aria-hidden="true">
            <ReportPlanet url={p.planet.model} active={active} />
          </div>
        ) : (
          <div className="r-planet" aria-hidden="true" style={{ background: p.planet.color }}>
            <div className="shade" />
            <div className="spot" style={{ left: "12%", top: "18%", width: "30%", height: "18%", background: spot }} />
            <div className="spot" style={{ left: "46%", top: "58%", width: "22%", height: "12%", background: spot, opacity: 0.8 }} />
            <div className="spot" style={{ left: "16%", top: "62%", width: "10%", height: "6%", background: spot, opacity: 0.7 }} />
          </div>
        )}
        <div className="wrap">
          <div className="r-tags">
            <span className="solid">Rapport de mission</span>
            <span>Orbite {pad(index)}</span>
            <span>
              <StatusDot project={p} />
              {statusLabel(p)}
            </span>
          </div>
          <h1>{p.title}</h1>
          <p className="tag">
            {p.tagline} <em>{p.taglineAccent}</em>
          </p>
        </div>
      </section>

      <div className="wrap r-cover">
        <figure>
          <div className="win-bar">
            <WinDots />
            <span>{p.slug}</span>
            <span>cover</span>
          </div>
          <Placeholder src={p.cover} alt={`Cover : capture ou vidéo de ${p.title}`} />
        </figure>
      </div>

      <div className="wrap r-body">
        <div className="r-main">
          <section className="r-sec">
            <h2>
              <small>01</small>Le contexte
            </h2>
            <p className="p">{p.intro}</p>
          </section>

          <section className="r-sec">
            <h2>
              <small>02</small>Mon rôle
            </h2>
            <ul className="r-tasks">
              {p.tasks.map((t, k) => (
                <li key={k}>{t}</li>
              ))}
            </ul>
          </section>

          <section className="r-sec">
            <h2>
              <small>03</small>L&apos;objectif
            </h2>
            <blockquote className="r-goal">« {p.goal} »</blockquote>
          </section>

          <section className="r-sec">
            <h2>
              <small>04</small>La solution
            </h2>
            <div className="r-feats">
              {p.features.map((f, k) => (
                <article key={k} className="r-feat">
                  <div className="ph">[image]</div>
                  <div>
                    <h3>{f.title}</h3>
                    <p>{f.text}</p>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section className="r-sec">
            <h2>
              <small>05</small>Choix techniques
            </h2>
            <div className="r-tech">
              {p.techChoices.map((t, k) => (
                <div key={k}>
                  <strong>{t.tech}</strong>
                  <span>{t.why}</span>
                </div>
              ))}
            </div>
          </section>

          <section className="r-sec">
            <h2>
              <small>06</small>Le défi
            </h2>
            <div className="r-chal">
              <div>
                <span className="label">Problème</span>
                <p className="prob">{p.challenge.problem}</p>
              </div>
              <div>
                <span className="label acc">Solution</span>
                <p className="sol">{p.challenge.solution}</p>
              </div>
            </div>
          </section>

          <section className="r-sec">
            <h2>
              <small>07</small>Bilan
            </h2>
            <div className="r-bilan">
              <div>
                <span className="label">Résultat</span>
                <p>{p.result}</p>
              </div>
              <div className="sun">
                <span className="label">Ce que j&apos;ai appris</span>
                <p>{p.learned}</p>
              </div>
            </div>
          </section>
        </div>

        <aside className="r-aside" aria-label="Fiche mission">
          <div className="hd">
            <span>Fiche mission</span>
            <span aria-hidden="true">◉</span>
          </div>
          <dl>
            {facts.map(([k, v]) => (
              <div key={k}>
                <dt className="label">{k}</dt>
                <dd>{v}</dd>
              </div>
            ))}
          </dl>
          <div className="stk">
            <span className="label">Stack</span>
            <div>
              {p.stack.map((t) => (
                <span key={t} className="chip">
                  {t}
                </span>
              ))}
            </div>
          </div>
          <div className="acts">
            <LinkButton url={p.links.demo} label="Démo" primary offLabel="Démo bientôt" />
            <LinkButton url={p.links.github} label="GitHub" offLabel="Code privé" />
          </div>
        </aside>
      </div>

      <section className="wrap r-gal">
        <h2>Galerie</h2>
        <div className="grid">
          {p.gallery.map((g, k) => (
            <Placeholder key={k} src={g} alt={k === 0 ? "Image principale" : `Image ${k + 1}`} />
          ))}
        </div>
      </section>

      <button className="r-next" onClick={() => go(reportHref(nx))}>
        {nx.planet.model ? (
          <span className="ball is-3d" aria-hidden="true">
            <ReportPlanet url={nx.planet.model} active={active} />
          </span>
        ) : (
          <span className="ball" aria-hidden="true" style={{ background: nx.planet.color }} />
        )}
        <span className="wrap">
          <span className="ey">
            Mission suivante · {pad(nextI)} / {total}
          </span>
          <span className="ttl">{nx.title} →</span>
          <span className="sub">{nx.summary}</span>
        </span>
      </button>
    </>
  );
}
