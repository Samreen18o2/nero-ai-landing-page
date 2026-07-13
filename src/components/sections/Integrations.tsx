"use client";

import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { integrations } from "@/lib/constants";

export function Integrations() {
  return (
    <section
      id="integrations"
      className="border-y border-[var(--nero-border)] bg-[var(--nero-bg-elevated)] py-20 sm:py-28 lg:py-32"
    >
      <Container>
        <AnimatedSection variant="up">
          <SectionHeading
            badge="Integrations"
            title="Works with the tools you already use"
            description="Nero plugs into your stack in minutes—messaging, docs, code, storage, and more—so your context lives in one place."
          />
        </AnimatedSection>

        <RevealGroup
          stagger={0.05}
          className="mt-16 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 lg:gap-4"
        >
          {integrations.map((tool) => (
            <RevealItem key={tool.name} variant="scale">
              <div className="group relative flex items-center gap-3 overflow-hidden rounded-2xl border border-[var(--nero-border)] bg-[var(--nero-surface)] p-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-[var(--nero-border-strong)] sm:p-5">
                <span
                  aria-hidden
                  className="pointer-events-none absolute -right-6 -top-6 h-20 w-20 rounded-full bg-[var(--nero-accent)]/10 opacity-0 blur-2xl transition-opacity duration-300 group-hover:opacity-100"
                />
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-[var(--nero-border)] bg-white/[0.03] transition-colors duration-300 group-hover:border-[var(--nero-accent)]/40">
                  <tool.icon className="h-5 w-5 text-[var(--nero-accent)]" />
                </div>
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium text-[var(--nero-text)]">
                    {tool.name}
                  </p>
                  <p className="truncate text-xs text-[var(--nero-text-subtle)]">
                    {tool.category}
                  </p>
                </div>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>

        <AnimatedSection variant="fade" as="div" delay={0.1}>
          <p className="mt-10 text-center text-sm text-[var(--nero-text-subtle)]">
            Plus a robust API and{" "}
            <span className="font-medium text-[var(--nero-text-muted)]">
              50+ more
            </span>{" "}
            integrations—with new ones added every week.
          </p>
        </AnimatedSection>
      </Container>
    </section>
  );
}
