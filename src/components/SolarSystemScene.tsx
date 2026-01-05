"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Text, useGLTF, useAnimations } from "@react-three/drei";
import { useRef, useState, useEffect, useMemo } from "react";
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
  modelPath?: string; // Chemin vers le modèle GLB (optionnel)
  status: string;
  featured?: boolean;
}

// Composant Particules de Galaxie
function GalaxyParticles() {
  const particlesRef = useRef<THREE.Points>(null);

  // Créer les particules en vraie spirale galactique (comme la Voie Lactée)
  const particlesGeometry = useMemo(() => {
    const geometry = new THREE.BufferGeometry();
    const particlesCount = 15000; // Nombre de particules
    const positions = new Float32Array(particlesCount * 3);
    const colors = new Float32Array(particlesCount * 3);

    const branches = 3; // Nombre de bras spiraux
    const spinFactor = 4; // Intensité de la spirale
    const randomnessPower = 3; // Dispersion des particules

    for (let i = 0; i < particlesCount; i++) {
      const i3 = i * 3;

      // Distance depuis le centre (distribution non-linéaire pour concentration au centre)
      const radius = Math.pow(Math.random(), 1.5) * 120;

      // Angle de la spirale
      const spinAngle = radius * spinFactor * 0.015;
      const branchAngle = ((i % branches) / branches) * Math.PI * 2;

      // Position de base sur la spirale
      const angle = branchAngle + spinAngle;

      // Randomness décroissant avec la distance (plus dispersé au bord)
      const randomX =
        Math.pow(Math.random(), randomnessPower) *
        (Math.random() < 0.5 ? 1 : -1) *
        (2 + radius * 0.05);
      const randomY =
        Math.pow(Math.random(), randomnessPower) *
        (Math.random() < 0.5 ? 1 : -1) *
        (1 + radius * 0.02); // Moins de dispersion verticale
      const randomZ =
        Math.pow(Math.random(), randomnessPower) *
        (Math.random() < 0.5 ? 1 : -1) *
        (2 + radius * 0.05);

      // Position finale
      const x = Math.cos(angle) * radius + randomX;
      const y = randomY;
      const z = Math.sin(angle) * radius + randomZ;

      positions[i3] = x;
      positions[i3 + 1] = y;
      positions[i3 + 2] = z;

      // Couleurs en gradient fluide depuis le centre: invisible au centre -> jaune -> gris -> noir
      const mixedColor = new THREE.Color();
      const yellowColor = new THREE.Color("#FFD700"); // Jaune or près du soleil
      const lightGrayColor = new THREE.Color("#B8B8A8"); // Gris clair
      const darkGrayColor = new THREE.Color("#6A6A6A"); // Gris foncé
      const blackColor = new THREE.Color("#1A1A1A"); // Presque noir loin

      // Gradient fluide selon la distance au centre
      if (radius < 10) {
        // Zone 0-10: Jaune très clair (très proche du soleil, presque invisible par opacité)
        mixedColor.copy(yellowColor);
        mixedColor.multiplyScalar(1.2); // Jaune très brillant
      } else if (radius < 35) {
        // Zone 10-35: Jaune doré éclatant
        mixedColor.copy(yellowColor);
      } else if (radius < 70) {
        // Zone 35-70: Transition jaune -> gris clair
        const t = (radius - 35) / 35; // 0 à 1
        mixedColor.lerpColors(yellowColor, lightGrayColor, t);
      } else if (radius < 100) {
        // Zone 70-100: Gris clair -> gris foncé
        const t = (radius - 70) / 30;
        mixedColor.lerpColors(lightGrayColor, darkGrayColor, t);
      } else {
        // Zone 100+: Gris foncé -> noir (opacité décroissante)
        const t = Math.min((radius - 100) / 20, 1);
        mixedColor.lerpColors(darkGrayColor, blackColor, t);
      }

      colors[i3] = mixedColor.r;
      colors[i3 + 1] = mixedColor.g;
      colors[i3 + 2] = mixedColor.b;
    }

    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

    return geometry;
  }, []);

  // Animation de rotation lente de la galaxie - même sens que les planètes
  useFrame(() => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y -= 0.0002; // Rotation inverse
    }
  });

  return (
    <points ref={particlesRef} geometry={particlesGeometry}>
      <pointsMaterial
        size={0.35}
        vertexColors
        transparent
        opacity={0.55}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.NormalBlending}
      />
    </points>
  );
}

