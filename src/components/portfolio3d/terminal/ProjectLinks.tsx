import type { Project } from "@/types";

interface ProjectLinksProps {
  project: Project;
}

/**
 * Boutons GITHUB / DEMO d'un projet
 */
export function ProjectLinks({ project }: ProjectLinksProps) {
  if (!project.githubUrl && !project.demoUrl) return null;

  return (
    <div className="mt-2 md:mt-8 flex flex-row gap-2 md:gap-4 flex-shrink-0">
      {project.githubUrl && (
        <a
          href={project.githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 px-2 md:px-4 py-1.5 md:py-2 text-[10px] md:text-base border-2 border-[#0F0F0F] text-[#0F0F0F] hover:bg-[#0F0F0F] hover:text-[#F7F7E1] transition-all sketch-shadow text-center font-bold"
        >
          &gt; GITHUB
        </a>
      )}
      {project.demoUrl && (
        <a
          href={project.demoUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 px-2 md:px-4 py-1.5 md:py-2 text-[10px] md:text-base bg-[#0F0F0F] text-[#F7F7E1] hover:bg-[#2A2A2A] transition-all sketch-shadow text-center font-bold"
        >
          &gt; DEMO
        </a>
      )}
    </div>
  );
}
