"use client";

import { useRef } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useMotionTemplate,
  useReducedMotion,
} from "framer-motion";
import { cn } from "@/lib/utils";

type TiltCardProps = {
  children: React.ReactNode;
  className?: string;
  /** Max tilt in degrees. */
  tilt?: number;
  /** Pixels the card drifts toward the cursor. */
  drift?: number;
  glow?: boolean;
  lift?: number;
};

/**
 * A card that tilts toward the cursor, drifts slightly, reveals an animated
 * border and a glow that tracks the pointer. All effects are disabled for
 * reduced-motion and coarse-pointer (touch) users.
 */
export function TiltCard({
  children,
  className,
  tilt = 5,
  drift = 6,
  glow = true,
  lift = 6,
}: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);

  const spring = { stiffness: 150, damping: 18, mass: 0.3 };
  const rotateX = useSpring(useTransform(py, [0, 1], [tilt, -tilt]), spring);
  const rotateY = useSpring(useTransform(px, [0, 1], [-tilt, tilt]), spring);
  const translateX = useSpring(useTransform(px, [0, 1], [-drift, drift]), spring);
  const translateY = useSpring(useTransform(py, [0, 1], [-drift, drift]), spring);

  const glowX = useTransform(px, (v) => `${v * 100}%`);
  const glowY = useTransform(py, (v) => `${v * 100}%`);
  const glowBg = useMotionTemplate`radial-gradient(220px circle at ${glowX} ${glowY}, rgba(129,140,248,0.16), transparent 70%)`;

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    px.set((e.clientX - rect.left) / rect.width);
    py.set((e.clientY - rect.top) / rect.height);
  };

  const reset = () => {
    px.set(0.5);
    py.set(0.5);
  };

  if (prefersReducedMotion) {
    return (
      <div
        className={cn(
          "group relative h-full rounded-2xl border border-[var(--nero-border)] bg-[var(--nero-surface)] transition-colors hover:border-[var(--nero-border-strong)]",
          className
        )}
      >
        {children}
      </div>
    );
  }

  return (
    <motion.div
      ref={ref}
      onPointerMove={handlePointerMove}
      onPointerLeave={reset}
      style={{ rotateX, rotateY, translateX, translateY, transformPerspective: 900 }}
      whileHover={{ y: -lift }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
      className={cn(
        "group relative h-full rounded-2xl border border-[var(--nero-border)] bg-[var(--nero-surface)] [transform-style:preserve-3d]",
        className
      )}
    >
      {/* Animated gradient border on hover */}
      <span className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100">
        <span className="gradient-border absolute inset-0 rounded-2xl" />
      </span>

      {/* Cursor-tracking glow */}
      {glow && (
        <motion.span
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{ background: glowBg }}
        />
      )}

      <div className="relative h-full" style={{ transform: "translateZ(40px)" }}>
        {children}
      </div>
    </motion.div>
  );
}