// Composant Particules flottantes (en plus de la galaxie)
function FloatingParticles() {
  const particlesRef = useRef<THREE.Points>(null);

  // Créer des particules flottantes aléatoires
  const { geometry, velocities } = useMemo(() => {
    const geometry = new THREE.BufferGeometry();
    const particlesCount = 5000; // Augmenté de 2000 à 5000
    const positions = new Float32Array(particlesCount * 3);
    const colors = new Float32Array(particlesCount * 3);
    const velocities = new Float32Array(particlesCount * 3);

    for (let i = 0; i < particlesCount; i++) {
      const i3 = i * 3;

      // Position aléatoire dans tout l'espace
      positions[i3] = (Math.random() - 0.5) * 300;
      positions[i3 + 1] = (Math.random() - 0.5) * 200;
      positions[i3 + 2] = (Math.random() - 0.5) * 300;

      // Vélocité aléatoire pour mouvement lent
      velocities[i3] = (Math.random() - 0.5) * 0.05;
      velocities[i3 + 1] = (Math.random() - 0.5) * 0.03;
      velocities[i3 + 2] = (Math.random() - 0.5) * 0.05;

      // Couleurs grises variées
      const brightness = Math.random() * 0.5 + 0.3; // 0.3 à 0.8
      colors[i3] = brightness;
      colors[i3 + 1] = brightness;
      colors[i3 + 2] = brightness;
    }

    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

    return { geometry, velocities };
  }, []);

  // Animation de mouvement des particules
  useFrame(() => {
    if (particlesRef.current) {
      const positions = particlesRef.current.geometry.attributes.position
        .array as Float32Array;

      for (let i = 0; i < positions.length; i += 3) {
        // Déplacer chaque particule selon sa vélocité
        positions[i] += velocities[i];
        positions[i + 1] += velocities[i + 1];
        positions[i + 2] += velocities[i + 2];

        // Reboucler les particules qui sortent de la zone
        if (Math.abs(positions[i]) > 150) positions[i] *= -1;
        if (Math.abs(positions[i + 1]) > 100) positions[i + 1] *= -1;
        if (Math.abs(positions[i + 2]) > 150) positions[i + 2] *= -1;
      }

      particlesRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <points ref={particlesRef} geometry={geometry}>
      <pointsMaterial
        size={0.2}
        vertexColors
        transparent
        opacity={0.4}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

// Composant Soleil
function Sun() {
  const groupRef = useRef<THREE.Group>(null);
  const { scene } = useGLTF("/projects/soleil.glb");

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.001;
    }
  });

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      <primitive object={scene.clone()} scale={4} />
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
      {/* Trait noir vertical - plus haut */}
      <mesh position={[0, -4, 0]}>
        <boxGeometry args={[0.08, 7, 0.08]} />
        <meshBasicMaterial color="#0F0F0F" />
      </mesh>
      {/* Point de connexion */}
      <mesh position={[0, -7.5, 0]}>
        <sphereGeometry args={[0.2, 16, 16]} />
        <meshBasicMaterial color="#0F0F0F" />
      </mesh>
      {/* Texte 3D au-dessus du trait - toujours vers caméra et cliquable */}
      <Text
        ref={textRef}
        position={[0, 0.5, 0]}
        fontSize={1.2}
        color="#0F0F0F"
        anchorX="center"
        anchorY="middle"
        outlineWidth={0.05}
        outlineColor="#9A9A8A"
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

// Composant Planète GLB (pour projets avec modèle 3D)
function PlanetGLB({
  position,
  isActive,
  modelPath,
}: {
  position: [number, number, number];
  isActive: boolean;
  modelPath: string;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const { scene, animations } = useGLTF(modelPath);
  const { actions } = useAnimations(animations, groupRef);

  // Jouer TOUTES les animations en même temps
  useEffect(() => {
    const animationNames = [
      "IcosphèreAction",
      "Icosphère.001Action",
      "VolumeAction.001",
      "VolumeAction.002",
      "Icosphère.002Action",
      "Icosphère.003Action",
      "Icosphère.004Action",
      "Icosphère.006Action",
    ];

    animationNames.forEach((name) => {
      const action = actions[name];
      if (action) {
        action.reset().play();
        action.setLoop(THREE.LoopRepeat, Infinity);
        console.log(`Animation '${name}' jouée !`);
      }
    });
  }, [actions]);

  // Rotation automatique de la planète
  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.002; // Rotation sur l'axe Y (ralentie)
    }
  });

  return (
    <group ref={groupRef} position={position}>
      <primitive object={scene.clone()} scale={3} />

      {/* Lumières locales diffuses pour la planète */}
      <pointLight
        position={[8, 8, 8]}
        intensity={isActive ? 2 : 1.5}
        color="#E8E8DC"
        distance={25}
        decay={2}
      />
      <pointLight
        position={[-8, 5, -8]}
        intensity={1.5}
        color="#F7F7E1"
        distance={20}
        decay={2}
      />
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
  const cameraLightRef = useRef<THREE.PointLight>(null);

  // Animation du temps pour les orbites
  useEffect(() => {
    const interval = setInterval(() => {
      setTime((prev) => prev + 0.01);
    }, 16);
    return () => clearInterval(interval);
  }, []);

  // Mettre à jour la position de la lumière de la caméra
  useFrame(({ camera }) => {
    if (cameraLightRef.current) {
      cameraLightRef.current.position.copy(camera.position);
    }
  });

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
          firstPlanetPos.x + directionFromSun.x * 12,
          firstPlanetPos.y + 6,
          firstPlanetPos.z + directionFromSun.z * 12
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
          currentPlanetPos.x + currentDirection.x * 12,
          currentPlanetPos.y + 3, // Légèrement au-dessus
          currentPlanetPos.z + currentDirection.z * 12
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
          nextPlanetPos.x + nextDirection.x * 12,
          nextPlanetPos.y + 3, // Légèrement au-dessus
          nextPlanetPos.z + nextDirection.z * 12
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

      // Effet parallax avec la souris (décalage plus prononcé x2)
      const parallaxOffset = new THREE.Vector3(
        mousePosition.x * 4,
        mousePosition.y * 3,
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
      {/* Lumière diffuse principale (éclairage global doux) */}
      <hemisphereLight intensity={1.5} color="#F7F7E1" groundColor="#9A9A8A" />
      {/* Lumière ambiante (base) */}
      <ambientLight intensity={0.6} color="#E8E8DC" />
      {/* Lumière du soleil central */}
      <pointLight
        position={[0, 0, 0]}
        intensity={2}
        color="#4A4A4A"
        distance={200}
        decay={1.5}
      />
      {/* Lumière directionnelle de gauche (lumière diffuse principale) */}
      <directionalLight
        position={[-100, 50, 50]}
        intensity={1.5}
        color="#F7F7E1"
      />
      {/* Lumière de la caméra (suit la caméra) - très lumineuse */}
      <pointLight
        ref={cameraLightRef}
        intensity={5}
        color="#FFFEF5"
        distance={100}
        decay={1}
      />
      {/* Lumière d'appoint droite */}
      <directionalLight
        position={[100, 30, -50]}
        intensity={1}
        color="#D4D4C8"
      />
      {/* Particules de galaxie spirale */}
      <GalaxyParticles />
      {/* Particules flottantes */}
      <FloatingParticles />
      {/* Soleil au centre */}
      <Sun />
      {/* Planètes avec labels */}
      {projects.map((project, index) => {
        const currentIndex = Math.max(0, Math.round(scrollProgress));
        const isActive = index === currentIndex;
        const showLabel = scrollProgress < 0 || !isActive; // Afficher label en overview ou si non active

        // Utiliser le modèle 3D si modelPath est défini
        const hasModel = project.modelPath !== undefined;

        return (
          <group key={project.id}>
            {hasModel ? (
              <PlanetGLB
                position={planetPositions[index]}
                isActive={isActive}
                modelPath={project.modelPath!}
              />
            ) : (
              <Planet
                position={planetPositions[index]}
                color={planetColors[index % planetColors.length]}
                size={3}
                project={project as Project}
                isActive={isActive}
              />
            )}
            <PlanetLabel
              position={planetPositions[index]}
              title={project.title}
              isVisible={showLabel}
              planetIndex={index}
              onNavigate={onNavigateToPlanet}
            />
          </group>
        );
      })}{" "}
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
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [hasEntered, setHasEntered] = useState(false); // Nouvel état pour l'écran d'entrée

  // États pour le terminal interactif
  const [terminalHistory, setTerminalHistory] = useState<string[]>([]);
  const [currentCommand, setCurrentCommand] = useState("");
  const [isInteractiveMode, setIsInteractiveMode] = useState(false);
  const terminalInputRef = useRef<HTMLInputElement>(null);
  const terminalHistoryRef = useRef<HTMLDivElement>(null);

  // Gestion de la musique de fond
  useEffect(() => {
    // Créer l'élément audio
    audioRef.current = new Audio("/mysterious-futuristic-ambience-375832.mp3");
    audioRef.current.loop = true;
    audioRef.current.volume = 0.3; // Volume à 30%

    // Cleanup
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  // Fonction pour entrer dans le portfolio (lance la musique)
  const handleEnter = async () => {
    if (audioRef.current) {
      try {
        await audioRef.current.play();
        setIsMusicPlaying(true);
        setHasEntered(true);
      } catch (error) {
        console.error("Erreur lecture audio:", error);
        setHasEntered(true); // Entrer quand même si l'audio échoue
      }
    } else {
      setHasEntered(true);
    }
  };

  // Toggle musique
  const toggleMusic = () => {
    if (audioRef.current) {
      if (isMusicPlaying) {
        audioRef.current.pause();
        setIsMusicPlaying(false);
      } else {
        audioRef.current.play();
        setIsMusicPlaying(true);
      }
    }
  };

  // Auto-scroll vers le bas quand l'historique change
  useEffect(() => {
    if (terminalHistoryRef.current) {
      terminalHistoryRef.current.scrollTop =
        terminalHistoryRef.current.scrollHeight;
    }
  }, [terminalHistory]);

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
  }, []);

  // Gestion du scroll avec transition automatique vers planète suivante/précédente
  useEffect(() => {
    let isScrolling = false;
    let scrollTimeout: NodeJS.Timeout;
    let touchStartY = 0;
    let touchEndY = 0;
    let accumulatedDelta = 0; // Accumuler les petits scrolls
    const deltaThreshold = 20; // Seuil minimum pour changer de planète (réduit pour plus de sensibilité)
    let lastScrollTime = 0; // Timestamp du dernier scroll traité
    const scrollCooldown = 1000; // Cooldown de 1s entre chaque changement de planète

    // Gestion du scroll souris avec accumulation et cooldown
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();

      const now = Date.now();

      // Empêcher les scrolls multiples pendant la transition ET pendant le cooldown
      if (isScrolling || now - lastScrollTime < scrollCooldown) {
        return;
      }

      // Accumuler les deltas
      accumulatedDelta += e.deltaY;

      // Réinitialiser l'accumulateur après un délai sans scroll
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        accumulatedDelta = 0;
      }, 150);

      // Ne changer de planète que si le seuil est atteint
      if (Math.abs(accumulatedDelta) >= deltaThreshold) {
        const currentPlanet = Math.round(targetScrollRef.current);
        const direction = accumulatedDelta > 0 ? 1 : -1;
        const targetPlanet = Math.max(
          -1,
          Math.min(projects.length - 1, currentPlanet + direction)
        );

        if (targetPlanet !== currentPlanet) {
          isScrolling = true;
          lastScrollTime = now; // Enregistrer le timestamp
          targetScrollRef.current = targetPlanet;
          accumulatedDelta = 0; // Reset après changement

          setTimeout(() => {
            isScrolling = false;
          }, 800);
        }
      }
    };

    // Gestion du swipe tactile pour mobile
    const handleTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY;
    };

    const handleTouchMove = (e: TouchEvent) => {
      touchEndY = e.touches[0].clientY;
    };

    const handleTouchEnd = () => {
      if (isScrolling) return;

      const swipeDistance = touchStartY - touchEndY;
      const minSwipeDistance = 50; // Distance minimale pour déclencher le swipe

      if (Math.abs(swipeDistance) > minSwipeDistance) {
        const currentPlanet = Math.round(targetScrollRef.current);
        const direction = swipeDistance > 0 ? 1 : -1; // Swipe up = suivant, swipe down = précédent
        const targetPlanet = Math.max(
          -1,
          Math.min(projects.length - 1, currentPlanet + direction)
        );

        if (targetPlanet !== currentPlanet) {
          isScrolling = true;
          targetScrollRef.current = targetPlanet;

          clearTimeout(scrollTimeout);
          scrollTimeout = setTimeout(() => {
            isScrolling = false;
          }, 800);
        }
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: true });
    window.addEventListener("touchend", handleTouchEnd, { passive: true });

    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleTouchEnd);
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

  // Fonction pour traiter les commandes du terminal
  const executeCommand = (cmd: string) => {
    const trimmedCmd = cmd.trim();
    if (!trimmedCmd) return;

    // Ajouter la commande à l'historique
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
          // Chercher par index ou par nom
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
            navigateToPlanet(projectIndex);
            setTerminalHistory((prev) => [
              ...prev,
              `Navigation vers: ${projects[projectIndex].title}\n`,
            ]);
            setIsInteractiveMode(false);
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
        setIsInteractiveMode(false);
        setTerminalHistory([]);
        // Forcer le rechargement du projet actuel
        prevProjectRef.current = null;
        break;

      default:
        setTerminalHistory((prev) => [
          ...prev,
          `Commande inconnue: "${command}". Tapez "help" pour voir les commandes disponibles.\n`,
        ]);
    }

    setCurrentCommand("");
  };

  // Animation typewriter pour le terminal
  useEffect(() => {
    // Réinitialiser prevProjectRef quand on entre en mode overview
    if (isOverviewMode) {
      prevProjectRef.current = null;
      return;
    }

    if (!isOverviewMode && currentProject) {
      // Si changement de projet, effacer puis réécrire
      if (prevProjectRef.current !== currentProject.id) {
        setIsTyping(true);
        setTerminalText(""); // Clear

        // Construire le texte complet avec meilleure mise en forme
        const fullText = `> PROJECT_LOADED\n\n━━━━━━━━━━━━━━━━━━━━━━━━━\n${currentProject.title.toUpperCase()}\n━━━━━━━━━━━━━━━━━━━━━━━━━\n\n> description:\n  ${
          currentProject.longDescription
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
    <>
      {/* Écran d'entrée */}
      {!hasEntered && (
        <div className="fixed inset-0 z-[100] bg-[#F7F7E1] flex items-center justify-center paper-texture">
          <div className="text-center space-y-8 md:space-y-12 p-6">
            {/* Logo/Titre */}
            <div className="space-y-4">
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-[#0F0F0F] tracking-wider uppercase">
                BASTIEN
                <br />
                GUITARD
              </h1>
              <div className="pencil-line w-full"></div>
              <p className="text-[#4A4A4A] text-sm md:text-base font-mono tracking-wide">
                DÉVELOPPEUR FULL-STACK & CRÉATIF
              </p>
            </div>

            {/* Bouton Entrer */}
            <button
              onClick={handleEnter}
              className="group relative px-12 py-4 md:px-16 md:py-6 bg-transparent border-4 border-[#0F0F0F] text-[#0F0F0F] text-xl md:text-2xl font-bold uppercase hover:bg-[#0F0F0F] hover:text-[#F7F7E1] transition-all duration-300 sketch-shadow"
            >
              <span className="relative z-10">ENTRER</span>
              {/* Effet de fond animé */}
              <div className="absolute inset-0 bg-[#0F0F0F] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
            </button>

            {/* Indication sonore */}
            <div className="text-[#9A9A8A] text-xs md:text-sm font-mono flex items-center justify-center gap-2">
              <span className="text-lg font-bold text-[#0F0F0F]">[</span>
              <span className="text-[#4A4A4A]">
                Expérience audio recommandée
              </span>
              <span className="text-lg font-bold text-[#0F0F0F]">]</span>
            </div>
          </div>
        </div>
      )}

      {/* Portfolio principal */}
      <div className="w-full h-screen flex flex-col md:flex-row paper-texture">
        {/* Bouton de contrôle audio - style sketch */}
        <button
          onClick={toggleMusic}
          className="fixed top-4 right-4 z-50 w-10 h-10 md:w-12 md:h-12 bg-[#FFFEF5] border-2 border-[#0F0F0F] flex items-center justify-center hover:bg-[#0F0F0F] hover:text-[#F7F7E1] transition-all sketch-shadow group"
          title={isMusicPlaying ? "Couper la musique" : "Activer la musique"}
        >
          {isMusicPlaying ? (
            <span className="text-xl md:text-2xl font-bold">♫</span>
          ) : (
            <span className="text-xl md:text-2xl font-bold relative">
              <span>♫</span>
              <span className="absolute inset-0 flex items-center justify-center text-3xl">
                /
              </span>
            </span>
          )}
        </button>{" "}
        {/* SVG Filters pour bordures gribouillées */}
        <svg className="svg-filters" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <filter
              id="rough-border"
              x="-50%"
              y="-50%"
              width="200%"
              height="200%"
            >
              <feTurbulence
                type="fractalNoise"
                baseFrequency="0.05"
                numOctaves="3"
                result="noise"
                seed="2"
              />
              <feDisplacementMap
                in="SourceGraphic"
                in2="noise"
                scale="2"
                xChannelSelector="R"
                yChannelSelector="G"
              />
            </filter>
          </defs>
        </svg>
        {/* Fenêtre Terminal - Mobile: en bas | Desktop: à gauche 30% - Style Sketch */}
        <div className="w-full h-1/2 md:w-[30%] md:h-full order-2 md:order-1 bg-[#F7F7E1] relative overflow-hidden">
          {/* Bordure visible dessinée à la main (droite sur desktop, haut sur mobile) */}
          <div
            className="absolute top-0 md:top-0 md:right-0 w-full md:w-1 h-1 md:h-full bg-gradient-to-r md:bg-gradient-to-b from-[#0F0F0F] via-[#2A2A2A] to-[#0F0F0F] opacity-70 z-50"
            style={{ filter: "url(#rough-border)" }}
          ></div>
          <div
            className="absolute top-0.5 md:top-0 md:right-0.5 w-full md:w-1 h-1 md:h-full bg-gradient-to-r md:bg-gradient-to-b from-[#4A4A4A] via-[#0F0F0F] to-[#4A4A4A] opacity-50 z-50"
            style={{ filter: "url(#rough-border)" }}
          ></div>
          {/* Barre de titre sketch */}
          <div className="h-10 bg-gradient-to-r from-[#FFFEF5] via-[#F7F7E1] to-[#FFFEF5] border-b-2 border-[#0F0F0F]/40 flex items-center px-4 relative visible-sketch-border">
            {/* Trait crayon */}
            <div className="absolute inset-0 pencil-line opacity-10"></div>

            <div className="flex gap-2 z-10">
              <div className="w-2 h-2 bg-[#0F0F0F] rounded-sm sketch-shadow-sm"></div>
              <div className="w-2 h-2 bg-[#4A4A4A] rounded-sm"></div>
              <div className="w-2 h-2 bg-[#9A9A8A] rounded-sm"></div>
            </div>
            <div className="flex-1 text-center z-10">
              <span className="text-[#0F0F0F] text-xs font-mono tracking-widest font-bold">
                {isOverviewMode
                  ? "[ SYSTEM ]"
                  : `[ ${currentProject?.title.toUpperCase() || "PROJECT"} ]`}
              </span>
            </div>
            <div className="text-[#4A4A4A] text-xs font-mono z-10">▼</div>
          </div>

          {/* Contenu du terminal */}
          <div className="h-[calc(100%-2.5rem)] overflow-hidden relative">
            {isInteractiveMode ? (
              // Mode terminal interactif
              <div className="p-6 md:p-10 h-full font-mono text-[#0F0F0F] relative flex flex-col">
                {/* Historique du terminal */}
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

                  {/* Input de commande inline */}
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
                      <span className="animate-pulse text-[#0F0F0F] ml-1">
                        █
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ) : isOverviewMode ? (
              // Présentation initiale - style sketch dessiné
              <div
                className="p-6 md:p-10 h-full flex flex-col justify-center font-mono text-[#0F0F0F] relative cursor-pointer transition-colors"
                onClick={() => {
                  setIsInteractiveMode(true);
                  setTimeout(() => terminalInputRef.current?.focus(), 100);
                }}
                title="Cliquer pour ouvrir le terminal interactif"
              >
                <div className="mb-6 md:mb-8">
                  <span className="text-[#4A4A4A] text-sm font-bold">
                    &gt; SYSTEM_ONLINE
                  </span>
                </div>

                <h1 className="text-4xl md:text-6xl font-bold text-[#0F0F0F] mb-2 tracking-wider uppercase">
                  BASTIEN GUITARD
                </h1>
                <div className="pencil-line mb-6 md:mb-8 w-full"></div>

                <div className="mb-4">
                  <span className="text-[#4A4A4A] font-bold">&gt; role:</span>
                  <span className="text-[#0F0F0F] ml-2 text-sm md:text-base">
                    DÉVELOPPEUR FULL-STACK & CRÉATIF
                  </span>
                </div>

                <div className="mb-6 md:mb-8">
                  <span className="text-[#4A4A4A] font-bold">
                    &gt; message:
                  </span>
                  <p className="text-[#2A2A2A] mt-2 leading-relaxed text-sm md:text-base">
                    Bienvenue dans mon univers ! Explorez mes projets à travers
                    ce système solaire interactif. Chaque planète représente une
                    création unique mêlant technologie et créativité.
                  </p>
                </div>

                <div className="text-[#4A4A4A] text-xs md:text-sm space-y-2">
                  <div className="animate-pulse">
                    <span className="font-bold">
                      &gt; Scroll ou Click sur les titres pour explorer_
                    </span>
                  </div>
                  <div className="text-[#9A9A8A] text-xs mt-2">
                    <span>
                      [Cliquez sur le terminal pour le mode interactif]
                    </span>
                  </div>
                </div>
              </div>
            ) : (
              // Terminal de projet avec animation typewriter - style sketch
              currentProject && (
                <div
                  className="p-3 md:p-10 h-full font-mono text-[#0F0F0F] overflow-y-auto relative cursor-pointer transition-colors flex flex-col"
                  onClick={(e) => {
                    // Ne pas déclencher si on clique sur un lien
                    if ((e.target as HTMLElement).tagName !== "A") {
                      setIsInteractiveMode(true);
                      setTimeout(() => terminalInputRef.current?.focus(), 100);
                    }
                  }}
                  title="Cliquer pour ouvrir le terminal interactif"
                >
                  {/* Texte qui s'écrit avec titre en couleur - scrollable si nécessaire */}
                  <div className="flex-1 overflow-y-auto scrollbar-hide">
                    <pre className="whitespace-pre-wrap text-[10px] leading-tight md:text-sm md:leading-relaxed">
                      {terminalText.split("\n").map((line, i) => {
                        // Mettre le titre du projet en gras et plus gros
                        const isTitle =
                          line === currentProject.title.toUpperCase();
                        return (
                          <span key={i}>
                            {isTitle ? (
                              <span className="text-[#0F0F0F] font-bold text-lg">
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
                        <span className="animate-pulse text-[#0F0F0F]">█</span>
                      )}
                    </pre>
                  </div>

                  {/* Boutons affichés seulement quand l'animation est terminée - toujours visibles en bas */}
                  {!isTyping &&
                    (currentProject.githubUrl || currentProject.demoUrl) && (
                      <div className="mt-2 md:mt-8 flex flex-row gap-2 md:gap-4 flex-shrink-0">
                        {currentProject.githubUrl && (
                          <a
                            href={currentProject.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1 px-2 md:px-4 py-1.5 md:py-2 text-[10px] md:text-base border-2 border-[#0F0F0F] text-[#0F0F0F] hover:bg-[#0F0F0F] hover:text-[#F7F7E1] transition-all sketch-shadow text-center font-bold"
                          >
                            &gt; GITHUB
                          </a>
                        )}
                        {currentProject.demoUrl && (
                          <a
                            href={currentProject.demoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1 px-2 md:px-4 py-1.5 md:py-2 text-[10px] md:text-base bg-[#0F0F0F] text-[#F7F7E1] hover:bg-[#2A2A2A] transition-all sketch-shadow text-center font-bold"
                          >
                            &gt; DEMO
                          </a>
                        )}
                      </div>
                    )}
                </div>
              )
            )}
          </div>
        </div>
        {/* Fenêtre Canvas 3D - Mobile: en haut | Desktop: à droite 70% - Style Sketch */}
        <div className="w-full h-1/2 md:w-[70%] md:h-full order-1 md:order-2 bg-[#F7F7E1] relative overflow-hidden paper-texture">
          {/* Barre de titre sketch */}
          <div className="h-10 bg-gradient-to-r from-[#FFFEF5] via-[#F7F7E1] to-[#FFFEF5] border-b-2 border-[#0F0F0F]/40 flex items-center px-4 relative visible-sketch-border">
            {/* Trait crayon */}
            <div className="absolute inset-0 pencil-line opacity-10"></div>

            <div className="flex gap-2 z-10">
              <div className="w-2 h-2 bg-[#0F0F0F] rounded-sm sketch-shadow-sm"></div>
              <div className="w-2 h-2 bg-[#4A4A4A] rounded-sm"></div>
              <div className="w-2 h-2 bg-[#9A9A8A] rounded-sm"></div>
            </div>
            <div className="flex-1 text-center z-10">
              <span className="text-[#0F0F0F] text-xs font-mono tracking-widest font-bold">
                [ SOLAR SYSTEM 3D ]
              </span>
            </div>
            <div className="text-[#4A4A4A] text-xs font-mono z-10">▼</div>
          </div>

          {/* Canvas */}
          <div className="h-[calc(100%-2.5rem)] relative bg-[#F7F7E1]">
            <Canvas
              camera={{ position: [120, 80, 120], fov: 75 }}
              onCreated={({ camera }) => {
                (camera as any).ref = camera;
              }}
              style={{ background: "#F7F7E1" }}
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
                    className={`w-3 h-3 rounded-sm transition-all sketch-shadow-sm ${
                      index === currentPlanetIndex
                        ? "bg-[#0F0F0F] scale-125"
                        : "bg-[#9A9A8A]/50"
                    }`}
                  />
                ))}
              </div>
            )}

            {/* Fenêtre de preview - Responsive (plus petite sur mobile) */}
            <div className="absolute bottom-36 left-4 md:bottom-65 md:left-6 w-40 md:w-64 lg:w-80 bg-[#FFFEF5]/95 rounded-sm overflow-hidden sketch-shadow z-20 visible-sketch-border">
              {/* Barre de titre */}
              <div className="h-6 md:h-8 bg-gradient-to-r from-[#FFFEF5] via-[#F7F7E1] to-[#FFFEF5] border-b-2 border-[#0F0F0F]/40 flex items-center px-2 md:px-3 relative">
                <div className="absolute inset-0 pencil-line opacity-10"></div>
                <div className="flex gap-1 md:gap-1.5 z-10">
                  <div className="w-1 h-1 md:w-1.5 md:h-1.5 bg-[#0F0F0F] rounded-sm"></div>
                  <div className="w-1 h-1 md:w-1.5 md:h-1.5 bg-[#4A4A4A] rounded-sm"></div>
                  <div className="w-1 h-1 md:w-1.5 md:h-1.5 bg-[#9A9A8A] rounded-sm"></div>
                </div>
                <div className="flex-1 text-center z-10">
                  <span className="text-[#0F0F0F] text-[8px] md:text-[10px] font-mono tracking-widest font-bold">
                    {isOverviewMode ? "[ CONTACT ]" : "[ PREVIEW ]"}
                  </span>
                </div>
              </div>

              {/* Contenu */}
              {isOverviewMode ? (
                // Mode Overview - Contact
                <div className="p-2 md:p-4 font-mono text-xs space-y-1.5 md:space-y-3">
                  <div className="text-[#4A4A4A] text-[8px] md:text-xs">
                    <span className="text-[#0F0F0F] font-bold">&gt;</span>{" "}
                    contact.info
                  </div>

                  <div className="space-y-1 md:space-y-2">
                    <a
                      href="mailto:bastienguitard8@gmail.com"
                      className="flex items-center gap-1.5 md:gap-2 text-[#0F0F0F] hover:text-[#4A4A4A] transition-colors group"
                    >
                      <span className="text-[#0F0F0F] text-xs md:text-base font-bold">
                        @
                      </span>
                      <span className="text-[8px] md:text-[10px] font-bold">
                        EMAIL
                      </span>
                    </a>

                    <a
                      href="https://github.com/bastienggg"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 md:gap-2 text-[#0F0F0F] hover:text-[#4A4A4A] transition-colors group"
                    >
                      <span className="text-[#0F0F0F] text-xs md:text-base font-bold">
                        #
                      </span>
                      <span className="text-[8px] md:text-[10px] font-bold">
                        GITHUB
                      </span>
                    </a>

                    <a
                      href="https://www.linkedin.com/in/bastien-guitard-30585329b/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 md:gap-2 text-[#0F0F0F] hover:text-[#4A4A4A] transition-colors group"
                    >
                      <span className="text-[#0F0F0F] text-xs md:text-base font-bold">
                        in
                      </span>
                      <span className="text-[8px] md:text-[10px] font-bold">
                        LINKEDIN
                      </span>
                    </a>
                  </div>

                  <div className="text-[#9A9A8A] text-[7px] md:text-[9px] mt-1.5 md:mt-3 border-t border-[#0F0F0F]/20 pt-1.5 md:pt-2">
                    &gt; status: online_
                  </div>
                </div>
              ) : (
                // Mode Projet - Preview Image (plus compact sur mobile)
                currentProject && (
                  <div className="p-0">
                    <a
                      href={currentProject.demoUrl || currentProject.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block group cursor-pointer"
                    >
                      <div className="relative overflow-hidden aspect-video border border-[#0F0F0F]/20">
                        <img
                          src={currentProject.imageUrl}
                          alt={currentProject.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#F7F7E1]/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-1.5 md:p-3">
                          <span className="text-[#0F0F0F] text-[8px] md:text-xs font-mono font-bold">
                            &gt; VOIR
                          </span>
                        </div>
                      </div>
                    </a>
                    <div className="p-1.5 md:p-3 font-mono text-[7px] md:text-[9px] text-[#4A4A4A] truncate">
                      <span className="text-[#0F0F0F] font-bold">&gt;</span>{" "}
                      {currentProject.title}
                    </div>
                  </div>
                )
              )}
            </div>
          </div>
        </div>
        <style jsx global>{`
          /* Cacher la scrollbar pour le terminal */
          .scrollbar-hide {
            -ms-overflow-style: none;
            scrollbar-width: none;
          }
          .scrollbar-hide::-webkit-scrollbar {
            display: none;
          }
        `}</style>
      </div>
    </>
  );
}
