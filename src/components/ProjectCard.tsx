import Link from "next/link";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Github, ExternalLink, Clock, CheckCircle, Circle } from "lucide-react";
import { Project } from "@/data/featuredRepos";

interface ProjectCardProps {
  project: Project;
  featured?: boolean;
}

export default function ProjectCard({
  project,
  featured = false,
}: ProjectCardProps) {
  const getStatusIcon = (status: Project["status"]) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case "in-progress":
        return <Clock className="h-4 w-4 text-yellow-600" />;
      case "planned":
        return <Circle className="h-4 w-4 text-gray-400" />;
    }
  };

  const getStatusText = (status: Project["status"]) => {
    switch (status) {
      case "completed":
        return "Terminé";
      case "in-progress":
        return "En cours";
      case "planned":
        return "Planifié";
    }
  };

  return (
    <Card
      className={`group hover:shadow-lg transition-all duration-300 ${
        featured ? "" : ""
      }`}
    >
      <CardHeader className="p-0">
        <div className="relative overflow-hidden rounded-t-lg aspect-video">
          <Image
            src={project.imageUrl}
            alt={project.title}
            fill
            className="object-cover "
            placeholder="blur"
            blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
          />
          {featured && (
            <div className="absolute top-2 right-2">
              <Badge variant="default">Projet vedette</Badge>
            </div>
          )}
        </div>
      </CardHeader>

      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-2">
          <CardTitle className="text-xl">{project.title}</CardTitle>
          <div className="flex items-center space-x-1">
            {getStatusIcon(project.status)}
            <span className="text-sm text-foreground/60">
              {getStatusText(project.status)}
            </span>
          </div>
        </div>

        <CardDescription className="text-base mb-4">
          {featured ? project.longDescription : project.description}
        </CardDescription>

        <div className="flex flex-wrap gap-2">
          {project.technologies.map((tech) => (
            <Badge key={tech} variant="secondary" className="text-xs">
              {tech}
            </Badge>
          ))}
        </div>
      </CardContent>

      <CardFooter className="p-6 pt-0 flex gap-2">
        {project.githubUrl && (
          <Button variant="outline" size="sm" asChild>
            <Link
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Github className="h-4 w-4 mr-2" />
              Code source
            </Link>
          </Button>
        )}

        {project.demoUrl && (
          <Button size="sm" asChild>
            <Link
              href={project.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              <ExternalLink className="h-4 w-4 mr-2" />
              Voir le projet
            </Link>
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
