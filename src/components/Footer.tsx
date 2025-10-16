import Link from "next/link";
import { Github, Linkedin, Mail } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* À propos */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground">
              Bastien Guitard
            </h3>
            <p className="text-sm text-foreground/60">
              Développeur fullstack passionné, étudiant en 3ᵉ année BUT MMI.
              Spécialisé dans le développement web et les dispositifs
              interactifs.
            </p>
          </div>

          {/* Navigation rapide */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground">
              Navigation
            </h3>
            <nav className="space-y-2">
              <Link
                href="/projets"
                className="block text-sm text-foreground/60 hover:text-foreground transition-colors"
              >
                Projets
              </Link>
              {/* <Link
                href="/galerie"
                className="block text-sm text-foreground/60 hover:text-foreground transition-colors"
              >
                Galerie
              </Link> */}
              <Link
                href="/cv"
                className="block text-sm text-foreground/60 hover:text-foreground transition-colors"
              >
                Télécharger mon CV
              </Link>
              <Link
                href="/contact"
                className="block text-sm text-foreground/60 hover:text-foreground transition-colors"
              >
                Me contacter
              </Link>
            </nav>
          </div>

          {/* Contact et réseaux */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground">Contact</h3>
            <div className="space-y-2">
              <a
                href="mailto:hello@exemple.com"
                className="flex items-center space-x-2 text-sm text-foreground/60 hover:text-foreground transition-colors"
              >
                <Mail className="h-4 w-4" />
                <span>bastienguitard8@gmail.com</span>
              </a>
              <div className="flex space-x-4 pt-2">
                <a
                  href="https://github.com/bastienggg"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-foreground/60 hover:text-foreground transition-colors"
                >
                  <Github className="h-5 w-5" />
                  <span className="sr-only">GitHub</span>
                </a>
                <a
                  href="https://www.linkedin.com/in/bastien-guitard-30585329b/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-foreground/60 hover:text-foreground transition-colors"
                >
                  <Linkedin className="h-5 w-5" />
                  <span className="sr-only">LinkedIn</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-border">
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-2 sm:space-y-0">
            <p className="text-sm text-foreground/60">
              © {currentYear} Bastien Guitard. Tous droits réservés.
            </p>
            <p className="text-sm text-foreground/60">
              Développé avec Next.js et Tailwind CSS
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
