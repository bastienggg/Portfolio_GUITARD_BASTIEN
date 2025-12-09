"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Text } from "@react-three/drei";
import { useRef, useState, useEffect } from "react";
import * as THREE from "three";
import projects from "@/data/projects.json";

interface Project {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  technologies: string[];
  githubUrl?: string;
  demoUrl?: string;
  imageUrl: string;
  status: string;
  featured?: boolean;
}

// Composant Soleil
function Sun() {
  const meshRef = useRef<THREE.Mesh>(null);

  useEffect(() => {
    const animate = () => {
      if (meshRef.current) {
        meshRef.current.rotation.y += 0.001;
      }
      requestAnimationFrame(animate);
    };
    animate();
  }, []);

  return (
    <group position={[0, 0, 0]}>
      <mesh ref={meshRef}>
        <sphereGeometry args={[4, 32, 32]} />
        <meshStandardMaterial
          color="#FDB813"
          emissive="#FDB813"
          emissiveIntensity={1.5}
          roughness={0.3}
        />
      </mesh>
      {/* Glow effect */}
      <mesh>
        <sphereGeometry args={[5, 32, 32]} />
        <meshBasicMaterial color="#FFA500" transparent opacity={0.2} />
      </mesh>
    </group>
  );
}

// Composant Label flottant pour planète
function PlanetLabel({
  position,
  title,
  isVisible,
  planetIndex,
  onNavigate,
}: {
  position: [number, number, number];
  title: string;
  isVisible: boolean;
  planetIndex: number;
  onNavigate: (index: number) => void;
}) {
  const textRef = useRef<any>(null);

  // Orienter le texte vers la caméra à chaque frame
  useFrame(({ camera }) => {
    if (textRef.current) {
      textRef.current.quaternion.copy(camera.quaternion);
    }
  });

  if (!isVisible) return null;

  return (
    <group position={[position[0], position[1] + 10, position[2]]}>
      {/* Trait blanc vertical - plus haut */}
      <mesh position={[0, -4, 0]}>
        <boxGeometry args={[0.08, 7, 0.08]} />
        <meshBasicMaterial color="white" />
      </mesh>
      {/* Point de connexion */}
      <mesh position={[0, -7.5, 0]}>
        <sphereGeometry args={[0.2, 16, 16]} />
        <meshBasicMaterial color="white" />
      </mesh>
      {/* Texte 3D au-dessus du trait - toujours vers caméra et cliquable */}
      <Text
        ref={textRef}
        position={[0, 0.5, 0]}
        fontSize={1.2}
        color="white"
        anchorX="center"
        anchorY="middle"
        outlineWidth={0.08}
        outlineColor="#000000"
        fontWeight="bold"
        onClick={(e) => {
          e.stopPropagation();
          onNavigate(planetIndex);
        }}
        onPointerOver={() => {
          document.body.style.cursor = "pointer";
        }}
        onPointerOut={() => {
          document.body.style.cursor = "default";
        }}
      >
        {title.toUpperCase()}
      </Text>
    </group>
  );
}

// Composant Planète
function Planet({
  position,
  color,
  size,
  project,
  isActive,
}: {
  position: [number, number, number];
  color: string;
  size: number;
  project: Project;
  isActive: boolean;
}) {
  const meshRef = useRef<THREE.Mesh>(null);

  return (
    <group position={position}>
      <mesh ref={meshRef}>
        <sphereGeometry args={[size, 32, 32]} />
        <meshStandardMaterial
          color={color}
          roughness={0.4}
          metalness={0.5}
          emissive={color}
          emissiveIntensity={isActive ? 0.6 : 0.3}
        />
      </mesh>
      {/* Anneaux pour style comic */}
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
        <torusGeometry args={[size * 1.5, size * 0.15, 16, 100]} />
        <meshStandardMaterial
          color={color}
          opacity={0.6}
          transparent
          emissive={color}
          emissiveIntensity={0.3}
        />
      </mesh>
    </group>
  );
}

