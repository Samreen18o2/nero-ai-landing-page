"use client";

import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";
import { wordVariants, staggerContainer } from "@/lib/motion";

type WordRevealProps = {
  text: string;
  className?: string;
  /** Words wrapped in [[ ]] receive the gradient-text treatment. */
  delay?: number;
  stagger?: number;
  as?: "h1" | "h2" | "h3" | "span";
};

/**
 * Reveals a heading word-by-word with a staggered rise. Markers of the form
 * [[word]] are rendered with the brand gradient.
 */
export function WordReveal({
  text,
  className,
  delay = 0,
  stagger = 0.08,
  as = "h1",
}: WordRevealProps) {
  const prefersReducedMotion = useReducedMotion();
  const words = text.split(" ");
  const MotionTag = motion[as];

  if (prefersReducedMotion) {
    const Tag = as;
    return (
      <Tag className={className}>
        {words.map((word, i) => {
          const gradient = word.startsWith("[[") && word.endsWith("]]");
          const clean = gradient ? word.slice(2, -2) : word;
          return (
            <span key={i} className={gradient ? "gradient-text" : undefined}>
              {clean}
              {i < words.length - 1 ? " " : ""}
            </span>
          );
        })}
      </Tag>
    );
  }

  return (
    <MotionTag
      className={cn(className)}
      variants={staggerContainer(stagger, delay)}
      initial="hidden"
      animate="show"
    >
      {words.map((word, i) => {
        const gradient = word.startsWith("[[") && word.endsWith("]]");
        const clean = gradient ? word.slice(2, -2) : word;
        return (
          <span
            key={i}
            className="inline-block overflow-hidden align-bottom"
            style={{ paddingBottom: "0.06em" }}
          >
            <motion.span
              variants={wordVariants}
              className={cn("inline-block", gradient && "gradient-text")}
            >
              {clean}
              {i < words.length - 1 ? "\u00A0" : ""}
            </motion.span>
          </span>
        );
      })}
    </MotionTag>
  );
}
