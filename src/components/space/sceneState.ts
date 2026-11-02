import { Vector3 } from "three";
import { projectCount } from "@/lib/projects";

/**
 * État partagé entre l'interface React et la boucle 3D (useFrame).
 * Objets mutables : la scène les lit à chaque frame sans provoquer de re-render.
 */
export type View = "intro" | "system" | "focus" | "report";
export type DisplayMode = "3d" | "list";

export const sceneState = {
  view: "intro" as View,
  cur: 0,
  mode: "3d" as DisplayMode,
  hovered: -1,
  /** Position de la souris, de -0.5 à 0.5 (parallaxe caméra) */
  pointer: { x: 0, y: 0 },
};

/** Position monde de chaque planète, mise à jour par <Planet> à chaque frame */
export const planetWorld = Array.from({ length: projectCount }, () => new Vector3());

/** Éléments DOM positionnés depuis la 3D (étiquettes, carte de survol) */
export const overlayEls = {
  labels: [] as (HTMLElement | null)[],
  card: null as HTMLElement | null,
};

export const INK = "#141414";
export const ORBITS = [7.5, 11.5, 15.5, 19.5, 24, 28, 32];

export const orbitRadius = (i: number) =>
  ORBITS[i % ORBITS.length] + Math.floor(i / ORBITS.length) * 2;

/** Rayon de la dernière orbite utilisée (sert au cadrage et à la ceinture) */
export const outerOrbit = ORBITS[Math.min(projectCount, ORBITS.length) - 1];

export const planetRadius = (size: number) => 0.95 * size;

export const isMobileWidth = (w: number) => w <= 900;
