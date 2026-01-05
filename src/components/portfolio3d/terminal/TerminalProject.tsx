"use client";

import { useState, useEffect, useRef } from "react";
import type { Project } from "@/types";

interface TerminalProjectProps {
  project: Project;
  onActivate: () => void;
}

/**
 * Composant Terminal en mode Projet (affichage d'un projet avec typewriter)
 */
export function TerminalProject({ project, onActivate }: TerminalProjectProps) {
  const [terminalText, setTerminalText] = useState("");
  const [isTyping, setIsTyping] = useState(true); // Commencer toujours en mode typing

  useEffect(() => {
    // Toujours lancer l'animation au montage
    setIsTyping(true);
    setTerminalText("");

    const fullText = `> PROJECT_LOADED\n\n━━━━━━━━━━━━━━━━━━━━━━━━━\n${project.title.toUpperCase()}\n━━━━━━━━━━━━━━━━━━━━━━━━━\n\n> description:\n  ${
      project.longDescription
    }\n\n> technologies:\n  [${project.technologies.join(
      "] ["
    )}]\n\n> status: ${project.status}\n\n> ready_`;

    let currentChar = 0;
    const typingSpeed = 5;

    const typeInterval = setInterval(() => {
      if (currentChar < fullText.length) {
        setTerminalText(fullText.slice(0, currentChar + 1));
        currentChar++;
      } else {
        setIsTyping(false);
        clearInterval(typeInterval);
      }
    }, typingSpeed);

    return () => clearInterval(typeInterval);
  }, [project]);

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
          {terminalText.split("\n").map((line, i) => {
            const isTitle = line === project.title.toUpperCase();
            return (
              <span key={i}>
                {isTitle ? (
                  <span className="text-[#0F0F0F] font-bold text-lg">
                    {line}
                  </span>
                ) : (
                  line
                )}
                {i < terminalText.split("\n").length - 1 && "\n"}
              </span>
            );
          })}
          {isTyping && <span className="animate-pulse text-[#0F0F0F]">█</span>}
        </pre>
      </div>

      {!isTyping && (project.githubUrl || project.demoUrl) && (
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
      )}
    </div>
  );
}
