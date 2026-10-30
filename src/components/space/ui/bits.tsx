import type { Project } from "@/types/project";
import { statusLabel } from "@/lib/projects";

/** Pastille de statut : verte = en cours, noire = terminé */
export function StatusDot({ project }: { project: Project }) {
  return <span className={`dot${project.status === "completed" ? " done" : ""}`} />;
}

export function StatusPill({ project }: { project: Project }) {
  return (
    <span className="pill">
      <StatusDot project={project} />
      {statusLabel(project)}
    </span>
  );
}

/** Image si elle existe, sinon le texte de remplacement « [alt] » sur fond hachuré */
export function Placeholder({
  src,
  alt,
  className = "",
}: {
  src?: string;
  alt: string;
  className?: string;
}) {
  return (
    <div className={`ph${src ? " has-img" : ""}${className ? ` ${className}` : ""}`}>
      {src ? (
        <img src={src} alt={alt} loading="lazy" />
      ) : (
        `[${alt}]`
      )}
    </div>
  );
}

/** Lien externe, ou bouton grisé quand l'URL est vide */
export function LinkButton({
  url,
  label,
  primary,
  offLabel,
}: {
  url: string;
  label: string;
  primary?: boolean;
  offLabel: string;
}) {
  if (!url) return <span className="btn-off">{offLabel}</span>;
  return (
    <a className={primary ? "btn" : "btn-ghost"} href={url} target="_blank" rel="noreferrer">
      {label} <span aria-hidden="true">↗</span>
    </a>
  );
}

export function WinDots() {
  return (
    <span className="win-dots">
      <i />
      <i />
      <i />
    </span>
  );
}
