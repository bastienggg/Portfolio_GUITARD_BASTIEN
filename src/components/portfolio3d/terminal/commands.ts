import type { Project } from "@/types";

export interface CommandResult {
  /** Lignes à ajouter à l'historique (après la commande saisie) */
  output: string[];
  /** Vider l'historique */
  clear?: boolean;
  /** Index du projet vers lequel naviguer */
  navigateTo?: number;
  /** Quitter le mode interactif */
  exit?: boolean;
}

const HELP_TEXT = `\nCommandes disponibles:\n  ls              - Liste tous les projets\n  cd [projet]     - Navigue vers un projet (par index ou nom)\n  help            - Affiche cette aide\n  clear           - Efface le terminal\n  whoami          - Informations sur le développeur\n  exit            - Quitte le mode interactif\n`;

const WHOAMI_TEXT = `\n╔══════════════════════════════════════╗\n║     BASTIEN GUITARD                  ║\n║     Développeur Full-Stack           ║\n╚══════════════════════════════════════╝\n\nÉtudiant en 3ème année BUT MMI\nPassionné par le développement web et les dispositifs interactifs\n\nGitHub: github.com/bastienggg\nLinkedIn: linkedin.com/in/bastien-guitard-30585329b\n`;

/**
 * Trouve un projet par index ou par nom/id
 */
function findProjectIndex(arg: string, projects: Project[]): number {
  const numArg = parseInt(arg);
  if (!isNaN(numArg) && numArg >= 0 && numArg < projects.length) {
    return numArg;
  }
  return projects.findIndex(
    (p) =>
      p.title.toLowerCase().includes(arg.toLowerCase()) ||
      p.id.toLowerCase() === arg.toLowerCase()
  );
}

/**
 * Exécute une commande du terminal interactif (ex: "cd Dot TXT")
 */
export function runCommand(input: string, projects: Project[]): CommandResult {
  const [command, ...rest] = input.split(" ");
  const args = rest.join(" ");

  switch (command.toLowerCase()) {
    case "ls": {
      const projectList = projects
        .map((p, i) => `  [${i}] ${p.title} - ${p.status}`)
        .join("\n");
      return { output: [`\nProjets disponibles:\n${projectList}\n`] };
    }

    case "cd": {
      if (!args) {
        return {
          output: ['Erreur: Spécifiez un projet (ex: cd 0 ou cd "Dot TXT")\n'],
        };
      }
      const projectIndex = findProjectIndex(args, projects);
      if (projectIndex < 0) {
        return { output: [`Projet non trouvé: "${args}"\n`] };
      }
      return {
        output: [`Navigation vers: ${projects[projectIndex].title}\n`],
        navigateTo: projectIndex,
        exit: true,
      };
    }

    case "help":
      return { output: [HELP_TEXT] };

    case "clear":
      return { output: [], clear: true };

    case "whoami":
      return { output: [WHOAMI_TEXT] };

    case "exit":
      return { output: [], clear: true, exit: true };

    default:
      return {
        output: [
          `Commande inconnue: "${command}". Tapez "help" pour voir les commandes disponibles.\n`,
        ],
      };
  }
}
