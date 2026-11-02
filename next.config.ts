import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Build autonome (server.js + deps minimales) pour l'image Docker
  output: "standalone",
  // L'ancienne adresse du portfolio renvoie vers l'accueil
  async redirects() {
    return [{ source: "/portfolio3d", destination: "/", permanent: true }];
  },
};

export default nextConfig;
