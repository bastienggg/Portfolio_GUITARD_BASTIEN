# Instructions GitHub Copilot - Portfolio Bastien Guitard

## Vue d'ensemble du projet

Ce projet est un portfolio personnel développé avec Next.js 15, TypeScript et Tailwind CSS. Il présente mes projets, mon CV, une galerie photo et un formulaire de contact.

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

## Conventions de code

### Composants

- Utiliser des composants fonctionnels TypeScript avec typage strict
- Privilégier les Server Components Next.js par défaut
- Utiliser les Client Components uniquement quand nécessaire (interactivité, hooks)
- Suivre la structure: props interface → component → exports

### Styles

- Utiliser Tailwind CSS avec les classes utilitaires
- Suivre le design system défini dans les composants UI (shadcn/ui)
- Responsive-first design (mobile → desktop)

### Fichiers et organisation

- `src/app/`: Routes Next.js (App Router)
- `src/components/`: Composants réutilisables
- `src/data/`: Données statiques (JSON, constantes)
- `src/lib/`: Utilitaires et helpers
- `public/`: Assets statiques (images, etc.)

### Gestion des images

- Images des projets stockées dans `/public/projects/`
- Utiliser le composant `next/image` pour l'optimisation
- Format recommandé: PNG ou WebP
- Prévoir des images en aspect ratio 16:9 pour les cartes de projets

## Bonnes pratiques

1. **Accessibilité**: Toujours inclure des attributs alt, aria-labels appropriés
2. **SEO**: Utiliser les metadata Next.js pour chaque page
3. **Performance**: Optimiser les images, lazy loading, code splitting
4. **TypeScript**: Typage strict, éviter `any`, utiliser les interfaces
5. **Git**: Commits clairs et atomiques en français
6. **Données**: Privilégier les fichiers JSON pour la configuration des projets plutôt que le code en dur

## Ajout d'un nouveau projet

Pour ajouter un nouveau projet:

1. Ajouter l'image dans `/public/projects/`
2. Ajouter l'entrée dans `/src/data/projects.json`
3. Les composants chargeront automatiquement le nouveau projet

## Technologies principales

- Framework: Next.js 15 (App Router)
- Langage: TypeScript
- Styles: Tailwind CSS
- UI: shadcn/ui components
- Deployment: Vercel
