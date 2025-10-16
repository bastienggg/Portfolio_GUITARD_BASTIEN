import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Download,
  Eye,
  FileText,
  Mail,
  ExternalLink,
  Calendar,
} from "lucide-react";

export const metadata: Metadata = {
  title: "CV - Bastien Guitard",
  description:
    "Téléchargez le CV de Bastien Guitard, étudiant BUT MMI spécialisé en développement web et dispositifs interactifs.",
};

export default function CVPage() {
  // Informations du CV (aperçu)
  const cvInfo = {
    lastUpdated: "16 octobre 2025",
    fileSize: "1.8 MB",
    format: "PDF",
    languages: ["Français", "Anglais B1"],
  };

  const experiences = [
    {
      title: "Alternance - Développement Web",
      company: "Conseil départemental du Cantal - Aurillac (15)",
      period: "Depuis septembre 2025",
      description: "Service Études et développement Informatique. ",
    },
    {
      title: "Stage - Développement Web",
      company: "Conseil départemental du Cantal - Aurillac (15)",
      period: "14 avril 2025 - 6 juin 2025",
      description: "Service Études et développement Informatique.",
    },
  ];

  const formations = [
    {
      title: "BUT MMI - Métiers du Multimédia et de l'Internet",
      school: "Université de Limoges - IUT du Limousin (87)",
      period: "Depuis septembre 2023",
      specialization: "Parcours Développement web et dispositifs interactifs.",
    },
    {
      title: "BAC STI2D - SIN",
      school: "Lycée Monnet Mermoz - Aurillac (15)",
      period: "Juillet 2023",
      specialization:
        "Baccalauréat - Sciences et Technologies de l'Industrie et du Développement Durable, enseignement spécifique Systèmes d'Information et Numérique",
    },
  ];

  const competences = {
    "Développement Front": [
      "HTML",
      "CSS",
      "Tailwind",
      "Sass",
      "Bootstrap",
      "JavaScript",
      "React",
      "Blazor",
      "C#",
      "FluentUI",
    ],
    "Développement Back": ["PHP", "Symfony", "MySQL", "SQL Server Management"],
    "Outils de développement": [
      "NPM",
      "Vite",
      "Git",
      "Docker",
      "Azure DevOps",
      ".NET",
    ],
    Langues: ["Français (natif)", "Anglais B1", "Espagnol B1"],
    "Centres d'intérêt": ["Photographie", "Développement web", "Voyage"],
  };

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="py-20 lg:py-32 bg-gradient-to-br from-background via-background to-foreground/5">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl lg:text-6xl font-bold text-foreground font-sans">
                Mon CV
              </h1>
              <p className="text-xl lg:text-2xl text-foreground/60 font-sans">
                Parcours, compétences et expériences
              </p>
            </div>

            <p className="text-lg text-foreground/80 max-w-2xl mx-auto font-sans">
              Retrouvez toutes les informations sur mon parcours académique, mes
              expériences professionnelles et mes compétences techniques.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <a href="/cv.pdf" download="CV-Bastien-Guitard.pdf">
                  <Download className="mr-2 h-5 w-5" />
                  Télécharger le CV (PDF)
                </a>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <a href="/cv.pdf" target="_blank" rel="noopener noreferrer">
                  <Eye className="mr-2 h-5 w-5" />
                  Visualiser en ligne
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Informations du fichier */}
      <section className="py-8 bg-foreground/5">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <Card>
              <CardContent className="p-6">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-foreground">
                      {cvInfo.format}
                    </div>
                    <div className="text-sm text-foreground/60">Format</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-foreground">
                      {cvInfo.fileSize}
                    </div>
                    <div className="text-sm text-foreground/60">Taille</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-foreground">
                      <Calendar className="h-6 w-6 mx-auto" />
                    </div>
                    <div className="text-sm text-foreground/60">
                      Mis à jour le {cvInfo.lastUpdated}
                    </div>
                  </div>
                  <div>
                    <div className="flex gap-1 justify-center">
                      {cvInfo.languages.map((lang) => (
                        <Badge
                          key={lang}
                          variant="secondary"
                          className="text-xs"
                        >
                          {lang}
                        </Badge>
                      ))}
                    </div>
                    <div className="text-sm text-foreground/60 mt-1">
                      Langues
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Note de configuration */}
      {/* <section className="py-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
              <div className="flex">
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-blue-800">
                    📄 CV de Bastien Guitard
                  </h3>
                  <div className="mt-2 text-sm text-blue-700">
                    <p>CV mis à jour avec mes vraies informations :</p>
                    <ul className="mt-2 list-disc list-inside space-y-1">
                      <li>
                        Alternance au Conseil départemental du Cantal (depuis
                        septembre 2025)
                      </li>
                      <li>
                        Stage au Conseil départemental du Cantal (avril-juin
                        2025)
                      </li>
                      <li>Étudiant BUT MMI à l'IUT du Limousin</li>
                      <li>
                        Spécialisé en développement web et création numérique
                      </li>
                      <li>Compétences : React, PHP, Symfony, C#, .NET</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section> */}

      {/* Aperçu du parcours */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="text-center space-y-4 mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold text-foreground font-sans">
                Aperçu de mon parcours
              </h2>
              <p className="text-lg text-foreground/60 font-sans">
                Les informations détaillées sont disponibles dans le CV
                téléchargeable
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Expériences */}
              <div>
                <h3 className="text-2xl font-bold text-foreground mb-8 font-sans">
                  Expériences
                </h3>
                <div className="space-y-6">
                  {experiences.map((exp, index) => (
                    <Card key={index}>
                      <CardHeader>
                        <div className="flex justify-between items-start">
                          <div>
                            <CardTitle className="text-lg">
                              {exp.title}
                            </CardTitle>
                            <CardDescription className="text-base font-medium text-foreground/80">
                              {exp.company}
                            </CardDescription>
                          </div>
                          <Badge variant="outline" className="text-xs">
                            {exp.period}
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-foreground/70">{exp.description}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Formation */}
              <div>
                <h3 className="text-2xl font-bold text-foreground mb-8 font-sans">
                  Formation
                </h3>
                <div className="space-y-6">
                  {formations.map((formation, index) => (
                    <Card key={index}>
                      <CardHeader>
                        <div className="flex justify-between items-start">
                          <div>
                            <CardTitle className="text-lg">
                              {formation.title}
                            </CardTitle>
                            <CardDescription className="text-base font-medium text-foreground/80">
                              {formation.school}
                            </CardDescription>
                          </div>
                          <Badge variant="outline" className="text-xs">
                            {formation.period}
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-foreground/70">
                          {formation.specialization}
                        </p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Compétences techniques */}
      <section className="py-20 bg-foreground/5">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center space-y-4 mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold text-foreground font-sans">
                Compétences Techniques
              </h2>
              <p className="text-lg text-foreground/60 font-sans">
                Technologies et outils que je maîtrise
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {Object.entries(competences).map(([category, skills]) => (
                <Card key={category}>
                  <CardHeader>
                    <CardTitle className="text-lg">{category}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {skills.map((skill) => (
                        <Badge
                          key={skill}
                          variant="secondary"
                          className="text-xs"
                        >
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Call to action */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center space-y-8">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground font-sans">
              Intéressé par mon profil ?
            </h2>
            <p className="text-lg text-foreground/60 font-sans">
              N'hésitez pas à me contacter pour discuter d'une opportunité de
              collaboration ou pour obtenir des informations complémentaires.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <Link href="/contact">
                  <Mail className="mr-2 h-5 w-5" />
                  Me contacter
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link href="/projets">
                  <ExternalLink className="mr-2 h-5 w-5" />
                  Voir mes projets
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
