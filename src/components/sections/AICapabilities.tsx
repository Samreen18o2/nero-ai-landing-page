"use client";

import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { TiltCard } from "@/components/ui/TiltCard";
import { aiCapabilities } from "@/lib/constants";

export function AICapabilities() {
  return (
    <section id="capabilities" className="py-20 sm:py-28 lg:py-32">
      <Container>
        <AnimatedSection variant="up">
          <SectionHeading
            badge="AI Capabilities"
            title="Ask for it. Nero just does it."
            description="Real examples of the work Nero takes off your plate every day—no prompt engineering degree required."
          />
        </AnimatedSection>

        <RevealGroup
          stagger={0.08}
          className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5"
        >
          {aiCapabilities.map((cap) => (
            <RevealItem key={cap.title} variant="up">
              <TiltCard tilt={4} drift={4} className="flex h-full flex-col p-6 sm:p-7">
                <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl bg-[var(--nero-accent)]/10 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:bg-[var(--nero-accent)]/20">
                  <cap.icon className="h-5 w-5 text-[var(--nero-accent)] transition-transform duration-300 ease-out group-hover:scale-110" />
                </div>
                <h3 className="text-lg font-semibold tracking-tight">
                  {cap.title}
                </h3>
                <p className="mt-3 border-l-2 border-[var(--nero-accent)]/40 pl-3 text-sm leading-relaxed text-[var(--nero-text-muted)] italic">
                  {cap.example}
                </p>
              </TiltCard>
            </RevealItem>
          ))}
        </RevealGroup>
      </Container>
    </section>
  );
}
