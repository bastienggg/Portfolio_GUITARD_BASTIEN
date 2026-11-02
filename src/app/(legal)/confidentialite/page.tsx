import type { Metadata } from "next";
import { ManageCookiesButton } from "@/components/consent/ManageCookiesButton";
import { profile } from "@/data/profile";

export const metadata: Metadata = {
  title: "Politique de confidentialité",
  description: "Données personnelles et cookies sur le portfolio de Bastien Guitard : Google Analytics, consentement, droits RGPD.",
  alternates: { canonical: "/confidentialite" },
};

export default function Confidentialite() {
  return (
    <article>
      <p className="mono legal-status">&gt; doc_privacy · mis à jour le {profile.legalUpdated}</p>
      <h1>Confidentialité</h1>

      <h2>Responsable du traitement</h2>
      <p>
        {profile.name} — <a href={`mailto:${profile.email}`}>{profile.email}</a>
      </p>

      <h2>Données collectées</h2>
      <p>
        Le site ne comporte ni formulaire ni compte utilisateur : aucune donnée personnelle
        n&apos;est demandée. Seules des statistiques de visite peuvent être collectées, et
        uniquement si tu l&apos;acceptes.
      </p>
      <p>
        Le site enregistre aussi ton choix concernant les cookies dans le stockage local de ton
        navigateur, pour ne pas te le redemander à chaque visite (6 mois maximum).
      </p>

      <h2>Mesure d&apos;audience (Google Analytics)</h2>
      <p>
        Avec ton accord, le site utilise Google Analytics 4, fourni par Google Ireland Limited
        (Gordon House, Barrow Street, Dublin 4, Irlande), pour savoir combien de personnes visitent
        le site et quels projets sont consultés. Les adresses IP sont anonymisées.
      </p>
      <ul>
        <li>Cookies déposés : <code>_ga</code> et <code>_ga_*</code></li>
        <li>Durée de vie : 13 mois maximum</li>
        <li>Base légale : ton consentement, que tu peux retirer à tout moment</li>
        <li>
          Des données peuvent être transférées aux États-Unis (Google LLC), dans le cadre du
          Data Privacy Framework UE–États-Unis
        </li>
      </ul>
      <p>Si tu refuses, aucun cookie Google Analytics n&apos;est déposé et le site fonctionne normalement.</p>
      <ManageCookiesButton />

      <h2>Tes droits</h2>
      <p>
        Conformément au RGPD, tu disposes d&apos;un droit d&apos;accès, de rectification,
        d&apos;effacement, d&apos;opposition et de limitation sur tes données. Pour les exercer,
        écris à <a href={`mailto:${profile.email}`}>{profile.email}</a>.
      </p>
      <p>
        Tu peux aussi adresser une réclamation à la CNIL :{" "}
        <a href="https://www.cnil.fr/fr/plaintes" target="_blank" rel="noreferrer">
          cnil.fr/fr/plaintes
        </a>
        .
      </p>
    </article>
  );
}
