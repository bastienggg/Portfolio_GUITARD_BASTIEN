"use client";

import { useState, useRef, useEffect } from "react";
import type { Project } from "@/types";

interface TerminalInteractiveProps {
  projects: Project[];
  onNavigate: (index: number) => void;
  onExit: () => void;
}

/**
 * Composant Terminal en mode interactif
 */
export function TerminalInteractive({
  projects,
  onNavigate,
  onExit,
}: TerminalInteractiveProps) {
  const [terminalHistory, setTerminalHistory] = useState<string[]>([]);
  const [currentCommand, setCurrentCommand] = useState("");
  const terminalInputRef = useRef<HTMLInputElement>(null);
  const terminalHistoryRef = useRef<HTMLDivElement>(null);

  // Auto-scroll vers le bas quand l'historique change
  useEffect(() => {
    if (terminalHistoryRef.current) {
      terminalHistoryRef.current.scrollTop =
        terminalHistoryRef.current.scrollHeight;
    }
  }, [terminalHistory]);

  // Focus automatique sur l'input
  useEffect(() => {
    terminalInputRef.current?.focus();
  }, []);

  const executeCommand = (cmd: string) => {
    const trimmedCmd = cmd.trim();
    if (!trimmedCmd) return;

    setTerminalHistory((prev) => [...prev, `> ${trimmedCmd}`]);

    const [command, ...args] = trimmedCmd.split(" ");
    const arg = args.join(" ");

    switch (command.toLowerCase()) {
      case "ls":
        const projectList = projects
          .map((p, i) => `  [${i}] ${p.title} - ${p.status}`)
          .join("\n");
        setTerminalHistory((prev) => [
          ...prev,
          `\nProjets disponibles:\n${projectList}\n`,
        ]);
        break;

      case "cd":
        if (!arg) {
          setTerminalHistory((prev) => [
            ...prev,
            'Erreur: Spécifiez un projet (ex: cd 0 ou cd "Dot TXT")\n',
          ]);
        } else {
          let projectIndex = -1;
          const numArg = parseInt(arg);

          if (!isNaN(numArg) && numArg >= 0 && numArg < projects.length) {
            projectIndex = numArg;
          } else {
            projectIndex = projects.findIndex(
              (p) =>
                p.title.toLowerCase().includes(arg.toLowerCase()) ||
                p.id.toLowerCase() === arg.toLowerCase()
            );
          }

          if (projectIndex >= 0) {
            onNavigate(projectIndex);
            setTerminalHistory((prev) => [
              ...prev,
              `Navigation vers: ${projects[projectIndex].title}\n`,
            ]);
            onExit();
          } else {
            setTerminalHistory((prev) => [
              ...prev,
              `Projet non trouvé: "${arg}"\n`,
            ]);
          }
        }
        break;

      case "help":
        const helpText = `\nCommandes disponibles:\n  ls              - Liste tous les projets\n  cd [projet]     - Navigue vers un projet (par index ou nom)\n  help            - Affiche cette aide\n  clear           - Efface le terminal\n  whoami          - Informations sur le développeur\n  exit            - Quitte le mode interactif\n`;
        setTerminalHistory((prev) => [...prev, helpText]);
        break;

      case "clear":
        setTerminalHistory([]);
        break;

      case "whoami":
        const aboutText = `\n╔══════════════════════════════════════╗\n║     BASTIEN GUITARD                  ║\n║     Développeur Full-Stack           ║\n╚══════════════════════════════════════╝\n\nÉtudiant en 3ème année BUT MMI\nPassionné par le développement web et les dispositifs interactifs\n\nGitHub: github.com/bastienggg\nLinkedIn: linkedin.com/in/bastien-guitard-30585329b\n`;
        setTerminalHistory((prev) => [...prev, aboutText]);
        break;

      case "exit":
        onExit();
        setTerminalHistory([]);
        break;

      default:
        setTerminalHistory((prev) => [
          ...prev,
          `Commande inconnue: "${command}". Tapez "help" pour voir les commandes disponibles.\n`,
        ]);
    }

    setCurrentCommand("");
  };

  return (
    <div className="p-6 md:p-10 h-full font-mono text-[#0F0F0F] relative flex flex-col">
      <div
        ref={terminalHistoryRef}
        className="flex-1 overflow-y-auto text-xs md:text-sm scrollbar-hide"
      >
        <div className="text-[#0F0F0F] mb-4 font-bold">
          ╭──────────────────────────────────────╮
          <br />│ TERMINAL INTERACTIF v1.0 │
          <br />
          ╰──────────────────────────────────────╯
          <br />
          <br />
          Tapez &quot;help&quot; pour voir les commandes disponibles.
          <br />
        </div>
        {terminalHistory.map((line, i) => (
          <div key={i} className="whitespace-pre-wrap">
            {line.startsWith(">") ? (
              <span className="text-[#0F0F0F] font-bold">{line}</span>
            ) : (
              <span className="text-[#4A4A4A]">{line}</span>
            )}
          </div>
        ))}

        <div className="flex items-start gap-2 mt-2">
          <span className="text-[#0F0F0F] text-xs md:text-sm flex-shrink-0 font-bold">
            &gt;
          </span>
          <div className="flex-1 flex items-center">
            <input
              ref={terminalInputRef}
              type="text"
              value={currentCommand}
              onChange={(e) => setCurrentCommand(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  executeCommand(currentCommand);
                }
              }}
              className="flex-1 bg-transparent text-[#0F0F0F] outline-none font-mono text-xs md:text-sm border-b border-[#9A9A8A]/30 focus:border-[#0F0F0F]/60 transition-colors"
              placeholder="Tapez une commande..."
              autoFocus
            />
            <span className="animate-pulse text-[#0F0F0F] ml-1">█</span>
          </div>
        </div>
      </div>
    </div>
  );
}
