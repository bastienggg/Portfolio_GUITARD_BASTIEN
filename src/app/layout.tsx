import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Bastien Guitard - Développeur Fullstack",
    template: "%s | Bastien Guitard",
  },
  description:
    "Portfolio de Bastien Guitard, développeur fullstack et étudiant en 3ᵉ année BUT MMI. Découvrez mes projets de développement web et dispositifs interactifs.",
  keywords: [
    "développeur",
    "fullstack",
    "React",
    "Next.js",
    "TypeScript",
    "portfolio",
    "BUT MMI",
    "web",
    "interactif",
  ],
  authors: [{ name: "Bastien Guitard" }],
  creator: "Bastien Guitard",
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: "https://bastien-guitard.vercel.app",
    title: "Bastien Guitard - Développeur Fullstack",
    description:
      "Portfolio de Bastien Guitard, développeur fullstack et étudiant en 3ᵉ année BUT MMI.",
    siteName: "Bastien Guitard Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Bastien Guitard - Développeur Fullstack",
    description:
      "Portfolio de Bastien Guitard, développeur fullstack et étudiant en 3ᵉ année BUT MMI.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body
        className={`${geistSans.variable} ${geistMono.variable} min-h-screen bg-background font-sans antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