// Composant Carte Cyberpunk
function ProjectCard({
  project,
  visible,
}: {
  project: Project;
  visible: boolean;
}) {
  if (!visible) return null;

  return (
    <div className="fixed top-1/2 right-10 -translate-y-1/2 w-96 z-10 pointer-events-none">
      <div
        className="bg-black border-2 border-white rounded-none p-6 shadow-2xl relative overflow-hidden"
        style={{
          boxShadow:
            "0 0 20px rgba(255,255,255,0.3), inset 0 0 10px rgba(255,255,255,0.1)",
        }}
      >
        {/* Lignes décoratives cyberpunk */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white to-transparent opacity-50"></div>
        <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white to-transparent opacity-50"></div>
        <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-transparent via-white to-transparent opacity-50"></div>
        <div className="absolute top-0 right-0 w-1 h-full bg-gradient-to-b from-transparent via-white to-transparent opacity-50"></div>

        {/* Coin coupé */}
        <div
          className="absolute top-0 right-0 w-8 h-8 bg-white"
          style={{ clipPath: "polygon(100% 0, 0 0, 100% 100%)" }}
        ></div>

        <h2
          className="text-3xl font-bold text-white mb-3 tracking-wider uppercase"
          style={{ fontFamily: "'Orbitron', monospace" }}
        >
          {project.title}
        </h2>
        <p
          className="text-gray-300 mb-4 text-sm leading-relaxed"
          style={{ fontFamily: "'Share Tech Mono', monospace" }}
        >
          {project.description}
        </p>

        <div className="flex flex-wrap gap-2 mb-4">
          {project.technologies.slice(0, 4).map((tech, index) => (
            <span
              key={index}
              className="px-3 py-1 bg-white text-black text-xs font-bold uppercase border border-white"
              style={{ fontFamily: "'Orbitron', monospace" }}
            >
              {tech}
            </span>
          ))}
        </div>

        <div className="flex gap-3">
          {project.githubUrl && (
            <span
              className="px-4 py-2 bg-transparent border-2 border-white text-white text-sm font-bold uppercase hover:bg-white hover:text-black transition-all"
              style={{ fontFamily: "'Orbitron', monospace" }}
            >
              GitHub
            </span>
          )}
          {project.demoUrl && (
            <span
              className="px-4 py-2 bg-white text-black text-sm font-bold uppercase border-2 border-white hover:bg-black hover:text-white transition-all"
              style={{ fontFamily: "'Orbitron', monospace" }}
            >
              Demo
            </span>
          )}
        </div>

        {/* Effet scanline */}
        <div
          className="absolute inset-0 pointer-events-none opacity-10"
          style={{
            backgroundImage:
              "repeating-linear-gradient(0deg, transparent, transparent 2px, white 2px, white 4px)",
          }}
        ></div>
      </div>
    </div>
  );
}

// Composant Scene 3D
function Scene({
  scrollProgress,
  mousePosition,
  onNavigateToPlanet,
}: {
  scrollProgress: number;
  mousePosition: { x: number; y: number };
  onNavigateToPlanet: (index: number) => void;
}) {
  const controlsRef = useRef<any>(null);
  const [time, setTime] = useState(0);

  // Animation du temps pour les orbites
  useEffect(() => {
    const interval = setInterval(() => {
      setTime((prev) => prev + 0.01);
    }, 16);
    return () => clearInterval(interval);
  }, []);

  // Couleurs des planètes (style comic)
  const planetColors = [
    "#FFFFFF",
    "#FFFFFF",
    "#FFFFFF",
    "#FFFFFF",
    "#FFFFFF",
    "#FFFFFF",
  ];

  // Positions des planètes en orbite autour du soleil (ordonnées de la plus éloignée à la plus proche)
  const planetPositions: [number, number, number][] = projects.map(
    (_, index) => {
      const planetIndex = projects.length - 1 - index; // Inverser l'ordre
      const orbitRadius = 20 + planetIndex * 18; // Rayon d'orbite croissant (beaucoup plus éloigné)
      const baseAngle = planetIndex * Math.PI * 0.4 + Math.PI / 4; // Angle de départ
      const orbitSpeed = 0.1 / (planetIndex + 1); // Vitesse d'orbite (plus lent pour les planètes éloignées)
      const angle = baseAngle + time * orbitSpeed; // Angle animé
      const height = Math.sin(planetIndex * 0.5) * 2; // Variation de hauteur

      return [
        Math.cos(angle) * orbitRadius, // x
        height, // y
        Math.sin(angle) * orbitRadius, // z
      ];
    }
  );

  // Animation continue basée sur le scroll - système unifié pour toutes les transitions
  useEffect(() => {
    if (controlsRef.current) {
      const maxScroll = projects.length - 1;
      const normalizedProgress = Math.max(
        -1,
        Math.min(scrollProgress, maxScroll)
      );

      // Définir les positions de caméra pour chaque "état" (overview + planètes)
      let currentCameraPos: THREE.Vector3;
      let currentTarget: THREE.Vector3;
      let nextCameraPos: THREE.Vector3;
      let nextTarget: THREE.Vector3;
      let t: number; // Facteur d'interpolation entre 0 et 1

      if (normalizedProgress < 0) {
        // Transition entre overview (-1) et première planète (0)
        const progress = normalizedProgress + 1; // Va de 0 à 1

        // Position overview - beaucoup plus loin pour voir tout le système
        currentCameraPos = new THREE.Vector3(120, 80, 120);
        currentTarget = new THREE.Vector3(0, 0, 0);

        // Position première planète
        const firstPlanetPos = new THREE.Vector3(...planetPositions[0]);
        const directionFromSun = new THREE.Vector3(
          firstPlanetPos.x,
          0,
          firstPlanetPos.z
        ).normalize();
        nextCameraPos = new THREE.Vector3(
          firstPlanetPos.x + directionFromSun.x * 15,
          firstPlanetPos.y + 8,
          firstPlanetPos.z + directionFromSun.z * 15
        );
        nextTarget = firstPlanetPos;

        t = progress;
      } else {
        // Transitions entre planètes (0+)
        const currentIndex = Math.floor(normalizedProgress);
        const nextIndex = Math.min(currentIndex + 1, maxScroll);
        t = normalizedProgress - currentIndex;

        // Position planète actuelle - caméra PILE EN FACE, légèrement au-dessus
        const currentPlanetPos = new THREE.Vector3(
          ...planetPositions[currentIndex]
        );
        // Direction depuis le centre vers la planète (vue de face)
        const currentDirection = new THREE.Vector3(
          currentPlanetPos.x,
          0, // Ignore Y pour rester à l'horizon
          currentPlanetPos.z
        ).normalize();
        // Caméra à distance fixe, légèrement au-dessus pour meilleure vue
        currentCameraPos = new THREE.Vector3(
          currentPlanetPos.x + currentDirection.x * 20,
          currentPlanetPos.y + 3, // Légèrement au-dessus
          currentPlanetPos.z + currentDirection.z * 20
        );
        // Cible = planète exactement
        currentTarget = currentPlanetPos;

        // Position planète suivante - même principe
        const nextPlanetPos = new THREE.Vector3(...planetPositions[nextIndex]);
        const nextDirection = new THREE.Vector3(
          nextPlanetPos.x,
          0,
          nextPlanetPos.z
        ).normalize();
        nextCameraPos = new THREE.Vector3(
          nextPlanetPos.x + nextDirection.x * 20,
          nextPlanetPos.y + 3, // Légèrement au-dessus
          nextPlanetPos.z + nextDirection.z * 20
        );
        nextTarget = nextPlanetPos;
      }

      // Interpolation linéaire - l'easing est géré par requestAnimationFrame
      const cameraPosition = new THREE.Vector3().lerpVectors(
        currentCameraPos,
        nextCameraPos,
        t
      );

      // Ajouter un arc de cercle vers le haut pendant la transition (courbe parabolique)
      if (t > 0 && t < 1) {
        // Hauteur max de l'arc au milieu de la transition (t=0.5)
        const arcHeight = 8 * Math.sin(t * Math.PI); // Parabole qui monte puis redescend
        cameraPosition.y += arcHeight;
      }

      const targetPosition = new THREE.Vector3().lerpVectors(
        currentTarget,
        nextTarget,
        t
      );

      // Effet parallax avec la souris (léger décalage)
      const parallaxOffset = new THREE.Vector3(
        mousePosition.x * 2,
        mousePosition.y * 1.5,
        0
      );
      cameraPosition.add(parallaxOffset);

      controlsRef.current.object.position.copy(cameraPosition);
      controlsRef.current.target.copy(targetPosition);
      controlsRef.current.update();
    }
  }, [scrollProgress, planetPositions, mousePosition]);

  return (
    <>
      {/* Lumières */}
      <ambientLight intensity={0.8} />
      <pointLight position={[0, 0, 0]} intensity={2} color="#FDB813" />
      <pointLight position={[50, 50, 50]} intensity={1.5} />
      <pointLight position={[-30, -20, -30]} intensity={0.8} color="#6366f1" />

      {/* Soleil au centre */}
      <Sun />

      {/* Planètes avec labels */}
      {projects.map((project, index) => {
        const currentIndex = Math.max(0, Math.round(scrollProgress));
        const isActive = index === currentIndex;
        const showLabel = scrollProgress < 0 || !isActive; // Afficher label en overview ou si non active

        return (
          <group key={project.id}>
            <Planet
              position={planetPositions[index]}
              color={planetColors[index % planetColors.length]}
              size={3}
              project={project as Project}
              isActive={isActive}
            />
            <PlanetLabel
              position={planetPositions[index]}
              title={project.title}
              isVisible={showLabel}
              planetIndex={index}
              onNavigate={onNavigateToPlanet}
            />
          </group>
        );
      })}

      {/* Contrôles de caméra - désactivés (parallax souris uniquement) */}
      <OrbitControls
        ref={controlsRef}
        enableZoom={false}
        enablePan={false}
        enableRotate={false}
        maxPolarAngle={Math.PI / 2}
        minPolarAngle={Math.PI / 4}
      />
    </>
  );
}

// Composant principal
export default function SolarSystemScene() {
  const [scrollProgress, setScrollProgress] = useState(-1); // Commence en vue éloignée (-1)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const targetScrollRef = useRef(-1); // Commence à -1 pour la vue d'ensemble
  const [terminalText, setTerminalText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const prevProjectRef = useRef<string | null>(null);

  // Gestion du mouvement de la souris pour parallax
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2; // -1 à 1
      const y = (e.clientY / window.innerHeight - 0.5) * 2; // -1 à 1
      setMousePosition({ x, y });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Gestion du scroll smooth avec easing (transition automatique)
  useEffect(() => {
    let animationFrameId: number;

    const smoothScroll = () => {
      setScrollProgress((prev) => {
        const diff = targetScrollRef.current - prev;
        if (Math.abs(diff) < 0.001) {
          return targetScrollRef.current;
        }
        // Easing pour transition smooth et rapide
        return prev + diff * 0.08;
      });
      animationFrameId = requestAnimationFrame(smoothScroll);
    };

    smoothScroll();
    return () => cancelAnimationFrame(animationFrameId);
  }, []); // Gestion du scroll avec transition automatique vers planète suivante/précédente
  useEffect(() => {
    let isScrolling = false;
    let scrollTimeout: NodeJS.Timeout;

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();

      // Empêcher les scrolls multiples pendant la transition
      if (isScrolling) return;

      const currentPlanet = Math.round(targetScrollRef.current);
      const direction = e.deltaY > 0 ? 1 : -1; // Scroll down = suivant, scroll up = précédent
      const targetPlanet = Math.max(
        -1, // Permet de revenir à la vue d'ensemble
        Math.min(projects.length - 1, currentPlanet + direction)
      );

      // Si on peut aller vers une nouvelle planète
      if (targetPlanet !== currentPlanet) {
        isScrolling = true;
        targetScrollRef.current = targetPlanet;

        // Débloquer après la transition (durée réduite)
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
          isScrolling = false;
        }, 800); // Transition plus rapide
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    return () => {
      window.removeEventListener("wheel", handleWheel);
      clearTimeout(scrollTimeout);
    };
  }, []);

  const currentPlanetIndex = Math.max(0, Math.floor(scrollProgress + 0.5)); // Ajuster pour correspondre à la planète visible, minimum 0
  const distanceToNearestPlanet = Math.abs(
    scrollProgress - Math.round(scrollProgress)
  );
  const isOverviewMode = scrollProgress <= -0.95; // Disparaît dès qu'on commence à scroller
  const isTransitioning = scrollProgress < 0 && scrollProgress > -1; // En transition vers première planète
  const currentProject = projects[currentPlanetIndex];

  // Fonction pour naviguer vers une planète spécifique
  const navigateToPlanet = (planetIndex: number) => {
    targetScrollRef.current = planetIndex;
  };

  // Animation typewriter pour le terminal
  useEffect(() => {
    if (!isOverviewMode && currentProject) {
      // Si changement de projet, effacer puis réécrire
      if (prevProjectRef.current !== currentProject.id) {
        setIsTyping(true);
        setTerminalText(""); // Clear

        // Construire le texte complet avec meilleure mise en forme
        const fullText = `> PROJECT_LOADED\n\n━━━━━━━━━━━━━━━━━━━━━━━━━\n${currentProject.title.toUpperCase()}\n━━━━━━━━━━━━━━━━━━━━━━━━━\n\n> description:\n  ${
          currentProject.description
        }\n\n> technologies:\n  [${currentProject.technologies.join(
          "] ["
        )}]\n\n> status: ${currentProject.status}\n\n> ready_`;

        let currentChar = 0;
        const typingSpeed = 5; // ms par caractère - plus rapide

        const typeInterval = setInterval(() => {
          if (currentChar < fullText.length) {
            setTerminalText(fullText.slice(0, currentChar + 1));
            currentChar++;
          } else {
            setIsTyping(false);
            clearInterval(typeInterval);
          }
        }, typingSpeed);

        prevProjectRef.current = currentProject.id;

        return () => clearInterval(typeInterval);
      }
    }
  }, [currentProject, isOverviewMode]);

  return (
    <div className="w-full h-screen flex flex-col md:flex-row bg-black">
      {/* Fenêtre Terminal - Mobile: en bas | Desktop: à gauche 30% - Style Cyberpunk */}
      <div className="w-full h-1/2 md:w-[30%] md:h-full order-2 md:order-1 bg-black relative overflow-hidden border-t-2 md:border-t-0 md:border-r-2 border-cyan-400/30">
        {/* Barre de titre cyberpunk */}
        <div className="h-10 bg-gradient-to-r from-black via-gray-900 to-black border-b-2 border-cyan-400/50 flex items-center px-4 relative">
          {/* Effet glow */}
          <div className="absolute inset-0 bg-cyan-400/5"></div>

          <div className="flex gap-2 z-10">
            <div className="w-2 h-2 bg-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.8)]"></div>
            <div className="w-2 h-2 bg-cyan-400/50"></div>
            <div className="w-2 h-2 bg-cyan-400/50"></div>
          </div>
          <div className="flex-1 text-center z-10">
            <span className="text-cyan-400 text-xs font-mono tracking-widest">
              {isOverviewMode
                ? "[ SYSTEM ]"
                : `[ ${currentProject?.title.toUpperCase() || "PROJECT"} ]`}
            </span>
          </div>
          <div className="text-cyan-400/50 text-xs font-mono z-10">▼</div>
        </div>

        {/* Contenu du terminal */}
        <div className="h-[calc(100%-2.5rem)] overflow-hidden relative">
          {isOverviewMode ? (
            // Présentation initiale - style terminal noir et blanc
            <div className="p-6 md:p-10 h-full flex flex-col justify-center font-mono text-white relative">
              <div className="mb-6 md:mb-8">
                <span className="text-gray-500 text-sm">
                  &gt; SYSTEM_ONLINE
                </span>
              </div>

              <h1 className="text-4xl md:text-6xl font-bold text-cyan-400 mb-2 tracking-wider uppercase">
                BASTIEN GUITARD
              </h1>
              <span className="text-gray-500 mb-6 md:mb-8">
                ========================================
              </span>

              <div className="mb-4">
                <span className="text-gray-500">&gt; role:</span>
                <span className="text-white ml-2 text-sm md:text-base">
                  DÉVELOPPEUR FULL-STACK & CRÉATIF
                </span>
              </div>

              <div className="mb-6 md:mb-8">
                <span className="text-gray-500">&gt; message:</span>
                <p className="text-gray-300 mt-2 leading-relaxed text-sm md:text-base">
                  Bienvenue dans mon univers ! Explorez mes projets à travers ce
                  système solaire interactif. Chaque planète représente une
                  création unique mêlant technologie et créativité.
                </p>
              </div>

              <div className="text-gray-400 text-xs md:text-sm animate-pulse">
                <span>&gt; Scroll ou Click sur les titres pour explorer_</span>
              </div>

              {/* Effet scanline */}
              <div
                className="absolute inset-0 pointer-events-none opacity-10"
                style={{
                  backgroundImage:
                    "repeating-linear-gradient(0deg, transparent, transparent 2px, white 2px, white 4px)",
                }}
              ></div>
            </div>
          ) : (
            // Terminal de projet avec animation typewriter - noir et blanc
            currentProject && (
              <div className="p-6 md:p-10 h-full font-mono text-white overflow-y-auto relative">
                {/* Texte qui s'écrit avec titre en couleur */}
                <pre className="whitespace-pre-wrap text-xs md:text-sm leading-relaxed">
                  {terminalText.split("\n").map((line, i) => {
                    // Colorer le titre du projet (ligne après les ━)
                    const isTitle = line === currentProject.title.toUpperCase();
                    return (
                      <span key={i}>
                        {isTitle ? (
                          <span className="text-cyan-400 font-bold">
                            {line}
                          </span>
                        ) : (
                          line
                        )}
                        {i < terminalText.split("\n").length - 1 && "\n"}
                      </span>
                    );
                  })}
                  {isTyping && (
                    <span className="animate-pulse text-cyan-400">█</span>
                  )}
                </pre>

                {/* Boutons affichés seulement quand l'animation est terminée */}
                {!isTyping &&
                  (currentProject.githubUrl || currentProject.demoUrl) && (
                    <div className="mt-6 md:mt-8 flex flex-col md:flex-row gap-3 md:gap-4">
                      {currentProject.githubUrl && (
                        <a
                          href={currentProject.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-3 md:px-4 py-2 text-sm md:text-base border-2 border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-black transition-all shadow-[0_0_10px_rgba(34,211,238,0.5)] hover:shadow-[0_0_20px_rgba(34,211,238,0.8)] text-center"
                        >
                          &gt; GITHUB
                        </a>
                      )}
                      {currentProject.demoUrl && (
                        <a
                          href={currentProject.demoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-3 md:px-4 py-2 text-sm md:text-base bg-cyan-400 text-black hover:bg-cyan-300 transition-all shadow-[0_0_10px_rgba(34,211,238,0.5)] hover:shadow-[0_0_20px_rgba(34,211,238,0.8)] text-center"
                        >
                          &gt; DEMO
                        </a>
                      )}
                    </div>
                  )}

                {/* Effet scanline */}
                <div
                  className="absolute inset-0 pointer-events-none opacity-10"
                  style={{
                    backgroundImage:
                      "repeating-linear-gradient(0deg, transparent, transparent 2px, white 2px, white 4px)",
                  }}
                ></div>
              </div>
            )
          )}
        </div>
      </div>

      {/* Fenêtre Canvas 3D - Mobile: en haut | Desktop: à droite 70% - Style Cyberpunk */}
      <div className="w-full h-1/2 md:w-[70%] md:h-full order-1 md:order-2 bg-black relative overflow-hidden">
        {/* Barre de titre cyberpunk */}
        <div className="h-10 bg-gradient-to-r from-black via-gray-900 to-black border-b-2 border-cyan-400/50 flex items-center px-4 relative">
          {/* Effet glow */}
          <div className="absolute inset-0 bg-cyan-400/5"></div>

          <div className="flex gap-2 z-10">
            <div className="w-2 h-2 bg-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.8)]"></div>
            <div className="w-2 h-2 bg-cyan-400/50"></div>
            <div className="w-2 h-2 bg-cyan-400/50"></div>
          </div>
          <div className="flex-1 text-center z-10">
            <span className="text-cyan-400 text-xs font-mono tracking-widest">
              [ SOLAR SYSTEM 3D ]
            </span>
          </div>
          <div className="text-cyan-400/50 text-xs font-mono z-10">▼</div>
        </div>

        {/* Canvas */}
        <div className="h-[calc(100%-2.5rem)] relative bg-black">
          <Canvas
            camera={{ position: [120, 80, 120], fov: 75 }}
            onCreated={({ camera }) => {
              (camera as any).ref = camera;
            }}
            style={{ background: "#000000" }}
          >
            <Scene
              scrollProgress={scrollProgress}
              mousePosition={mousePosition}
              onNavigateToPlanet={navigateToPlanet}
            />
          </Canvas>

          {/* Indicateur de progression */}
          {!isOverviewMode && (
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-2 z-10">
              {projects.map((_, index) => (
                <div
                  key={index}
                  className={`w-3 h-3 rounded-full transition-all ${
                    index === currentPlanetIndex
                      ? "bg-cyan-400 scale-125"
                      : "bg-white/30"
                  }`}
                />
              ))}
            </div>
          )}

          {/* Fenêtre de contact - Coin bas gauche (cachée sur mobile) */}
          <div className="hidden md:block absolute bottom-6 left-6 w-64 bg-black/95 border-2 border-cyan-400/50 rounded-sm overflow-hidden shadow-[0_0_20px_rgba(34,211,238,0.3)] z-20">
            {/* Barre de titre */}
            <div className="h-8 bg-gradient-to-r from-black via-gray-900 to-black border-b-2 border-cyan-400/50 flex items-center px-3 relative">
              <div className="absolute inset-0 bg-cyan-400/5"></div>
              <div className="flex gap-1.5 z-10">
                <div className="w-1.5 h-1.5 bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.8)]"></div>
                <div className="w-1.5 h-1.5 bg-cyan-400/50"></div>
                <div className="w-1.5 h-1.5 bg-cyan-400/50"></div>
              </div>
              <div className="flex-1 text-center z-10">
                <span className="text-cyan-400 text-[10px] font-mono tracking-widest">
                  [ CONTACT ]
                </span>
              </div>
            </div>

            {/* Contenu */}
            <div className="p-4 font-mono text-xs space-y-3">
              <div className="text-gray-400">
                <span className="text-cyan-400">&gt;</span> contact.info
              </div>

              <div className="space-y-2">
                <a
                  href="mailto:bastien.guitard@example.com"
                  className="flex items-center gap-2 text-white hover:text-cyan-400 transition-colors group"
                >
                  <span className="text-cyan-400 group-hover:shadow-[0_0_10px_rgba(34,211,238,0.5)]">
                    📧
                  </span>
                  <span className="text-[10px]">EMAIL</span>
                </a>

                <a
                  href="https://github.com/bastienggg"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-white hover:text-cyan-400 transition-colors group"
                >
                  <span className="text-cyan-400 group-hover:shadow-[0_0_10px_rgba(34,211,238,0.5)]">
                    🔗
                  </span>
                  <span className="text-[10px]">GITHUB</span>
                </a>

                <a
                  href="https://www.linkedin.com/in/bastien-guitard-30585329b/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-white hover:text-cyan-400 transition-colors group"
                >
                  <span className="text-cyan-400 group-hover:shadow-[0_0_10px_rgba(34,211,238,0.5)]">
                    💼
                  </span>
                  <span className="text-[10px]">LINKEDIN</span>
                </a>
              </div>

              <div className="text-cyan-400/50 text-[9px] mt-3 border-t border-cyan-400/20 pt-2">
                &gt; status: online_
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx global>{`
        @import url("https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&family=Share+Tech+Mono&display=swap");
      `}</style>
    </div>
  );
}
