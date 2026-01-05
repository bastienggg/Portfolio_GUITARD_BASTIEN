/**
 * Interface représentant un projet
 */
export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  technologies: string[];
  githubUrl?: string;
  demoUrl?: string;
  imageUrl: string;
  modelPath?: string; // Chemin vers le modèle GLB (optionnel)
  status: "completed" | "in-progress" | "planned";
  featured?: boolean;
}
