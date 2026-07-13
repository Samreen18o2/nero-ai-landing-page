import type { Variants, Transition } from "framer-motion";

/** Signature easing used across the site — a refined ease-out. */
export const EASE = [0.21, 0.47, 0.32, 0.98] as const;
export const EASE_OUT = [0.16, 1, 0.3, 1] as const;

export const baseTransition: Transition = {
  duration: 0.7,
  ease: EASE,
};

export type RevealVariant =
  | "up"
  | "down"
  | "left"
  | "right"
  | "scale"
  | "fade"
  | "blur";

const distance = 40;

export const revealVariants: Record<RevealVariant, Variants> = {
  up: {
    hidden: { opacity: 0, y: distance },
    show: { opacity: 1, y: 0 },
  },
  down: {
    hidden: { opacity: 0, y: -distance },
    show: { opacity: 1, y: 0 },
  },
  left: {
    hidden: { opacity: 0, x: -distance },
    show: { opacity: 1, x: 0 },
  },
  right: {
    hidden: { opacity: 0, x: distance },
    show: { opacity: 1, x: 0 },
  },
  scale: {
    hidden: { opacity: 0, scale: 0.94 },
    show: { opacity: 1, scale: 1 },
  },
  fade: {
    hidden: { opacity: 0 },
    show: { opacity: 1 },
  },
  blur: {
    hidden: { opacity: 0, filter: "blur(10px)", y: 16 },
    show: { opacity: 1, filter: "blur(0px)", y: 0 },
  },
};

/** Container that staggers its children into view. */
export const staggerContainer = (
  stagger = 0.08,
  delayChildren = 0
): Variants => ({
  hidden: {},
  show: {
    transition: {
      staggerChildren: stagger,
      delayChildren,
    },
  },
});

/** Word/line reveal used for cinematic headings. */
export const wordVariants: Variants = {
  hidden: { opacity: 0, y: "0.6em" },
  show: {
    opacity: 1,
    y: "0em",
    transition: { duration: 0.7, ease: EASE_OUT },
  },
};
