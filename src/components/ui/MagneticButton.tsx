"use client";

import { useRef } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useReducedMotion,
} from "framer-motion";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

type MagneticButtonProps = {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  className?: string;
  /** Strength of the magnetic pull (0-1). */
  strength?: number;
  withArrow?: boolean;
};

/**
 * Premium CTA button: magnetic cursor pull, shimmer sweep, pulsing glow,
 * a background ripple on hover and an arrow that slides right.
 */
export function MagneticButton({
  children,
  href,
  onClick,
  className,
  strength = 0.35,
  withArrow = true,
}: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 200, damping: 15, mass: 0.4 });
  const springY = useSpring(y, { stiffness: 200, damping: 15, mass: 0.4 });

  const handleMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (prefersReducedMotion) return;
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const relX = e.clientX - (rect.left + rect.width / 2);
    const relY = e.clientY - (rect.top + rect.height / 2);
    x.set(relX * strength);
    y.set(relY * strength);
  };

  const reset = () => {
    x.set(0);
    y.set(0);
  };

  const inner = (
    <>
      {/* pulsing glow */}
      <span className="animate-pulse-glow pointer-events-none absolute -inset-2 rounded-full bg-[var(--nero-accent)]/40 blur-xl" />

      {/* background ripple on hover */}
      <span className="pointer-events-none absolute inset-0 scale-0 rounded-full bg-white/10 transition-transform duration-500 ease-out group-hover:scale-100" />

      {/* shimmer sweep */}
      <span className="pointer-events-none absolute inset-0 overflow-hidden rounded-full">
        <span className="absolute inset-y-0 -left-1/2 w-1/3 -translate-x-full bg-gradient-to-r from-transparent via-black/25 to-transparent opacity-0 group-hover:animate-[shimmer_1.1s_ease-in-out] group-hover:opacity-100" />
      </span>

      <span className="relative z-10 flex items-center gap-2">
        {children}
        {withArrow && (
          <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
        )}
      </span>
    </>
  );

  const classes = cn(
    "group relative inline-flex items-center justify-center rounded-full bg-white px-8 py-3.5 text-base font-medium text-[var(--nero-bg)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--nero-accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--nero-bg)]",
    className
  );

  return (
    <motion.div
      ref={ref}
      onPointerMove={handleMove}
      onPointerLeave={reset}
      style={{ x: springX, y: springY }}
      className="inline-block"
    >
      {href ? (
        <a href={href} className={classes}>
          {inner}
        </a>
      ) : (
        <button type="button" onClick={onClick} className={classes}>
          {inner}
        </button>
      )}
    </motion.div>
  );
}
