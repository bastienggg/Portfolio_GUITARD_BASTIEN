import type { Metadata } from "next";
import ProjectCard from "@/components/ProjectCard";
import { featuredProjects } from "@/data/featuredRepos";

export const metadata: Metadata = {
  title: "Projets",
  description:
    "Découvrez mes projets de développement web, applications et expériences interactives.",
};

export default function ProjectsPage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="py-20 lg:py-32 bg-gradient-to-br from-background via-background to-foreground/5">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl lg:text-6xl font-bold text-foreground">
                Mes Projets
              </h1>
              <p className="text-xl lg:text-2xl text-foreground/60">
                Une sélection de mes réalisations en développement web et
                dispositifs interactifs
              </p>
            </div>

            <p className="text-lg text-foreground/80 max-w-2xl mx-auto">
              Chaque projet représente une opportunité d'apprendre, d'innover et
              de créer des solutions qui répondent aux besoins réels des
              utilisateurs.
            </p>
          </div>
        </div>
      </section>

      {/* Tous les projets */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {featuredProjects.map((project) => (
                <ProjectCard key={project.id} project={project} featured />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Call to action */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center space-y-8">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground">
              Vous avez un projet en tête ?
            </h2>
            <p className="text-lg text-foreground/60">
              Je serais ravi de discuter de votre idée et de voir comment nous
              pouvons la concrétiser ensemble.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/contact"
                className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background bg-primary text-primary-foreground hover:bg-primary/90 h-10 py-2 px-4"
              >
                Discutons de votre projet
              </a>
              <a
                href="https://github.com/bastienggg"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background border border-input hover:bg-accent hover:text-accent-foreground h-10 py-2 px-4"
              >
                Voir mon GitHub
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
