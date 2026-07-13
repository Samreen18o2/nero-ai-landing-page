"use client";

import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";
import {
  EASE,
  revealVariants,
  staggerContainer,
  type RevealVariant,
} from "@/lib/motion";

type RevealGroupProps = {
  children: React.ReactNode;
  className?: string;
  stagger?: number;
  delayChildren?: number;
  as?: "div" | "ul" | "section";
};

/** Parent that staggers its RevealItem children into view once. */
export function RevealGroup({
  children,
  className,
  stagger = 0.1,
  delayChildren = 0,
  as = "div",
}: RevealGroupProps) {
  const prefersReducedMotion = useReducedMotion();
  const MotionTag = motion[as];

  if (prefersReducedMotion) {
    const Tag = as;
    return <Tag className={cn(className)}>{children}</Tag>;
  }

  return (
    <MotionTag
      className={cn(className)}
      variants={staggerContainer(stagger, delayChildren)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-80px" }}
    >
      {children}
    </MotionTag>
  );
}

type RevealItemProps = {
  children: React.ReactNode;
  className?: string;
  variant?: RevealVariant;
  duration?: number;
  as?: "div" | "li";
};

/** Child of RevealGroup — inherits the stagger timing from its parent. */
export function RevealItem({
  children,
  className,
  variant = "up",
  duration = 0.7,
  as = "div",
}: RevealItemProps) {
  const prefersReducedMotion = useReducedMotion();
  const MotionTag = motion[as];

  if (prefersReducedMotion) {
    const Tag = as;
    return <Tag className={cn(className)}>{children}</Tag>;
  }

  return (
    <MotionTag
      className={cn(className)}
      variants={revealVariants[variant]}
      transition={{ duration, ease: EASE }}
    >
      {children}
    </MotionTag>
  );
}
