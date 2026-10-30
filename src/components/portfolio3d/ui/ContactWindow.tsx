"use client";

import { WindowTitleBar } from "./WindowTitleBar";
import { ContactLinks } from "./ContactLinks";
import { ProjectPreview } from "./ProjectPreview";
import type { Project } from "@/types";

interface ContactWindowProps {
  isOverviewMode: boolean;
  currentProject: Project | null;
}

/**
 * Fenêtre flottante : contact en mode overview, preview en mode projet
 */
export function ContactWindow({
  isOverviewMode,
  currentProject,
}: ContactWindowProps) {
  return (
    <div className="absolute bottom-36 left-4 md:bottom-65 md:left-6 w-40 md:w-64 lg:w-80 bg-[#FFFEF5]/95 rounded-sm overflow-hidden sketch-shadow z-20 visible-sketch-border">
      <WindowTitleBar
        size="sm"
        title={isOverviewMode ? "[ CONTACT ]" : "[ PREVIEW ]"}
      />

      {isOverviewMode ? (
        <ContactLinks />
      ) : (
        currentProject && <ProjectPreview project={currentProject} />
      )}
    </div>
  );
}
