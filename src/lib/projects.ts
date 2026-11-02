import data from "@/data/projects.json";
import type { Project } from "@/types/project";

/** Projets affichés : ceux marqués "enabled": false dans le JSON sont ignorés */
export const projects = (data as Project[]).filter((p) => p.enabled !== false);
export const projectCount = projects.length;

/** 0 → "01" */
export const pad = (i: number) => String(i + 1).padStart(2, "0");
export const total = String(projectCount).padStart(2, "0");

export const wrapIndex = (i: number) => (i + projectCount) % projectCount;

export const getProjectIndex = (slug: string) =>
  projects.findIndex((p) => p.slug === slug);

export const getProjectBySlug = (slug: string) =>
  projects.find((p) => p.slug === slug);

export const statusLabel = (p: Project) =>
  p.status === "completed" ? "Terminé" : "En cours";

export const planetHref = (p: Project) => `/planete/${p.slug}`;
export const reportHref = (p: Project) => `/projets/${p.slug}`;
