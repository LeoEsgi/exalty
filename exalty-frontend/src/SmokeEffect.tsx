import React, { useEffect, useState } from "react";
import { useCallback } from "react";

import type { Container, Engine } from "tsparticles-engine";
import Particles from "react-particles";
import { loadSlim } from "tsparticles-slim";
import { loadImageShape } from "tsparticles-shape-image";
import smoke from "./asset/smoke/smoke10.png"; // Assurez-vous que le chemin vers l'image est correct

function SmokeEffect() {
  const [width, setWidth] = useState<number>(window.innerWidth);

  function handleWindowSizeChange() {
    setWidth(window.innerWidth);
  }
  useEffect(() => {
    window.addEventListener("resize", handleWindowSizeChange);
    return () => {
      window.removeEventListener("resize", handleWindowSizeChange);
    };
  }, []);

  const isMobile = width <= 768;

  const particlesInit = useCallback(async (engine: Engine) => {
    // Charger les configurations nécessaires pour les particules
    await loadSlim(engine);
    // Charger le shape personnalisé pour les particules
    await loadImageShape(engine);
  }, []);

  const particlesLoaded = useCallback(
    async (container: Container | undefined) => {
      console.log(container);
    },
    []
  );

  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      loaded={particlesLoaded}
      options={{
        background: {
          color: {
            value: "transparent",
          },
        },
        fpsLimit: 60,
        particles: {
          shape: {
            type: "image",
            image: {
              src: smoke,
              width: 100,
              height: 100,
            },
          },

          move: {
            direction: "bottom",
            enable: true,
            outModes: {
              default: "out",
            },
            speed: 2,
          },
          size: {
            value: 300,
          },
          opacity: {
            value: 0.1,
            random: true,
          },
          number: {
            density: {
              enable: true,
              area: 800,
            },
            value: isMobile ? 50 : 100,
          },
        },
        interactivity: {
          events: {
            onClick: {
              enable: true,
              mode: "push",
            },
            onHover: {
              enable: true,
              mode: "repulse",
            },
            resize: true,
          },
        },
        detectRetina: true,
      }}
    />
  );
}

export default SmokeEffect;
