"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import ProjectCard from "@/components/ProjectCard";
import MatrixRain from "@/components/MatrixRain";
import FloatingCards3D from "@/components/FloatingCards3D";
import { getFeaturedProjects } from "@/data/featuredRepos";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import {
  ArrowRight,
  Download,
  Mail,
  Github,
  Linkedin,
  Code,
  Palette,
  Globe,
} from "lucide-react";

export default function Home() {
  const featuredProjectsHome = getFeaturedProjects();
  const [isMobile, setIsMobile] = useState(false);

  // Détecter si on est sur mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Animation variants pour le texte
  const letterVariants = {
    hidden: {
      opacity: 0,
      y: 50,
      rotateX: -90,
    },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut" as const,
      },
    },
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.3,
      },
    },
  };

  // Fonction pour animer chaque lettre
  const AnimatedText = ({
    text,
    className,
  }: {
    text: string;
    className?: string;
  }) => (
    <motion.h1
      className={className}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {text.split("").map((char, index) => (
        <motion.span
          key={index}
          variants={letterVariants}
          className="inline-block"
          style={{ perspective: "1000px" }}
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </motion.h1>
  );

  return (
    <div className="flex flex-col">
      {/* Hero Section avec Matrix Rain */}
      <section className="relative min-h-screen flex items-center justify-center bg-background overflow-hidden">
        <MatrixRain />

        <div className="absolute inset-0 bg-gradient-to-br from-background/95 via-background/90 to-background/95 z-10"></div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
          <div className="max-w-6xl mx-auto">
            <div className="text-center space-y-12">
              <div className="space-y-6">
                <div className="space-y-2">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1, duration: 0.6 }}
                  >
                    <Badge
                      variant="outline"
                      className="text-xs uppercase tracking-wider border-foreground/20 mb-8"
                    >
                      Développeur Fullstack
                    </Badge>
                  </motion.div>

                  <AnimatedText
                    text="BASTIEN"
                    className="text-6xl md:text-8xl lg:text-9xl font-black tracking-tight text-foreground leading-none font-sans"
                  />
                  <AnimatedText
                    text="GUITARD"
                    className="text-6xl md:text-8xl lg:text-9xl font-black tracking-tight text-foreground leading-none font-sans"
                  />
                </div>

                <motion.div
                  className="space-y-4"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.2, duration: 0.8 }}
                >
                  <p className="text-xl md:text-2xl text-foreground/70 font-light tracking-wide max-w-3xl mx-auto font-sans">
                    BUT MMI • Développement Web & Dispositifs Interactifs
                  </p>
                  <p className="text-lg text-foreground/60 max-w-2xl mx-auto leading-relaxed font-sans">
                    Créateur d'expériences numériques modernes, passionné par
                    l'innovation et la technique
                  </p>
                </motion.div>
              </div>

              <motion.div
                className="flex flex-col sm:flex-row gap-4 justify-center"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.5, duration: 0.8 }}
              >
                <Button
                  size="lg"
                  variant="outline"
                  asChild
                  className="bg-transparent border-foreground/20 text-foreground hover:bg-foreground hover:text-background transition-all duration-300"
                >
                  <Link href="/projets">VOIR MON TRAVAIL</Link>
                </Button>
                <Button
                  size="lg"
                  variant="ghost"
                  asChild
                  className="text-foreground/70 hover:text-foreground hover:bg-foreground/5"
                >
                  <Link href="/cv">
                    <Download className="mr-2 h-4 w-4" />
                    TÉLÉCHARGER CV
                  </Link>
                </Button>
              </motion.div>

              <motion.div
                className="flex justify-center space-x-8 pt-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.8, duration: 0.8 }}
              >
                <a
                  href="https://github.com/bastienggg"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-foreground/40 hover:text-foreground transition-colors"
                >
                  <Github className="h-5 w-5" />
                </a>
                <a
                  href="https://www.linkedin.com/in/bastien-guitard-30585329b/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-foreground/40 hover:text-foreground transition-colors"
                >
                  <Linkedin className="h-5 w-5" />
                </a>
              </motion.div>

              <motion.div
                className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-foreground/30"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 2.0, duration: 0.8 }}
              >
                <div className="flex flex-col items-center space-y-2 animate-bounce">
                  <span className="text-xs uppercase tracking-wider">
                    Défiler
                  </span>
                  <div className="w-px h-6 bg-foreground/30"></div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* À propos */}
      <section className="py-20 bg-foreground/5">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center space-y-4 mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold text-foreground font-sans">
                À propos de moi
              </h2>
              <p className="text-xl text-foreground/60 font-sans">
                Découvrez mon parcours et mes passions
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <Card>
                <CardContent className="p-6 text-center space-y-4">
                  <div className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center mx-auto">
                    <Code className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold">Développement</h3>
                  <p className="text-foreground/60">
                    Spécialisé en React, Next.js et TypeScript. Passionné par
                    les bonnes pratiques et l'architecture moderne.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6 text-center space-y-4">
                  <div className="w-12 h-12 bg-accent rounded-lg flex items-center justify-center mx-auto">
                    <Palette className="h-6 w-6 text-accent-foreground" />
                  </div>
                  <h3 className="text-lg font-semibold">Design</h3>
                  <p className="text-foreground/60">
                    Sensible à l'UX/UI, je conçois des interfaces intuitives et
                    accessibles pour tous les utilisateurs.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6 text-center space-y-4">
                  <div className="w-12 h-12 bg-secondary rounded-lg flex items-center justify-center mx-auto">
                    <Globe className="h-6 w-6 text-secondary-foreground" />
                  </div>
                  <h3 className="text-lg font-semibold">CI/CD & DevOps</h3>
                  <p className="text-foreground/60">
                    Passionné par l'automatisation, l'intégration continue et le
                    déploiement moderne pour des livraisons fiables et rapides.
                  </p>
                </CardContent>
              </Card>
            </div>

            <div className="mt-12 text-center">
              <p className="text-lg text-foreground/80 max-w-3xl mx-auto font-sans">
                Actuellement en 3ᵉ année de BUT Métiers du Multimédia et de
                l'Internet (MMI) avec un parcours en développement web et
                dispositifs interactifs, je cultive ma passion pour les
                technologies modernes et l'innovation numérique.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Projets vedettes */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground font-sans">
              Projets vedettes
            </h2>
            <p className="text-xl text-foreground/60 font-sans">
              Découvrez quelques-uns de mes projets les plus récents
            </p>
          </div>

          {/* Version 3D pour desktop, grille classique pour mobile */}
          {isMobile ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
              {featuredProjectsHome.map((project) => (
                <ProjectCard key={project.id} project={project} featured />
              ))}
            </div>
          ) : (
            <FloatingCards3D projects={featuredProjectsHome} />
          )}

          <div className="text-center mt-12">
            <Button size="lg" variant="outline" asChild>
              <Link href="/projets">
                Voir tous mes projets
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-foreground text-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-2xl mx-auto space-y-8">
            <h2 className="text-3xl lg:text-4xl font-bold font-sans">
              Travaillons ensemble
            </h2>
            <p className="text-xl text-background/80 font-sans">
              Vous avez un projet en tête ? Je serais ravi d'en discuter avec
              vous.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" asChild>
                <Link href="/contact">
                  <Mail className="mr-2 h-5 w-5" />
                  Me contacter
                </Link>
              </Button>
              <Button size="lg" variant="secondary" asChild>
                <Link href="/cv">
                  <Download className="mr-2 h-5 w-5" />
                  Télécharger mon CV
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
