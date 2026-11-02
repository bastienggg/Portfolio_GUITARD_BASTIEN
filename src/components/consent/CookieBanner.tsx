"use client";

import Link from "next/link";
import { profile } from "@/data/profile";
import { setConsent, useConsent } from "./consent";

/** Bandeau de consentement : Refuser et Accepter ont le même poids (exigence CNIL) */
export function CookieBanner() {
  const consent = useConsent();
  if (!profile.gaId || consent !== "none") return null;

  return (
    <div className="cookie" role="region" aria-labelledby="cookieTitle">
      <div className="win-bar">
        <span id="cookieTitle">cookies.log</span>
        <span className="win-dots" aria-hidden="true">
          <i />
          <i />
          <i />
        </span>
      </div>
      <div className="cookie-body">
        <p>
          J&apos;aimerais mesurer l&apos;audience du site avec Google Analytics. Ces cookies ne
          sont déposés qu&apos;avec ton accord.{" "}
          <Link href="/confidentialite">En savoir plus</Link>
        </p>
        <div className="cookie-acts">
          <button className="btn-ghost" onClick={() => setConsent("denied")}>
            Refuser
          </button>
          <button className="btn-ghost" onClick={() => setConsent("granted")}>
            Accepter
          </button>
        </div>
      </div>
    </div>
  );
}
