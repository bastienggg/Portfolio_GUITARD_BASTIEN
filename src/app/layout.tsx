import type { Metadata } from "next";
import { Schoolbell, Shadows_Into_Light } from "next/font/google";
import "./globals.css";
import CustomCursor from "@/components/CustomCursor";

const schoolbell = Schoolbell({
  variable: "--font-schoolbell",
  subsets: ["latin"],
  weight: ["400"],
});

const shadowsIntoLight = Shadows_Into_Light({
  variable: "--font-shadows",
  subsets: ["latin"],
  weight: ["400"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://bastienguitard.fr"),
  title: {
    default:
      "Bastien Guitard - Développeur Full-Stack & Créatif | Portfolio 3D",
    template: "%s | Bastien Guitard",
  },
  description:
    "Portfolio interactif 3D de Bastien Guitard, développeur full-stack passionné par les expériences web immersives. Étudiant BUT MMI, spécialisé en React, Next.js, Three.js, Node.js et développement créatif.",
  keywords: [
    "Bastien Guitard",
    "développeur full-stack",
    "portfolio 3D",
    "React",
    "Next.js",
    "Three.js",
    "TypeScript",
    "Node.js",
    "développement web",
    "BUT MMI",
    "développeur créatif",
    "WebGL",
    "expérience interactive",
    "système solaire 3D",
    "Dot TXT",
    "Let Him Quizz",
  ],
  authors: [{ name: "Bastien Guitard", url: "https://bastienguitard.fr" }],
  creator: "Bastien Guitard",
  publisher: "Bastien Guitard",
  alternates: {
    canonical: "https://bastienguitard.fr",
  },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: "https://bastienguitard.fr",
    title: "Bastien Guitard - Développeur Full-Stack & Créatif | Portfolio 3D",
    description:
      "Explorez mon univers de développeur full-stack à travers un portfolio 3D interactif. Découvrez mes projets web innovants : Dot TXT, Let Him Quizz et plus encore.",
    siteName: "Bastien Guitard - Portfolio",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Bastien Guitard - Portfolio 3D Interactif",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Bastien Guitard - Développeur Full-Stack & Créatif",
    description:
      "Portfolio 3D interactif avec système solaire. Découvrez mes projets web innovants.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    // Ajouter Google Search Console verification code ici si disponible
    // google: 'ton-code-verification',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // JSON-LD Schema pour SEO
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Bastien Guitard",
    jobTitle: "Développeur Full-Stack",
    description:
      "Développeur full-stack et créatif, étudiant en 3ème année BUT MMI",
    url: "https://bastienguitard.fr",
    sameAs: [
      "https://github.com/bastienggg",
      "https://www.linkedin.com/in/bastien-guitard-30585329b/",
    ],
    knowsAbout: [
      "React",
      "Next.js",
      "TypeScript",
      "Node.js",
      "Three.js",
      "WebGL",
      "Développement Web",
      "Développement Full-Stack",
    ],
  };

  return (
    <html lang="fr">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#F7F7E1" />
        <meta
          name="apple-mobile-web-app-status-bar-style"
          content="black-translucent"
        />
        <meta name="msapplication-navbutton-color" content="#F7F7E1" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
      </head>
      <body
        className={`${schoolbell.variable} ${shadowsIntoLight.variable} min-h-screen bg-background font-sans antialiased`}
      >
        <CustomCursor />
        {children}
      </body>
    </html>
  );
}
