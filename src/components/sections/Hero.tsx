"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Play } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { WordReveal } from "@/components/ui/WordReveal";
import { HeroBackground } from "./HeroBackground";
import { FloatingDashboard } from "@/components/dashboard/FloatingDashboard";
import { EASE_OUT } from "@/lib/motion";

export function Hero() {
  const prefersReducedMotion = useReducedMotion();

  const fadeIn = (delay: number) =>
    prefersReducedMotion
      ? { initial: false as const }
      : {
          initial: { opacity: 0, y: 20 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.9, delay, ease: EASE_OUT },
        };

  return (
    <section className="relative overflow-hidden pt-28 pb-16 sm:pt-36 sm:pb-24 lg:pt-40 lg:pb-32">
      <HeroBackground />

      <Container className="relative">
        <div className="mx-auto max-w-4xl text-center">
          <motion.div {...fadeIn(0.1)}>
            <Badge className="mb-6">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              Now in public beta
            </Badge>
          </motion.div>

          <WordReveal
            as="h1"
            text="The AI workspace [[built]] [[for]] [[how]] [[you]] [[work]]"
            delay={0.25}
            stagger={0.09}
            className="text-4xl font-semibold tracking-tight sm:text-5xl lg:text-7xl lg:leading-[1.08]"
          />

          <motion.p
            className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-[var(--nero-text-muted)] sm:text-lg lg:text-xl"
            {...fadeIn(1.0)}
          >
            Nero connects your tools, understands your context, and automates
            the work that slows your team down. Ship faster with intelligence
            that actually gets it.
          </motion.p>

          <motion.div
            className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4"
            {...fadeIn(1.2)}
          >
            <MagneticButton href="#pricing">Start for free</MagneticButton>
            <Button variant="secondary" size="lg" href="#product">
              <Play className="h-4 w-4" />
              Watch demo
            </Button>
          </motion.div>
        </div>

        <motion.div
          className="relative mx-auto mt-20 max-w-5xl sm:mt-28"
          initial={prefersReducedMotion ? false : { opacity: 0, y: 60, scale: 0.94 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1.1, delay: 0.6, ease: EASE_OUT }}
        >
          <FloatingDashboard />
        </motion.div>
      </Container>
    </section>
  );
}
