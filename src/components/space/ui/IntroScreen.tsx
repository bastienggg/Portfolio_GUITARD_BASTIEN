"use client";

import { forwardRef } from "react";
import { profile } from "@/data/profile";
import { total } from "@/lib/projects";

interface IntroScreenProps {
  gone: boolean;
  onEnter: (withSound: boolean) => void;
}

/** Écran « ENTRER » : le clic sert aussi de geste utilisateur pour lancer la musique */
export const IntroScreen = forwardRef<HTMLButtonElement, IntroScreenProps>(function IntroScreen(
  { gone, onEnter },
  enterRef
) {
  return (
    <div className={`intro${gone ? " gone" : ""}`} aria-hidden={gone}>
      <div className="intro-top">
        <span>&gt; bastien.guitard · portfolio</span>
        <span>Système chargé · {total} planètes</span>
      </div>

      <div className="intro-mid">
        <div className="intro-orbits" aria-hidden="true">
          <i style={{ width: "min(1300px,170vw)", height: "min(520px,70vw)" }} />
          <i style={{ width: "min(980px,130vw)", height: "min(390px,52vw)" }} />
          <i style={{ width: "min(660px,90vw)", height: "min(260px,36vw)" }} />
          <b style={{ left: "calc(50% - 300px)", top: "42%", width: 26, height: 26, background: "#3D4BE0" }} />
          <b style={{ left: "calc(50% + 380px)", top: "36%", width: 22, height: 22, background: "#D94A3D" }} />
          <b style={{ left: "calc(50% - 520px)", top: "64%", width: 30, height: 30, background: "#2F7D4F" }} />
          <b style={{ left: "calc(50% + 520px)", top: "70%", width: 34, height: 34, background: "#4F8FC0" }} />
        </div>
        <h1>{profile.name}</h1>
        <p className="role">Développeur full-stack &amp; créatif</p>
        <div className="intro-sun" aria-hidden="true" />
        <button ref={enterRef} className="enter" onClick={() => onEnter(true)} tabIndex={gone ? -1 : 0}>
          ENTRER
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M5 12h14" />
            <path d="M13 6l6 6-6 6" />
          </svg>
        </button>
        <span className="enter-sub">Lance la musique</span>
      </div>

      <div className="intro-foot">
        <span className="intro-note">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M3 18v-6a9 9 0 0 1 18 0v6" />
            <path d="M21 19a2 2 0 0 1-2 2h-1v-6h3z" />
            <path d="M3 19a2 2 0 0 0 2 2h1v-6H3z" />
          </svg>
          Expérience sonore
        </span>
        <button className="mute-enter" onClick={() => onEnter(false)} tabIndex={gone ? -1 : 0}>
          Sans le son →
        </button>
      </div>
    </div>
  );
});
