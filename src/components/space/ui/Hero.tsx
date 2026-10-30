"use client";

import { forwardRef } from "react";
import { profile } from "@/data/profile";
import { planetHref, projects, total } from "@/lib/projects";

interface HeroProps {
  go: (href: string) => void;
  onShowList: () => void;
  onCopyMail: () => void;
}

/** Présentation affichée dans la vue système */
export const Hero = forwardRef<HTMLButtonElement, HeroProps>(function Hero(
  { go, onShowList, onCopyMail },
  exploreRef
) {
  return (
    <section className="hero" aria-labelledby="heroTitle">
      <p className="mono hero-status">&gt; system_online · {total} planètes détectées</p>
      <div className="hero-title">
        <h1 id="heroTitle">
          Bastien
          <br />
          Guitard
        </h1>
        <span className="hand">← dév full-stack &amp; créatif</span>
      </div>
      <p>
        Je conçois et développe des produits web, du temps réel à la VR, là où le code rencontre
        le design. Chaque planète est un projet : approche-toi pour en lire l&apos;histoire.
      </p>
      <div className="row">
        <button ref={exploreRef} className="btn" onClick={() => go(planetHref(projects[0]))}>
          Explorer →
        </button>
        <button className="btn-ghost" onClick={onShowList}>
          Voir en liste
        </button>
      </div>
      <div className="links">
        <a href={profile.github} target="_blank" rel="noreferrer">
          GitHub ↗
        </a>
        <a href={profile.linkedin} target="_blank" rel="noreferrer">
          LinkedIn ↗
        </a>
        <button onClick={onCopyMail}>Email : {profile.email} · copier</button>
      </div>
    </section>
  );
});
