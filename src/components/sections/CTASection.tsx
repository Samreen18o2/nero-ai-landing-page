"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { EASE_OUT } from "@/lib/motion";

export function CTASection() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section className="py-20 sm:py-28">
      <Container>
        <motion.div
          className="gradient-border relative overflow-hidden rounded-3xl bg-[var(--nero-surface)] px-6 py-16 text-center sm:px-12 sm:py-20"
          initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: EASE_OUT }}
        >
          {/* Slow animated gradient wash */}
          {!prefersReducedMotion && (
            <div
              aria-hidden
              className="animate-aurora pointer-events-none absolute -inset-40 opacity-[0.18] blur-3xl"
              style={{
                background:
                  "conic-gradient(from 0deg, rgba(129,140,248,0.7), rgba(167,139,250,0.15), rgba(96,165,250,0.5), rgba(129,140,248,0.7))",
              }}
            />
          )}
          <div className="glow-orb animate-pulse-glow absolute top-0 left-1/2 h-[300px] w-[500px] -translate-x-1/2 bg-[var(--nero-accent)] opacity-20" />
          <div className="noise-layer" />

          <div className="relative">
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">
              Ready to transform
              <br />
              <span className="gradient-text">how your team works?</span>
            </h2>
            <p className="mx-auto mt-4 max-w-lg text-base text-[var(--nero-text-muted)] sm:text-lg">
              Join 50,000+ teams already using Nero to automate workflows,
              unify their stack, and ship with confidence.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
              <MagneticButton href="#pricing">Get started for free</MagneticButton>
              <Button variant="secondary" size="lg" href="#">
                Talk to sales
              </Button>
            </div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
