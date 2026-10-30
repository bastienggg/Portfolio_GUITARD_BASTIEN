"use client";

import { Canvas } from "@react-three/fiber";
import { Scene3D } from "../Scene3D";
import { WindowTitleBar, ProgressIndicator, ContactWindow } from "../ui";
import type { MousePosition, Project } from "@/types";

interface ScenePanelProps {
  scrollProgress: number;
  mousePosition: MousePosition;
  projects: Project[];
  currentIndex: number;
  isOverviewMode: boolean;
  currentProject: Project | null;
  onNavigate: (index: number) => void;
}

/**
 * Fenêtre Canvas 3D - Mobile: en haut | Desktop: à droite 70%
 */
export function ScenePanel({
  scrollProgress,
  mousePosition,
  projects,
  currentIndex,
  isOverviewMode,
  currentProject,
  onNavigate,
}: ScenePanelProps) {
  return (
    <div className="w-full h-1/2 md:w-[70%] md:h-full order-1 md:order-2 bg-[#F7F7E1] relative overflow-hidden paper-texture">
      <WindowTitleBar title="[ SOLAR SYSTEM 3D ]" />

      <div className="h-[calc(100%-2.5rem)] relative bg-[#F7F7E1]">
        <Canvas
          camera={{ position: [120, 80, 120], fov: 75 }}
          style={{ background: "#F7F7E1" }}
        >
          <Scene3D
            scrollProgress={scrollProgress}
            mousePosition={mousePosition}
            projects={projects}
            onNavigateToPlanet={onNavigate}
          />
        </Canvas>

        <ProgressIndicator
          projectsLength={projects.length}
          currentIndex={currentIndex}
          isOverviewMode={isOverviewMode}
        />

        <ContactWindow
          isOverviewMode={isOverviewMode}
          currentProject={currentProject}
        />
      </div>
    </div>
  );
}
