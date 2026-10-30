import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // L'ancienne adresse du portfolio renvoie vers l'accueil
  async redirects() {
    return [{ source: "/portfolio3d", destination: "/", permanent: true }];
  },
};

export default nextConfig;
