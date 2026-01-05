"use client";

import type { Project } from "@/types";

interface ContactWindowProps {
  isOverviewMode: boolean;
  currentProject: Project | null;
}

/**
 * Composant fenêtre de contact/preview
 */
export function ContactWindow({
  isOverviewMode,
  currentProject,
}: ContactWindowProps) {
  return (
    <div className="absolute bottom-36 left-4 md:bottom-65 md:left-6 w-40 md:w-64 lg:w-80 bg-[#FFFEF5]/95 rounded-sm overflow-hidden sketch-shadow z-20 visible-sketch-border">
      {/* Barre de titre */}
      <div className="h-6 md:h-8 bg-gradient-to-r from-[#FFFEF5] via-[#F7F7E1] to-[#FFFEF5] border-b-2 border-[#0F0F0F]/40 flex items-center px-2 md:px-3 relative">
        <div className="absolute inset-0 pencil-line opacity-10"></div>
        <div className="flex gap-1 md:gap-1.5 z-10">
          <div className="w-1 h-1 md:w-1.5 md:h-1.5 bg-[#0F0F0F] rounded-sm"></div>
          <div className="w-1 h-1 md:w-1.5 md:h-1.5 bg-[#4A4A4A] rounded-sm"></div>
          <div className="w-1 h-1 md:w-1.5 md:h-1.5 bg-[#9A9A8A] rounded-sm"></div>
        </div>
        <div className="flex-1 text-center z-10">
          <span className="text-[#0F0F0F] text-[8px] md:text-[10px] font-mono tracking-widest font-bold">
            {isOverviewMode ? "[ CONTACT ]" : "[ PREVIEW ]"}
          </span>
        </div>
      </div>

      {/* Contenu */}
      {isOverviewMode ? (
        // Mode Overview - Contact
        <div className="p-2 md:p-4 font-mono text-xs space-y-1.5 md:space-y-3">
          <div className="text-[#4A4A4A] text-[8px] md:text-xs">
            <span className="text-[#0F0F0F] font-bold">&gt;</span> contact.info
          </div>

          <div className="space-y-1 md:space-y-2">
            <a
              href="mailto:bastienguitard8@gmail.com"
              className="flex items-center gap-1.5 md:gap-2 text-[#0F0F0F] hover:text-[#4A4A4A] transition-colors group"
            >
              <span className="text-[#0F0F0F] text-xs md:text-base font-bold">
                @
              </span>
              <span className="text-[8px] md:text-[10px] font-bold">EMAIL</span>
            </a>

            <a
              href="https://github.com/bastienggg"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 md:gap-2 text-[#0F0F0F] hover:text-[#4A4A4A] transition-colors group"
            >
              <span className="text-[#0F0F0F] text-xs md:text-base font-bold">
                #
              </span>
              <span className="text-[8px] md:text-[10px] font-bold">
                GITHUB
              </span>
            </a>

            <a
              href="https://www.linkedin.com/in/bastien-guitard-30585329b/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 md:gap-2 text-[#0F0F0F] hover:text-[#4A4A4A] transition-colors group"
            >
              <span className="text-[#0F0F0F] text-xs md:text-base font-bold">
                in
              </span>
              <span className="text-[8px] md:text-[10px] font-bold">
                LINKEDIN
              </span>
            </a>
          </div>

          <div className="text-[#9A9A8A] text-[7px] md:text-[9px] mt-1.5 md:mt-3 border-t border-[#0F0F0F]/20 pt-1.5 md:pt-2">
            &gt; status: online_
          </div>
        </div>
      ) : (
        // Mode Projet - Preview Image
        currentProject && (
          <div className="p-0">
            <a
              href={currentProject.demoUrl || currentProject.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="block group cursor-pointer"
            >
              <div className="relative overflow-hidden aspect-video border border-[#0F0F0F]/20">
                <img
                  src={currentProject.imageUrl}
                  alt={currentProject.title}
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
              <span className="text-[#0F0F0F] font-bold">&gt;</span>{" "}
              {currentProject.title}
            </div>
          </div>
        )
      )}
    </div>
  );
}
