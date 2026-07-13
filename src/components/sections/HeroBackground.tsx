"use client";

import { useMemo } from "react";
import { motion, useReducedMotion } from "framer-motion";

/** Deterministic pseudo-random so SSR and client markup match. */
function seeded(seed: number) {
  let value = seed;
  return () => {
    value = (value * 9301 + 49297) % 233280;
    return value / 233280;
  };
}

export function HeroBackground() {
  const prefersReducedMotion = useReducedMotion();

  const particles = useMemo(() => {
    const rand = seeded(42);
    return Array.from({ length: 22 }, () => ({
      left: rand() * 100,
      top: rand() * 100,
      size: 1 + rand() * 2.5,
      duration: 10 + rand() * 14,
      delay: rand() * 8,
      drift: 12 + rand() * 26,
    }));
  }, []);

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* Base radial wash */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(120% 80% at 50% -10%, rgba(129,140,248,0.14), transparent 60%), radial-gradient(90% 60% at 80% 20%, rgba(167,139,250,0.10), transparent 55%)",
        }}
      />

      {/* Slowly drifting aurora conic */}
      {!prefersReducedMotion && (
        <div
          className="animate-aurora absolute top-[-30%] left-1/2 h-[70vh] w-[70vh] -translate-x-1/2 rounded-full opacity-[0.18] blur-[90px]"
          style={{
            background:
              "conic-gradient(from 0deg, rgba(129,140,248,0.7), rgba(167,139,250,0.2), rgba(96,165,250,0.5), rgba(129,140,248,0.7))",
          }}
        />
      )}

      {/* Glowing blurred circles */}
      <motion.div
        className="glow-orb absolute -top-24 left-1/3 h-[420px] w-[520px] bg-[var(--nero-accent)] opacity-25"
        animate={
          prefersReducedMotion
            ? undefined
            : { y: [0, 24, 0], x: [0, 16, 0], opacity: [0.2, 0.28, 0.2] }
        }
        transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="glow-orb absolute top-1/3 -right-24 h-[320px] w-[320px] bg-[var(--nero-violet)] opacity-15"
        animate={
          prefersReducedMotion
            ? undefined
            : { y: [0, -28, 0], x: [0, -18, 0], opacity: [0.12, 0.2, 0.12] }
        }
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Grid pattern */}
      <div className="absolute inset-0 grid-pattern" />

      {/* Floating particles */}
      {!prefersReducedMotion &&
        particles.map((p, i) => (
          <motion.span
            key={i}
            className="absolute rounded-full bg-white"
            style={{
              left: `${p.left}%`,
              top: `${p.top}%`,
              width: p.size,
              height: p.size,
            }}
            initial={{ opacity: 0 }}
            animate={{
              y: [0, -p.drift, 0],
              opacity: [0, 0.5, 0],
            }}
            transition={{
              duration: p.duration,
              delay: p.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}

      {/* Film grain */}
      <div className="noise-layer" />

      {/* Fade to page background at the bottom */}
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-[var(--nero-bg)]" />
    </div>
  );
}
