"use client";

import { profile } from "@/data/profile";
import { setConsent, useConsent } from "./consent";

const LABELS = { granted: "acceptés", denied: "refusés", none: "aucun choix" } as const;

/** Remet le choix à zéro pour faire réapparaître le bandeau */
export function ManageCookiesButton() {
  const consent = useConsent();
  if (!profile.gaId) return null;

  return (
    <p className="legal-consent">
      <span className="mono">Statut actuel : {consent ? LABELS[consent] : "…"}</span>
      <button className="btn-ghost" onClick={() => setConsent("none")}>
        Gérer mes cookies
      </button>
    </p>
  );
}
