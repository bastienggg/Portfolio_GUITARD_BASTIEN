"use client";

import { useSyncExternalStore } from "react";

/** Choix de l'utilisateur pour les cookies de mesure d'audience (Google Analytics) */
export type Consent = "granted" | "denied" | "none";

const KEY = "cookie-consent";
const EVENT = "consent-change";
/** La CNIL recommande de redemander le consentement au bout de 6 mois */
const MAX_AGE = 1000 * 60 * 60 * 24 * 182;

function read(): Consent {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return "none";
    const { value, date } = JSON.parse(raw) as { value: Consent; date: number };
    if (Date.now() - date > MAX_AGE) return "none";
    return value === "granted" || value === "denied" ? value : "none";
  } catch {
    return "none";
  }
}

/** Supprime les cookies _ga* déposés par Google Analytics */
function clearGaCookies() {
  const host = location.hostname;
  const domains = ["", host, `.${host}`, `.${host.split(".").slice(-2).join(".")}`];
  for (const c of document.cookie.split(";")) {
    const name = c.split("=")[0].trim();
    if (!name.startsWith("_ga")) continue;
    for (const d of domains) {
      document.cookie = `${name}=; Max-Age=0; path=/${d ? `; domain=${d}` : ""}`;
    }
  }
}

/** Enregistre le choix ; "none" remet à zéro (le bandeau réapparaît) */
export function setConsent(value: Consent) {
  const before = read();
  try {
    if (value === "none") localStorage.removeItem(KEY);
    else localStorage.setItem(KEY, JSON.stringify({ value, date: Date.now() }));
  } catch {
    // stockage indisponible (navigation privée…) : le choix ne vaut que pour cette page
  }
  window.dispatchEvent(new Event(EVENT));
  // Retrait du consentement : on efface les cookies et on recharge pour décharger gtag.js
  if (before === "granted" && value !== "granted") {
    clearGaCookies();
    location.reload();
  }
}

function subscribe(cb: () => void) {
  window.addEventListener(EVENT, cb);
  window.addEventListener("storage", cb);
  return () => {
    window.removeEventListener(EVENT, cb);
    window.removeEventListener("storage", cb);
  };
}

/** Côté serveur on renvoie null : rien ne s'affiche avant l'hydratation */
export function useConsent(): Consent | null {
  return useSyncExternalStore<Consent | null>(subscribe, read, () => null);
}
