"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { LoadingScreen } from "@/components/portfolio3d/ui/LoadingScreen";

export default function Home() {
  const router = useRouter();
  const [dots, setDots] = useState("");

  useEffect(() => {
    // Animation des points
    const dotsInterval = setInterval(() => {
      setDots((prev) => (prev.length >= 3 ? "" : prev + "."));
    }, 500);

    // Redirection après 1.5 secondes
    const redirectTimer = setTimeout(() => {
      router.push("/portfolio3d");
    }, 1500);

    return () => {
      clearInterval(dotsInterval);
      clearTimeout(redirectTimer);
    };
  }, [router]);

  return <LoadingScreen dots={dots} />;
}
