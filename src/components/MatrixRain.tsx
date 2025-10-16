"use client";

import { useEffect, useRef } from "react";

interface MatrixRainProps {
  className?: string;
}

export default function MatrixRain({ className = "" }: MatrixRainProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Caractères qui changent pour l'effet Matrix
    const characters = [
      "A",
      "B",
      "C",
      "D",
      "E",
      "F",
      "G",
      "H",
      "I",
      "J",
      "K",
      "L",
      "M",
      "N",
      "O",
      "P",
      "Q",
      "R",
      "S",
      "T",
      "U",
      "V",
      "W",
      "X",
      "Y",
      "Z",
      "a",
      "b",
      "c",
      "d",
      "e",
      "f",
      "g",
      "h",
      "i",
      "j",
      "k",
      "l",
      "m",
      "n",
      "o",
      "p",
      "q",
      "r",
      "s",
      "t",
      "u",
      "v",
      "w",
      "x",
      "y",
      "z",
      "0",
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      "{",
      "}",
      "(",
      ")",
      "[",
      "]",
      "<",
      ">",
      "=",
      "+",
      "-",
      "*",
      "/",
      ".",
      ",",
      ";",
      ":",
      "'",
      '"',
      "?",
      "!",
      "@",
      "#",
      "$",
      "%",
      "&",
      "^",
      "*",
      "~",
      "`",
      "|",
      "\\",
      "€",
      "£",
      "¥",
      "¢",
      "§",
    ];

    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;

      // Beaucoup de colonnes pour un effet dense
      columns = Math.floor(canvas.width / 12);

      // Reinitialiser les colonnes
      matrixColumns.length = 0;
      for (let i = 0; i < columns; i++) {
        matrixColumns[i] = {
          y: Math.random() * -canvas.height,
          speed: 1 + Math.random() * 3,
          chars: [],
          active: Math.random() > 0.6, // 40% des colonnes sont actives
          fadeStart: Math.random() * canvas.height * 0.3 + canvas.height * 0.3,
          fadeEnd: Math.random() * canvas.height * 0.4 + canvas.height * 0.6,
        };

        // Initialiser les caractères de la colonne
        for (let j = 0; j < 25; j++) {
          matrixColumns[i].chars[j] =
            characters[Math.floor(Math.random() * characters.length)];
        }
      }
    };

    let columns = Math.floor(canvas.width / 12);
    const matrixColumns: Array<{
      y: number;
      speed: number;
      chars: string[];
      active: boolean;
      fadeStart: number;
      fadeEnd: number;
    }> = [];

    // Initialiser beaucoup de colonnes
    for (let i = 0; i < columns; i++) {
      matrixColumns[i] = {
        y: Math.random() * -canvas.height,
        speed: 1 + Math.random() * 3,
        chars: [],
        active: Math.random() > 0.6,
        fadeStart: Math.random() * canvas.height * 0.3 + canvas.height * 0.3,
        fadeEnd: Math.random() * canvas.height * 0.4 + canvas.height * 0.6,
      };

      for (let j = 0; j < 25; j++) {
        matrixColumns[i].chars[j] =
          characters[Math.floor(Math.random() * characters.length)];
      }
    }

    const draw = () => {
      // Fond avec effacement plus important pour réduire le flou
      ctx.fillStyle = "rgba(255, 250, 250, 0.6)"; // Encore plus d'effacement
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Font Matrix utilisant les fonts du globals.css
      ctx.font = '12px var(--font-mono), "Fira Code", "Courier New", monospace';

      for (let i = 0; i < matrixColumns.length; i++) {
        const column = matrixColumns[i];

        if (!column.active) continue;

        const x = i * 12;

        // Dessiner la colonne de caractères
        for (let j = 0; j < column.chars.length; j++) {
          const charY = column.y + j * 14;

          if (charY > 0 && charY < canvas.height + 20) {
            // Calculer l'opacité basée sur la position - beaucoup plus nette
            let opacity = 1.0; // Opacité maximale pour éliminer le flou

            // Fade out dans la zone de disparition
            if (charY > column.fadeStart && charY < column.fadeEnd) {
              const fadeProgress =
                (charY - column.fadeStart) /
                (column.fadeEnd - column.fadeStart);
              opacity = 1.0 * (1 - fadeProgress); // Fade depuis 1.0
            }
            // Disparition complète après fadeEnd
            else if (charY > column.fadeEnd) {
              opacity = 0;
            }

            // Style avec opacité plus élevée pour moins de flou
            ctx.fillStyle = `rgba(8, 8, 8, ${opacity})`;
            ctx.fillText(column.chars[j], x, charY);
          }
        }

        // Faire tomber la colonne
        column.y += column.speed;

        // Changer aléatoirement quelques caractères (effet Matrix) - plus lent
        if (Math.random() < 10.0) {
          // Réduit de 0.05 à 0.015 pour changements plus lents
          const randomIndex = Math.floor(Math.random() * column.chars.length);
          column.chars[randomIndex] =
            characters[Math.floor(Math.random() * characters.length)];
        }

        // Redémarrer la colonne si elle est complètement sortie
        if (column.y > canvas.height + column.chars.length * 14) {
          column.y = Math.random() * -canvas.height;
          column.active = Math.random() > 0.6; // 40% de chance d'être active
          column.fadeStart =
            Math.random() * canvas.height * 0.3 + canvas.height * 0.3;
          column.fadeEnd =
            Math.random() * canvas.height * 0.4 + canvas.height * 0.6;
          column.speed = 1 + Math.random() * 3;
        }
      }
    };

    // Redimensionner le canvas
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Démarrer l'animation avec une vitesse modérée pour un effet visible
    const interval = setInterval(draw, 80); // Plus rapide pour plus de visibilité

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      clearInterval(interval);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 pointer-events-none ${className}`}
      style={{
        width: "100%",
        height: "100%",
        zIndex: 0,
      }}
    />
  );
}
