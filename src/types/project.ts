/**
 * Un projet = une planète dans la scène + une page « rapport de mission ».
 * Tous les champs viennent de src/data/projects.json.
 */
export interface Project {
  /** false = projet masqué partout (planète, liste, rapport, sitemap). Absent = affiché */
  enabled?: boolean;
  slug: string;
  title: string;
  /** Type de projet, affiché à côté du titre (ex. « jeu VR ») */
  kind: string;
  status: "completed" | "in-progress";
  planet: {
    color: string;
    spot: string;
    /** Taille relative (1 = taille de base) */
    size: number;
    ring: boolean;
    /** Modèle 3D .glb (dans public/). Vide = planète low-poly générée avec color/spot */
    model?: string;
  };
  tagline: string;
  /** Fin de la tagline, mise en couleur d'accent */
  taglineAccent: string;
  summary: string;
  role: string;
  context: string;
  duration: string;
  team: string;
  year: string;
  stack: string[];
  links: { demo: string; github: string };
  /** Image/GIF de la fenêtre d'aperçu (vide = placeholder) */
  preview: string;
  /** Image de couverture du rapport (vide = placeholder) */
  cover: string;
  intro: string;
  tasks: string[];
  goal: string;
  features: { title: string; text: string }[];
  techChoices: { tech: string; why: string }[];
  challenge: { problem: string; solution: string };
  result: string;
  learned: string;
  gallery: string[];
}
