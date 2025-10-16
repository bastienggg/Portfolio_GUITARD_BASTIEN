export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  technologies: string[];
  githubUrl?: string;
  demoUrl?: string;
  imageUrl: string;
  status: "completed" | "in-progress" | "planned";
}

export const featuredProjects: Project[] = [
  {
    id: "dot-txt",
    title: "Dot TXT",
    description:
      "Application de gestion de projets avec tableau Kanban et collaboration en temps réel.",
    longDescription:
      "Une aplication de prise de note collaborative en temps réel inspirer de Google Docs. Elle permet a plusieurs utilisateurs de créer, modifier et organiser des notes simultanément avec une synchronisation instantanée.",
    technologies: [
      "Next.js",
      "TypeScript",
      "React.js",
      "Pinia",
      "Socket.io",
      "Node.js",
      "Docker",
    ],
    githubUrl: "https://github.com/bastienggg/Dot_TXT",
    demoUrl: "https://dot-txt.fr",
    imageUrl: "/projects/dottxt.png",
    status: "completed",
  },
  {
    id: "jeu-3d-webgl",
    title: "Let Him Quizz",
    description: "Un jeu 3D interactif développé avec Three.js et A-Frame.",
    longDescription:
      "Un jeu 3D immersif jouable en VR qui a pour but de faire apprendre l'anglais grace a un suite de mini jeux. Ce jeu a étais inspirer per des jeux TV du style Question pour un champion.",
    technologies: ["Three.js", "A-Frame", "WebGL", "JavaScript", "HTML", "CSS"],
    githubUrl: "https://github.com/bastienggg/Let_him_quizz",
    demoUrl: "https://bastienguitard.fr/Let_Him_Quizz/",
    imageUrl: "/projects/lethimquizz.png",
    status: "completed",
  },
  {
    id: "zippy-the-mousse",
    title: "Zippy the Mousse",
    description:
      "Jeu developpé avec p5.play pour sensibiliser a la polution digitale.",
    longDescription:
      "Un jeu éducatif interactif qui sensibilise les joueurs à la pollution numérique à travers des mécaniques de jeu engageantes et des visuels attrayants.",
    technologies: ["p5.js", "JavaScript", "Tailwind CSS"],
    githubUrl: "https://github.com/mathismce/nuitMMIG5",
    demoUrl: "https://bastienguitard.fr/zippy/",
    imageUrl: "/projects/zippy.png",
    status: "completed",
  },
];

export const getProjectById = (id: string): Project | undefined => {
  return featuredProjects.find((project) => project.id === id);
};

export const getProjectsByStatus = (status: Project["status"]): Project[] => {
  return featuredProjects.filter((project) => project.status === status);
};
