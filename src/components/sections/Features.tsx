"use client";

import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { TiltCard } from "@/components/ui/TiltCard";
import { features } from "@/lib/constants";

export function Features() {
  return (
    <section id="features" className="py-20 sm:py-28 lg:py-32">
      <Container>
        <AnimatedSection variant="blur">
          <SectionHeading
            badge="Features"
            title="Everything your team needs to move faster"
            description="Purpose-built AI tools that integrate seamlessly into your existing workflow—no steep learning curve required."
          />
        </AnimatedSection>

        <RevealGroup
          stagger={0.08}
          className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5"
        >
          {features.map((feature) => (
            <RevealItem key={feature.title} variant="up">
              <TiltCard tilt={5} drift={5} className="p-6 text-center sm:p-7 sm:text-left">
                <div className="mx-auto mb-5 flex h-11 w-11 items-center justify-center rounded-xl bg-[var(--nero-accent)]/10 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:bg-[var(--nero-accent)]/20 sm:mx-0">
                  <feature.icon className="h-5 w-5 text-[var(--nero-accent)] transition-transform duration-300 ease-out group-hover:scale-110 group-hover:rotate-6" />
                </div>
                <h3 className="text-lg font-semibold tracking-tight">
                  {feature.title}
                </h3>
                <p className="mt-2.5 text-sm leading-relaxed text-[var(--nero-text-muted)]">
                  {feature.description}
                </p>
              </TiltCard>
            </RevealItem>
          ))}
        </RevealGroup>
      </Container>
    </section>
  );
}
