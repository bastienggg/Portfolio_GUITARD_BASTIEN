import type { Project } from "@/types";

interface ProjectPreviewProps {
  project: Project;
}

/**
 * Contenu de la fenêtre Preview (image cliquable du projet courant)
 */
export function ProjectPreview({ project }: ProjectPreviewProps) {
  return (
    <div className="p-0">
      <a
        href={project.demoUrl || project.githubUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="block group cursor-pointer"
      >
        <div className="relative overflow-hidden aspect-video border border-[#0F0F0F]/20">
          <img
            src={project.imageUrl}
            alt={project.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#F7F7E1]/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-1.5 md:p-3">
            <span className="text-[#0F0F0F] text-[8px] md:text-xs font-mono font-bold">
              &gt; VOIR
            </span>
          </div>
        </div>
      </a>
      <div className="p-1.5 md:p-3 font-mono text-[7px] md:text-[9px] text-[#4A4A4A] truncate">
        <span className="text-[#0F0F0F] font-bold">&gt;</span> {project.title}
      </div>
    </div>
  );
}
