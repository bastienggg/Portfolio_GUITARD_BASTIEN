import projectsData from "./projects.json";

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
  featured?: boolean;
}

export const featuredProjects: Project[] = projectsData as Project[];

export const getProjectById = (id: string): Project | undefined => {
  return featuredProjects.find((project) => project.id === id);
};

export const getProjectsByStatus = (status: Project["status"]): Project[] => {
  return featuredProjects.filter((project) => project.status === status);
};

export const getFeaturedProjects = (): Project[] => {
  return featuredProjects.filter((project) => project.featured === true);
};
