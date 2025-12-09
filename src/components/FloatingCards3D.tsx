"use client";

import { Canvas } from "@react-three/fiber";
import {
  OrbitControls,
  Environment,
  PerspectiveCamera,
} from "@react-three/drei";
import ProjectCard3D from "./ProjectCard3D";
import { useState, Suspense } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Project {
  id: string;
  title: string;
  description: string;
  longDescription?: string;
  technologies: string[];
  imageUrl?: string;
  githubUrl?: string;
  demoUrl?: string;
  status?: string;
  featured?: boolean;
}

interface FloatingCards3DProps {
  projects: Project[];
}

export default function FloatingCards3D({ projects }: FloatingCards3DProps) {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  // Calculer les positions des cartes en cercle
  const getCardPosition = (
    index: number,
    total: number
  ): [number, number, number] => {
    const radius = 5;
    const angle = (index / total) * Math.PI * 2;
    const x = Math.cos(angle) * radius;
    const z = Math.sin(angle) * radius;
    const y = Math.sin(index * 0.5) * 0.5; // Variation de hauteur
    return [x, y, z];
  };

  return (
    <>
      <div className="w-full h-[600px] relative">
        <Canvas>
          <PerspectiveCamera makeDefault position={[0, 0, 12]} fov={50} />

          {/* Lumières pour le glassmorphism */}
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={1} />
          <pointLight position={[-10, -10, -10]} intensity={0.5} />
          <spotLight
            position={[0, 10, 0]}
            angle={0.3}
            penumbra={1}
            intensity={1}
            castShadow
          />

          {/* Environnement pour les réflexions */}
          <Suspense fallback={null}>
            <Environment preset="city" />
          </Suspense>

          {/* Cartes flottantes */}
          {projects.map((project, index) => (
            <ProjectCard3D
              key={project.id}
              project={project}
              position={getCardPosition(index, projects.length)}
              onClick={() => setSelectedProject(project)}
            />
          ))}

          {/* Contrôles de la caméra */}
          <OrbitControls
            enableZoom={false}
            enablePan={false}
            autoRotate
            autoRotateSpeed={0.5}
            maxPolarAngle={Math.PI / 2}
            minPolarAngle={Math.PI / 2.5}
          />
        </Canvas>

        {/* Instructions */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white/60 text-sm text-center">
          <p className="backdrop-blur-sm bg-black/20 px-4 py-2 rounded-full">
            🖱️ Glissez pour faire tourner • Cliquez sur une carte pour plus de
            détails
          </p>
        </div>
      </div>

      {/* Modal de détails du projet */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md p-4"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ scale: 0.8, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.8, y: 50 }}
              transition={{ type: "spring", damping: 25 }}
              className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-8 max-w-2xl w-full max-h-[80vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Image */}
              {selectedProject.imageUrl && (
                <img
                  src={selectedProject.imageUrl}
                  alt={selectedProject.title}
                  className="w-full h-64 object-cover rounded-xl mb-6"
                />
              )}

              {/* Titre */}
              <h2 className="text-3xl font-bold text-white mb-4">
                {selectedProject.title}
              </h2>

              {/* Description longue */}
              <p className="text-white/80 mb-6 leading-relaxed">
                {selectedProject.longDescription || selectedProject.description}
              </p>

              {/* Technologies */}
              <div className="mb-6">
                <h3 className="text-white font-semibold mb-2">Technologies</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedProject.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 bg-white/10 backdrop-blur-sm rounded-full text-white text-sm border border-white/20"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Liens */}
              <div className="flex gap-4">
                {selectedProject.githubUrl && (
                  <a
                    href={selectedProject.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-2 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-lg text-white border border-white/20 transition-all"
                  >
                    GitHub
                  </a>
                )}
                {selectedProject.demoUrl && (
                  <a
                    href={selectedProject.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-2 bg-white hover:bg-white/90 rounded-lg text-black font-semibold transition-all"
                  >
                    Voir la démo
                  </a>
                )}
              </div>

              {/* Bouton fermer */}
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full text-white border border-white/20 transition-all"
              >
                ✕
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
