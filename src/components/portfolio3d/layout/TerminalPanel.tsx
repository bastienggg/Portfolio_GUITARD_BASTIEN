"use client";

import { Terminal } from "../terminal";
import { WindowTitleBar, HandDrawnDivider } from "../ui";
import type { Project } from "@/types";

interface TerminalPanelProps {
  isOverviewMode: boolean;
  currentProject: Project | null;
  projects: Project[];
  onNavigate: (index: number) => void;
}

/**
 * Fenêtre Terminal - Mobile: en bas | Desktop: à gauche 30%
 */
export function TerminalPanel({
  isOverviewMode,
  currentProject,
  projects,
  onNavigate,
}: TerminalPanelProps) {
  const title = isOverviewMode
    ? "[ SYSTEM ]"
    : `[ ${currentProject?.title.toUpperCase() || "PROJECT"} ]`;

  return (
    <div className="w-full h-1/2 md:w-[30%] md:h-full order-2 md:order-1 bg-[#F7F7E1] relative overflow-hidden">
      <HandDrawnDivider />
      <WindowTitleBar title={title} />

      <div className="h-[calc(100%-2.5rem)] overflow-hidden relative">
        <Terminal
          isOverviewMode={isOverviewMode}
          currentProject={currentProject}
          projects={projects}
          onNavigate={onNavigate}
        />
      </div>
    </div>
  );
}
