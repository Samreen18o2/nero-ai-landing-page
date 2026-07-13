"use client";

import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { Container } from "@/components/ui/Container";
import { trustedCompanies } from "@/lib/constants";

export function TrustedBy() {
  // Two identical halves so translateX(-50%) loops seamlessly.
  const half = [...trustedCompanies, ...trustedCompanies];
  const row = [...half, ...half];

  return (
    <AnimatedSection
      variant="fade"
      className="border-y border-[var(--nero-border)] py-12 sm:py-16"
    >
      <Container>
        <p className="mb-8 text-center text-sm font-medium tracking-wide text-[var(--nero-text-subtle)] uppercase">
          Trusted by teams at
        </p>
      </Container>

      <div className="marquee-paused mask-fade-x relative flex overflow-hidden">
        <div
          className="animate-marquee flex w-max items-center gap-x-14 pr-14 sm:gap-x-20 sm:pr-20"
          style={{ "--marquee-duration": "38s" } as React.CSSProperties}
        >
          {row.map((company, i) => (
            <span
              key={`${company}-${i}`}
              className="text-lg font-semibold tracking-tight whitespace-nowrap text-[var(--nero-text-subtle)] opacity-60 transition-opacity duration-300 hover:opacity-100 sm:text-xl"
            >
              {company}
            </span>
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
}
