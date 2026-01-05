# Instructions GitHub Copilot - Portfolio Bastien Guitard

## Vue d'ensemble du projet

Ce projet est un portfolio 3D développé avec Next.js 15, TypeScript, Tailwind CSS et React Three Fiber. Il présente mes projets sous forme d'un système solaire interactif avec une expérience immersive en 3D.

## ⚠️ IMPORTANT - Architecture Modulaire (Janvier 2026)

Le projet a été **entièrement réorganisé** en janvier 2026 d'un fichier monolithique de 1575 lignes vers une architecture modulaire de 47 fichiers.

**Documentation complète** : Voir `ARCHITECTURE.md` et `REFACTORING_SUMMARY.md`

## Architecture du projet

Le portfolio se compose d'une **seule page** : un système solaire 3D où chaque planète représente un projet.

### Structure du code

```
src/
├── types/                    # Types TypeScript centralisés
│   ├── project.ts           # Interface Project
│   ├── three.ts             # Types Three.js (Position3D, MousePosition, etc.)
│   └── index.ts
│
├── hooks/                    # Hooks React personnalisés
│   ├── useScrollProgress.ts # Gestion du scroll avec easing
│   ├── useResponsive.ts     # Détection responsive
│   ├── useTypewriter.ts     # Effet typewriter
│   └── index.ts
│
├── lib/                      # Utilitaires
│   ├── utils.ts             # Utilitaires Tailwind (cn)
│   └── three/               # Utilitaires Three.js
│       ├── camera.ts        # Calculs de caméra et positions
│       ├── animations.ts    # Animations de particules
│       └── index.ts
│
├── components/
│   ├── SolarSystemScene.tsx # Orchestrateur principal (~200 lignes)
│   │
│   └── portfolio3d/         # Composants du portfolio 3D
│       ├── Scene3D.tsx      # Scene Three.js principale
│       │
│       ├── space/           # Éléments spatiaux
│       │   ├── Sun.tsx
│       │   ├── GalaxyParticles.tsx
│       │   ├── FloatingParticles.tsx
│       │   └── index.ts
│       │
│       ├── planets/         # Planètes et labels
│       │   ├── PlanetGLB.tsx
│       │   ├── PlanetSphere.tsx
│       │   ├── PlanetLabel.tsx
│       │   └── index.ts
│       │
│       ├── camera/          # Gestion caméra
│       │   ├── CameraController.tsx
│       │   └── index.ts
│       │
│       ├── terminal/        # Terminal interactif
│       │   ├── Terminal.tsx
│       │   ├── TerminalOverview.tsx
│       │   ├── TerminalProject.tsx
│       │   ├── TerminalInteractive.tsx
│       │   └── index.ts
│       │
│       ├── ui/              # Composants UI
│       │   ├── ContactWindow.tsx
│       │   ├── ProgressIndicator.tsx
│       │   ├── MusicControl.tsx
│       │   ├── EnterScreen.tsx
│       │   └── index.ts
│       │
│       └── index.ts         # Barrel export principal
│
├── data/
│   └── projects.json        # Données des projets
│
└── app/                     # Routes Next.js
    ├── page.tsx
    ├── layout.tsx
    └── portfolio3d/
        └── page.tsx
```

### Composants Principaux

#### SolarSystemScene.tsx

- **Rôle** : Orchestrateur principal (200 lignes vs 1575 avant)
- **Responsabilités** :
  - Gestion de l'état global (scroll, musique, souris)
  - Layout responsive
  - Coordination des composants

#### Scene3D.tsx

- **Rôle** : Scene Three.js principale
- **Responsabilités** :
  - Rendu 3D (soleil, planètes, particules)
  - Gestion des lumières
  - Coordination caméra/planètes

#### Terminal

- **Modes** :
  - **Overview** : Présentation personnelle
  - **Project** : Détails du projet avec typewriter effect
  - **Interactive** : Shell avec commandes (ls, cd, help, etc.)
- **Key prop** : Utilise `key={currentProject.id}` pour forcer le remount et relancer l'animation

#### CameraController

- Calcul des positions avec easing
- Transitions paraboliques
- Effet parallax souris

### Données

- `projects.json` : Seule source de données, contient tous les projets

## Projets principaux

### 1. Dot TXT

- **Type**: Application web de collaboration en temps réel
- **Description**: Application de prise de notes collaborative inspirée de Google Docs
- **Technologies**: Next.js, TypeScript, React.js, Pinia, Socket.io, Node.js, Docker
- **Statut**: En cours de développement
- **URLs**:
  - GitHub: https://github.com/bastienggg/Dot_TXT
  - Demo: https://dot-txt.fr
- **Fonctionnalités clés**:
  - Édition collaborative en temps réel
  - Synchronisation instantanée entre utilisateurs
  - Gestion de projets avec tableau Kanban
  - Interface moderne et responsive

### 2. Let Him Quizz

- **Type**: Jeu 3D éducatif en VR
- **Description**: Jeu immersif pour l'apprentissage de l'anglais via des mini-jeux
- **Technologies**: Three.js, A-Frame, WebGL, JavaScript, HTML, CSS
- **Statut**: Terminé
- **URLs**:
  - GitHub: https://github.com/bastienggg/Let_him_quizz
  - Demo: https://lethimquiz.bastienguitard.fr
- **Fonctionnalités clés**:
  - Expérience VR complète
  - Mini-jeux interactifs inspirés de jeux TV
  - Apprentissage ludique de l'anglais
  - Graphismes 3D immersifs

## Structure des données

### Format des projets

Les projets sont stockés dans `/src/data/projects.json` avec la structure suivante:

