# Guide d'optimisation SEO - Portfolio Bastien Guitard

## ✅ Optimisations SEO implémentées

### 1. Métadonnées complètes

- **Title optimisé** : "Bastien Guitard - Développeur Full-Stack & Créatif | Portfolio 3D"
- **Description enrichie** : Inclut mots-clés principaux (React, Next.js, Three.js, etc.)
- **Keywords ciblés** : 15+ mots-clés pertinents incluant projets spécifiques
- **URL canonique** : https://bastienguitard.fr
- **metadataBase** : Configuration URL de base pour Next.js

### 2. Open Graph & Social Media

- **Open Graph complet** : Titre, description, image, URL, locale
- **Twitter Card** : Configuration summary_large_image
- **Image OG** : `/og-image.png` (1200x630px recommandé)
- **Aperçus sociaux optimisés** pour partage Facebook, LinkedIn, Twitter

### 3. Données structurées (Schema.org)

- **JSON-LD Schema** : Type "Person"
- **Propriétés** : name, jobTitle, description, url
- **sameAs** : Liens GitHub et LinkedIn
- **knowsAbout** : Technologies maîtrisées

### 4. Fichiers SEO essentiels

- **robots.txt** : Permet l'indexation complète
- **sitemap.xml** : Généré dynamiquement avec Next.js
- **manifest.json** : Configuration PWA avec nom, icônes, couleurs

### 5. Robots & Indexation

- **Index/Follow** : Activé pour Google et autres moteurs
- **Google Bot config** : max-image-preview: large, max-snippet: -1
- **Langue** : `lang="fr"` sur la balise HTML
- **Theme color** : #22d3ee (cyan cyberpunk)

### 6. Performance & Accessibilité

- **Sémantique HTML** : main, nav, section
- **Responsive** : Mobile-first design
- **Loading rapide** : Next.js optimisations natives
- **Fonts optimisées** : Google Fonts avec next/font

## 📋 Actions recommandées post-déploiement

### Google Search Console

1. Ajouter la propriété sur https://search.google.com/search-console
2. Vérifier le site avec le code de vérification
3. Soumettre le sitemap : `https://bastienguitard.fr/sitemap.xml`
4. Demander l'indexation des pages principales

### Image Open Graph

Créer `/public/og-image.png` (1200x630px) avec :

- Nom "Bastien Guitard"
- Titre "Développeur Full-Stack"
- Visuel du système solaire 3D
- Design cyberpunk (cyan sur fond noir)

### Analytics (optionnel)

- Google Analytics 4 : Ajouter gtag dans layout.tsx
- Plausible Analytics : Alternative privacy-friendly

### Structured Data Testing

- Tester sur https://search.google.com/test/rich-results
- Valider le JSON-LD schema

### Lighthouse Score

Viser les scores suivants :

- **Performance** : 90+
- **Accessibility** : 95+
- **Best Practices** : 100
- **SEO** : 100

## 🎯 Mots-clés ciblés

**Primaires** :

- Bastien Guitard
- Développeur full-stack
- Portfolio 3D
- Portfolio interactif

**Secondaires** :

- React Three Fiber
- Next.js developer
- Three.js portfolio
- Développeur créatif
- BUT MMI

**Projets** :

- Dot TXT collaboration
- Let Him Quizz VR

## 🔗 Backlinks recommandés

1. LinkedIn : Ajouter lien dans profil
2. GitHub : Ajouter dans bio et README
3. Annuaires développeurs : awwwards, cssdesignawards
4. Portfolio showcases : Dribbble, Behance

## 📊 Monitoring

Suivre mensuellement :

- Position Google pour mots-clés principaux
- Trafic organique (Search Console)
- Core Web Vitals
- Taux de rebond

---

**Date de dernière mise à jour** : 9 décembre 2025
**Statut SEO** : ✅ Optimisé pour production
