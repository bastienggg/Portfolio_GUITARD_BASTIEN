"use client";

import { useState } from "react";
import { TerminalOverview } from "./TerminalOverview";
import { TerminalProject } from "./TerminalProject";
import { TerminalInteractive } from "./TerminalInteractive";
import type { Project } from "@/types";

interface TerminalProps {
  isOverviewMode: boolean;
  currentProject: Project | null;
  projects: Project[];
  onNavigate: (index: number) => void;
}

/**
 * Composant Terminal principal qui gère les différents modes
 */
export function Terminal({
  isOverviewMode,
  currentProject,
  projects,
  onNavigate,
}: TerminalProps) {
  const [isInteractiveMode, setIsInteractiveMode] = useState(false);

  const handleActivate = () => {
    setIsInteractiveMode(true);
  };

  const handleExit = () => {
    setIsInteractiveMode(false);
  };

  if (isInteractiveMode) {
    return (
      <TerminalInteractive
        projects={projects}
        onNavigate={onNavigate}
        onExit={handleExit}
      />
    );
  }

  if (isOverviewMode) {
    return <TerminalOverview onActivate={handleActivate} />;
  }

  if (currentProject) {
    return (
      <TerminalProject
        key={currentProject.id}
        project={currentProject}
        onActivate={handleActivate}
      />
    );
  }

  return null;
}
