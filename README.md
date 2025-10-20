# Portfolio de Bastien Guitard 🚀

Portfolio moderne et responsive développé avec Next.js 15, React, TypeScript, Tailwind CSS et shadcn-ui.

> **Développeur fullstack — étudiant 3ᵉ année BUT MMI**  
> Spécialisé dans le développement web et les dispositifs interactifs.

## ✨ Fonctionnalités

- 🎨 **Design moderne** avec Tailwind CSS et shadcn-ui
- 📱 **Responsive** sur tous les appareils
- ⚡ **Performance optimisée** avec Next.js 15
- 🌍 **SEO optimisé** avec métadonnées en français
- 🖼️ **Galerie photo** responsive avec placeholders
- 📋 **Gestion de projets** avec données structurées
- 📧 **Formulaire de contact** avec mailto et option API
- 📄 **CV téléchargeable** en PDF
- ♿ **Accessible** avec les bonnes pratiques ARIA

## 🛠️ Technologies utilisées

- **Framework** : Next.js 15 (App Router)
- **Language** : TypeScript
- **Styling** : Tailwind CSS 4
- **Composants** : shadcn-ui
- **Icônes** : Lucide React
- **Déploiement** : Vercel (recommandé)

## 🚀 Installation et développement

### Prérequis

- Node.js 18+
- npm ou yarn ou pnpm

### 1. Cloner le repository

