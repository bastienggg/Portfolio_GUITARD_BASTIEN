# Instructions GitHub Copilot - Portfolio Bastien Guitard

## Vue d'ensemble du projet

Ce projet est un portfolio 3D développé avec Next.js 15, TypeScript, Tailwind CSS et React Three Fiber. Il présente mes projets sous forme d'un système solaire interactif avec une expérience immersive en 3D.

## Architecture du projet

Le portfolio se compose d'une **seule page** : un système solaire 3D où chaque planète représente un projet.

### Structure simplifiée

- **Page d'accueil** (`/`) : Redirige automatiquement vers `/portfolio3d`
- **Portfolio 3D** (`/portfolio3d`) : Expérience interactive principale

### Composants

- `SolarSystemScene.tsx` : Composant principal du portfolio 3D
  - Système solaire avec planètes orbitales
  - Split-screen : terminal (50% gauche) + canvas 3D (50% droite)
  - Typewriter effect pour l'affichage des projets
  - Animations de caméra avec arcs paraboliques
  - Navigation par scroll ou clic sur les labels

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
- Couleurs principales :
  - Background : `#0a1929` (dark blue)
  - Accents : `text-cyan-400`, `text-white`
  - Terminal : noir et blanc monochrome
- Design system minimaliste et épuré

### Fichiers et organisation

- `src/app/` : Routes Next.js (App Router)
  - `page.tsx` : Redirection vers `/portfolio3d`
  - `portfolio3d/page.tsx` : Page principale
  - `layout.tsx` : Layout simplifié sans header/footer
- `src/components/` : Composants réutilisables
  - `SolarSystemScene.tsx` : Le seul composant principal
  - `ui/` : shadcn/ui components de base
- `src/data/` : Données statiques
  - `projects.json` : Tous les projets
- `src/lib/` : Utilitaires
  - `utils.ts` : Helpers Tailwind

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

## Ajout d'un nouveau projet

Pour ajouter un nouveau projet:

1. Ajouter l'image dans `/public/projects/`
2. Ajouter l'entrée dans `/src/data/projects.json`
3. Le système solaire créera automatiquement une nouvelle planète

## Technologies principales

- Framework : Next.js 15 (App Router)
- Langage : TypeScript
- 3D : React Three Fiber (@react-three/fiber, @react-three/drei)
- Math 3D : Three.js (Vector3, quaternions, etc.)
- Styles : Tailwind CSS
- UI : shadcn/ui components
- Deployment : Vercel