```typescript
{
  id: string;              // Identifiant unique
  title: string;           // Titre du projet
  description: string;     // Description courte
  longDescription: string; // Description détaillée
  technologies: string[];  // Technologies utilisées
  githubUrl?: string;      // URL du dépôt GitHub (optionnel)
  demoUrl?: string;        // URL de démonstration (optionnel)
  imageUrl: string;        // Chemin de l'image du projet
  status: "completed" | "in-progress" | "planned"; // Statut du projet
  featured?: boolean;      // Indique si le projet est mis en avant (optionnel)
}
```

## Système de navigation 3D

### Fonctionnement

- **Mode Overview** (scrollProgress = -1) : Vue d'ensemble avec présentation personnelle
- **Mode Projet** (scrollProgress = 0+) : Chaque position correspond à un projet/planète
- **Navigation** :
  - Scroll sur le canvas 3D pour changer de planète
  - Clic sur les labels 3D flottants
  - Animation de transition avec arc parabolique (8 _ sin(t _ π))

### Caméra

- Position frontale : `planetPos + direction * 20`
- Élévation légère : `planetPos.y + 3`
- Easing factor : 0.08 pour fluidité
- Debounce scroll : 800ms

### Terminal

- **Style** : Noir et blanc avec titres en cyan (`text-cyan-400`)
- **Animation typewriter** : 5ms par caractère
- **Format** :

  ```
  > PROJECT_LOADED

  ━━━━━━━━━━━━━━━━━━━━━━━━━
  TITRE DU PROJET (en cyan)
  ━━━━━━━━━━━━━━━━━━━━━━━━━

  > description:
    [Description du projet]

  > technologies:
    [React] [Node.js] [etc.]

  > status: completed

  > ready_
  ```

## Conventions de code

### Composants

- Utiliser des composants fonctionnels TypeScript avec typage strict
- Client Components pour l'interactivité 3D (`"use client"`)
- Suivre la structure: props interface → component → exports

### React Three Fiber

- Utiliser `useFrame` pour les animations frame-by-frame
- `useRef` pour les références de caméra et contrôles
- `THREE.Vector3` et quaternions pour les calculs 3D
- Billboard text avec `quaternion.copy(camera.quaternion)`

### Styles

- Utiliser Tailwind CSS avec les classes utilitaires
- **Design system cyberpunk** :
  - Noir profond partout (`bg-black`)
  - Accents cyan néon (`text-cyan-400`, `border-cyan-400`)
  - Effets glow avec `shadow-[0_0_*px_rgba(34,211,238,*)]`
  - Typography mono-espacée (font-mono)
  - Uppercase pour les titres importants
- **Responsive** :
  - Desktop : `md:` breakpoint (768px+)
  - Mobile-first avec Flexbox column
  - Tailles adaptatives : `text-xs md:text-sm`, `p-6 md:p-10`
- **Interactions** :
  - `cursor-pointer` sur éléments cliquables
  - `hover:bg-white/5` pour feedback subtil
  - Transitions avec `transition-all` ou `transition-colors`
- **Curseur** : Le curseur système est activé (pas de curseur personnalisé)

### Fichiers et organisation

- `src/app/` : Routes Next.js (App Router)
  - `page.tsx` : Redirection vers `/portfolio3d`
  - `portfolio3d/page.tsx` : Page principale
  - `layout.tsx` : Layout simplifié sans header/footer
- `src/components/` : Composants réutilisables
  - `SolarSystemScene.tsx` : Composant principal
  - `portfolio3d/` : Tous les composants 3D modulaires
  - `ui/` : shadcn/ui components de base
- `src/hooks/` : Hooks React personnalisés
  - `useScrollProgress.ts` : Gestion scroll
  - `useResponsive.ts` : Détection responsive
  - `useTypewriter.ts` : Animation typewriter
- `src/types/` : Types TypeScript centralisés
  - `project.ts` : Interface Project
  - `three.ts` : Types Three.js
- `src/lib/` : Utilitaires
  - `utils.ts` : Helpers Tailwind
  - `three/` : Utilitaires Three.js
- `src/data/` : Données statiques
  - `projects.json` : Tous les projets

## Bonnes pratiques

1. **Performance 3D** :
   - Optimiser le nombre de vertices
   - Utiliser `useMemo` pour les géométries
   - Limiter les recalculs dans `useFrame`
2. **Accessibilité** : Labels clairs, navigation au clavier si possible
3. **SEO** : Metadata Next.js appropriées
4. **TypeScript** : Typage strict, interfaces pour les props 3D
5. **Git** : Commits clairs et atomiques en français
6. **Animation** : Utiliser requestAnimationFrame pour la fluidité
7. **Modularité** : Composants isolés avec une seule responsabilité
8. **Barrel exports** : Utiliser `index.ts` pour simplifier les imports

## Ajout d'un nouveau projet

Pour ajouter un nouveau projet:

1. Ajouter l'image dans `/public/projects/`
2. Ajouter l'entrée dans `/src/data/projects.json`
3. Le système solaire créera automatiquement une nouvelle planète

## Debugging du Terminal

Le terminal utilise une **key prop** basée sur l'ID du projet (`key={currentProject.id}`) pour forcer le remount et relancer l'animation typewriter à chaque changement de projet. C'est essentiel pour que l'animation fonctionne correctement sur tous les projets, y compris le premier.

## Technologies principales

- Framework : Next.js 15 (App Router)
- Langage : TypeScript
- 3D : React Three Fiber (@react-three/fiber, @react-three/drei)
- Math 3D : Three.js (Vector3, quaternions, etc.)
- Styles : Tailwind CSS
- UI : shadcn/ui components
- Deployment : Vercel
