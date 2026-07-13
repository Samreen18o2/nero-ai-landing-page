"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { howItWorksSteps } from "@/lib/constants";

export function HowItWorks() {
  const timelineRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start 75%", "center 45%"],
  });
  const progress = useSpring(scrollYProgress, {
    stiffness: 70,
    damping: 22,
    restDelta: 0.001,
  });

  return (
    <section
      id="how-it-works"
      className="border-y border-[var(--nero-border)] bg-[var(--nero-bg-elevated)] py-20 sm:py-28 lg:py-32"
    >
      <Container>
        <AnimatedSection variant="up">
          <SectionHeading
            badge="How it works"
            title="Up and running in minutes"
            description="No complex setup. No months of configuration. Connect your tools and let Nero do the rest."
          />
        </AnimatedSection>

        <div ref={timelineRef} className="relative mt-16">
          {/* Desktop connecting line: faint track + scroll-filled gradient */}
          <div className="pointer-events-none absolute top-7 right-[16.67%] left-[16.67%] hidden md:block">
            <div className="h-px w-full bg-[var(--nero-border-strong)] opacity-40" />
            <motion.div
              className="absolute inset-x-0 top-0 h-px origin-left bg-gradient-to-r from-[var(--nero-accent)] to-[var(--nero-violet)]"
              style={{ scaleX: progress }}
            />
          </div>

          <RevealGroup
            stagger={0.14}
            className="grid gap-8 md:grid-cols-3 md:gap-6 lg:gap-10"
          >
            {howItWorksSteps.map((step) => (
              <RevealItem key={step.step} variant="up">
                <div className="relative text-center md:text-left">
                  <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-2xl border border-[var(--nero-border)] bg-[var(--nero-surface)] font-mono text-sm font-medium text-[var(--nero-accent)] shadow-[0_0_0_0_rgba(129,140,248,0)] transition-shadow duration-500 hover:shadow-[0_0_24px_-4px_rgba(129,140,248,0.5)] md:mx-0">
                    {step.step}
                  </div>
                  <h3 className="text-lg font-semibold tracking-tight">
                    {step.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-[var(--nero-text-muted)]">
                    {step.description}
                  </p>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </Container>
    </section>
  );
}
