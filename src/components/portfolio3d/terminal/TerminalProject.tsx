"use client";

import { useTypewriter } from "@/hooks";
import { ProjectLinks } from "./ProjectLinks";
import type { Project } from "@/types";

interface TerminalProjectProps {
  project: Project;
  onActivate: () => void;
}

/**
 * Texte complet affiché par le typewriter pour un projet
 */
function buildProjectText(project: Project) {
  return `> PROJECT_LOADED\n\n━━━━━━━━━━━━━━━━━━━━━━━━━\n${project.title.toUpperCase()}\n━━━━━━━━━━━━━━━━━━━━━━━━━\n\n> description:\n  ${
    project.longDescription
  }\n\n> technologies:\n  [${project.technologies.join(
    "] ["
  )}]\n\n> status: ${project.status}\n\n> ready_`;
}

/**
 * Composant Terminal en mode Projet (affichage d'un projet avec typewriter)
 */
export function TerminalProject({ project, onActivate }: TerminalProjectProps) {
  const { displayedText, isTyping } = useTypewriter(buildProjectText(project));
  const title = project.title.toUpperCase();
  const lines = displayedText.split("\n");

  return (
    <div
      className="p-3 md:p-10 h-full font-mono text-[#0F0F0F] overflow-y-auto relative cursor-pointer transition-colors flex flex-col"
      onClick={(e) => {
        if ((e.target as HTMLElement).tagName !== "A") {
          onActivate();
        }
      }}
      title="Cliquer pour ouvrir le terminal interactif"
    >
      <div className="flex-1 overflow-y-auto scrollbar-hide">
        <pre className="whitespace-pre-wrap text-[10px] leading-tight md:text-sm md:leading-relaxed">
          {lines.map((line, i) => (
            <span key={i}>
              {line === title ? (
                <span className="text-[#0F0F0F] font-bold text-lg">{line}</span>
              ) : (
                line
              )}
              {i < lines.length - 1 && "\n"}
            </span>
          ))}
          {isTyping && <span className="animate-pulse text-[#0F0F0F]">█</span>}
        </pre>
      </div>

      {!isTyping && <ProjectLinks project={project} />}
    </div>
  );
}
