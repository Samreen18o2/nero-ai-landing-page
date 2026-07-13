"use client";

import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";
import { EASE, revealVariants, type RevealVariant } from "@/lib/motion";

type AnimatedSectionProps = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  id?: string;
  /** Which reveal motion to use. Defaults to a gentle fade-up. */
  variant?: RevealVariant;
  as?: "section" | "div" | "li";
};

export function AnimatedSection({
  children,
  className,
  delay = 0,
  duration = 0.7,
  id,
  variant = "up",
  as = "section",
}: AnimatedSectionProps) {
  const prefersReducedMotion = useReducedMotion();
  const MotionTag = motion[as];

  if (prefersReducedMotion) {
    const Tag = as;
    return (
      <Tag id={id} className={cn(className)}>
        {children}
      </Tag>
    );
  }

  return (
    <MotionTag
      id={id}
      className={cn(className)}
      variants={revealVariants[variant]}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration, delay, ease: EASE }}
    >
      {children}
    </MotionTag>
  );
}
