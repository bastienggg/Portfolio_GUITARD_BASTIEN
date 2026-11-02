import type { Metadata } from "next";
import Link from "next/link";
import { profile } from "@/data/profile";

export const metadata: Metadata = {
  title: "Mentions légales",
  description: "Mentions légales du portfolio de Bastien Guitard : éditeur, hébergeur, propriété intellectuelle.",
  alternates: { canonical: "/mentions-legales" },
};

export default function MentionsLegales() {
  return (
    <article>
      <p className="mono legal-status">&gt; doc_legal · mis à jour le {profile.legalUpdated}</p>
      <h1>Mentions légales</h1>

      <h2>Éditeur du site</h2>
      <p>
        Le site <a href={profile.url}>{profile.url.replace("https://", "")}</a> est édité à titre
        personnel par <strong>{profile.name}</strong>, particulier.
        <br />
        Contact : <a href={`mailto:${profile.email}`}>{profile.email}</a>
      </p>
      <p>Directeur de la publication : {profile.name}.</p>

      <h2>Hébergeur</h2>
      <p>
        {profile.host.name}
        <br />
        {profile.host.address}
        <br />
        Téléphone : {profile.host.phone} ·{" "}
        <a href={profile.host.url} target="_blank" rel="noreferrer">
          {profile.host.url.replace("https://", "")}
        </a>
      </p>

      <h2>Propriété intellectuelle</h2>
      <p>
        Le contenu du site (textes, design, code, visuels des projets) est la propriété de{" "}
        {profile.name}, sauf mention contraire. Toute reproduction ou réutilisation sans
        autorisation préalable est interdite.
      </p>
      <p>
        Les projets présentés peuvent avoir été réalisés en équipe ou dans un cadre scolaire ; les
        marques et logos cités appartiennent à leurs propriétaires respectifs. La musique
        d&apos;ambiance provient de Pixabay et est utilisée selon sa licence.
      </p>

      <h2>Liens externes</h2>
      <p>
        Le site contient des liens vers d&apos;autres sites (GitHub, LinkedIn, démos de projets).
        {` ${profile.name}`} n&apos;est pas responsable de leur contenu.
      </p>

      <h2>Données personnelles</h2>
      <p>
        Le traitement des données et l&apos;usage des cookies sont détaillés dans la{" "}
        <Link href="/confidentialite">politique de confidentialité</Link>.
      </p>
    </article>
  );
}