\`\`\`bash
git clone https://github.com/bastienggg/Portfolio_GUITARD_BASTIEN.git
cd Portfolio_GUITARD_BASTIEN
\`\`\`

### 2. Installer les dépendances

\`\`\`bash
npm install

# ou

yarn install

# ou

pnpm install
\`\`\`

### 3. Lancer le serveur de développement

\`\`\`bash
npm run dev

# ou

yarn dev

# ou

pnpm dev
\`\`\`

Ouvrez [http://localhost:3000](http://localhost:3000) dans votre navigateur.

### 4. Build de production

\`\`\`bash
npm run build
npm run start

# ou

yarn build
yarn start
\`\`\`

## 📁 Structure du projet

\`\`\`
├── public/
│ ├── projects/ # Images des projets
│ ├── gallery/ # Photos pour la galerie
│ ├── cv.pdf # CV téléchargeable
│ └── README-images.md # Instructions pour les images
├── src/
│ ├── app/
│ │ ├── globals.css # Styles globaux
│ │ ├── layout.tsx # Layout principal
│ │ ├── page.tsx # Page d'accueil
│ │ ├── projets/ # Page des projets
│ │ ├── galerie/ # Page galerie photo
│ │ ├── contact/ # Page de contact
│ │ └── cv/ # Page CV
│ ├── components/
│ │ ├── ui/ # Composants shadcn-ui
│ │ ├── Header.tsx # Navigation principale
│ │ ├── Footer.tsx # Pied de page
│ │ └── ProjectCard.tsx # Carte de projet
│ ├── data/
│ │ └── featuredRepos.ts # Données des projets
│ └── lib/
│ └── utils.ts # Utilitaires
└── README.md
\`\`\`

## 🎨 Personnalisation

### 1. Informations personnelles

Remplacez les informations de Bastien Guitard par les vôtres dans :

- **Nom et titre** : \`src/app/layout.tsx\` (métadonnées)
- **Page d'accueil** : \`src/app/page.tsx\`
- **Footer** : \`src/components/Footer.tsx\`
- **Email de contact** : \`src/app/contact/page.tsx\` et \`src/components/Footer.tsx\`

### 2. Projets

Modifiez vos projets dans \`src/data/featuredRepos.ts\` :

\`\`\`typescript
export const featuredProjects: Project[] = [
{
id: 'mon-projet',
title: 'Mon Projet',
description: 'Description courte',
longDescription: 'Description détaillée...',
technologies: ['React', 'Next.js'],
githubUrl: 'https://github.com/vous/mon-projet',
demoUrl: 'https://mon-projet.vercel.app',
imageUrl: '/projects/mon-projet.jpg',
status: 'completed'
}
// ... autres projets
];
\`\`\`

### 3. Images

Ajoutez vos images dans les dossiers appropriés :

- **Projets** : \`/public/projects/\` (format : 1200x800px)
- **Galerie** : \`/public/gallery/\` (format : 800x800px)
- **CV** : \`/public/cv.pdf\`

Voir \`/public/README-images.md\` pour plus de détails.

### 4. Couleurs

Les couleurs principales sont définies dans \`src/app/globals.css\` :

- **Background** : #FFFAFA
- **Foreground** : #080808

Modifiez ces valeurs selon vos préférences.

## 📧 Configuration du formulaire de contact

### Option 1 : Mailto (par défaut)

Le formulaire ouvre automatiquement le client email avec le message pré-rempli.

### Option 2 : API Endpoint

Pour envoyer des emails via une API, créez \`src/app/api/contact/route.ts\` :

\`\`\`typescript
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
const { name, email, subject, message } = await request.json();

// Intégrez votre service email ici :
// - Resend : https://resend.com/
// - SendGrid : https://sendgrid.com/
// - Nodemailer avec SMTP

try {
// Logique d'envoi d'email
console.log('Email reçu:', { name, email, subject, message });

    return NextResponse.json({ success: true });

} catch (error) {
return NextResponse.json({ error: 'Erreur envoi' }, { status: 500 });
}
}
\`\`\`

## 🚀 Déploiement sur Vercel

### 1. Méthode rapide (recommandée)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/bastienggg/Portfolio_GUITARD_BASTIEN)

### 2. Méthode manuelle

1. **Pushez votre code sur GitHub**

\`\`\`bash
git add .
git commit -m "Portfolio initial"
git push origin main
\`\`\`

2. **Connectez-vous à [Vercel](https://vercel.com)**

3. **Importez votre repository GitHub**

4. **Configurez le projet** :

   - Framework Preset : Next.js
   - Root Directory : ./
   - Build Command : \`npm run build\`
   - Output Directory : .next

5. **Déployez** 🎉

### 3. Variables d'environnement (optionnel)

Si vous utilisez des services externes, ajoutez vos variables dans Vercel :

\`\`\`
RESEND_API_KEY=your_api_key
NEXT_PUBLIC_SITE_URL=https://votre-domaine.vercel.app
\`\`\`

## 📊 Performance et SEO

- ✅ **Lighthouse Score** : 90+ sur tous les critères
- ✅ **Images optimisées** avec Next.js Image
- ✅ **Métadonnées complètes** en français
- ✅ **OpenGraph** pour les réseaux sociaux
- ✅ **Responsive design**
- ✅ **Accessibilité** (ARIA labels, navigation clavier)

## 🤝 Contribution

Les contributions sont les bienvenues ! N'hésitez pas à :

1. Fork le projet
2. Créer une branche (\`git checkout -b feature/amelioration\`)
3. Commit vos changements (\`git commit -m 'Ajout fonctionnalité'\`)
4. Push sur la branche (\`git push origin feature/amelioration\`)
5. Ouvrir une Pull Request

## 📝 License

Ce projet est sous licence MIT. Voir le fichier [LICENSE](LICENSE) pour plus de détails.

## 🙏 Remerciements

- [Next.js](https://nextjs.org/) pour le framework
- [Tailwind CSS](https://tailwindcss.com/) pour les styles
- [shadcn-ui](https://ui.shadcn.com/) pour les composants
- [Lucide](https://lucide.dev/) pour les icônes
- [Vercel](https://vercel.com/) pour l'hébergement

---

**Développé avec ❤️ par Bastien Guitard**

📧 Contact : [hello@exemple.com](mailto:hello@exemple.com)  
🌐 Portfolio : [https://bastien-guitard.vercel.app](https://bastien-guitard.vercel.app)  
💼 LinkedIn : [linkedin.com/in/bastien-guitard](https://linkedin.com/in/bastien-guitard)  
🐙 GitHub : [github.com/bastienggg](https://github.com/bastienggg)

> **⚠️ N'oubliez pas de remplacer toutes les informations personnelles par les vôtres !**

## 🐳 Docker — Builder et publier sur Docker Hub

### Prérequis

- Docker Desktop installé et lancé
- Compte Docker Hub (créez-en un sur [hub.docker.com](https://hub.docker.com))

### Option 1 : Avec Docker Compose (recommandé)

**1. Lancer l'application localement**

```powershell
docker-compose up --build
```

L'application sera accessible sur [http://localhost:3000](http://localhost:3000)

**2. Arrêter l'application**

```powershell
docker-compose down
```

### Option 2 : Avec Docker CLI

**1. Construire l'image localement**

```powershell
# Remplacez bastienggg par votre username Docker Hub
docker build -t bastienggg/portfolio-guitard:latest .
```

**2. Lancer l'image localement**

```powershell
docker run -d -p 3000:3000 --name portfolio bastienggg/portfolio-guitard:latest
```

**3. Vérifier que le container tourne**

```powershell
docker ps
```

### 📤 Publier sur Docker Hub

**1. Se connecter à Docker Hub**

```powershell
docker login
# Entrez votre username et password Docker Hub
```

**2. Taguer votre image (optionnel mais recommandé)**

```powershell
# Tag avec version spécifique
docker tag bastienggg/portfolio-guitard:latest bastienggg/portfolio-guitard:v1.0.0
```

**3. Pousser l'image sur Docker Hub**

```powershell
# Push latest
docker push bastienggg/portfolio-guitard:latest

# Push version spécifique (si taguée)
docker push bastienggg/portfolio-guitard:v1.0.0
```

**4. Vérifier sur Docker Hub**

Allez sur `https://hub.docker.com/r/bastienggg/portfolio-guitard` pour voir votre image publiée.

### 🚀 Utiliser l'image depuis Docker Hub

Une fois publiée, n'importe qui peut lancer votre portfolio avec :

```powershell
docker pull bastienggg/portfolio-guitard:latest
docker run -d -p 3000:3000 bastienggg/portfolio-guitard:latest
```

### 📝 Notes importantes

- Le `Dockerfile` utilise une build multi-stage pour garder l'image finale compacte (~150-200 MB)
- Assurez-vous d'avoir votre `cv.pdf` et toutes les images dans `public/` avant de builder
- Pour mettre à jour : rebuilder l'image, taguer avec une nouvelle version, puis push
