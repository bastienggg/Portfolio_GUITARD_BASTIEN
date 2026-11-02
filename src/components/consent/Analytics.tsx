"use client";

import Script from "next/script";
import { profile } from "@/data/profile";
import { useConsent } from "./consent";

/**
 * Google Analytics 4, chargé uniquement après consentement.
 * Les navigations entre pages (planètes, rapports) sont suivies par la
 * « mesure améliorée » de GA4 (changements d'historique), rien à faire de plus.
 */
export function Analytics() {
  const consent = useConsent();
  const id = profile.gaId;
  if (!id || consent !== "granted") return null;

  return (
    <>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${id}`} strategy="afterInteractive" />
      <Script id="ga-init" strategy="afterInteractive">
        {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${id}', { anonymize_ip: true });`}
      </Script>
    </>
  );
}
