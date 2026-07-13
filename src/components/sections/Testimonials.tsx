"use client";

import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { testimonials, type Testimonial } from "@/lib/constants";

function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <blockquote className="flex w-[320px] shrink-0 flex-col rounded-2xl border border-[var(--nero-border)] bg-[var(--nero-surface)] p-6 transition-colors duration-300 hover:border-[var(--nero-border-strong)] sm:w-[400px] sm:p-7">
      <p className="flex-1 text-sm leading-relaxed text-[var(--nero-text-muted)] sm:text-base">
        &ldquo;{testimonial.quote}&rdquo;
      </p>
      <footer className="mt-6 flex items-center gap-3 border-t border-[var(--nero-border)] pt-6">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-[var(--nero-accent)]/20 to-[var(--nero-violet)]/20 text-xs font-semibold text-[var(--nero-accent-bright)]">
          {testimonial.initials}
        </div>
        <div>
          <cite className="text-sm font-medium not-italic">
            {testimonial.author}
          </cite>
          <p className="text-xs text-[var(--nero-text-subtle)]">
            {testimonial.role}, {testimonial.company}
          </p>
        </div>
      </footer>
    </blockquote>
  );
}

function MarqueeRow({
  items,
  duration,
  reverse = false,
}: {
  items: Testimonial[];
  duration: string;
  reverse?: boolean;
}) {
  // Duplicate the row so translateX(-50%) loops seamlessly.
  const row = [...items, ...items];

  return (
    <div className="marquee-paused mask-fade-x relative flex overflow-hidden">
      <div
        className="animate-marquee flex w-max gap-5 pr-5"
        style={
          {
            "--marquee-duration": duration,
            animationDirection: reverse ? "reverse" : "normal",
          } as React.CSSProperties
        }
      >
        {row.map((testimonial, i) => (
          <TestimonialCard
            key={`${testimonial.author}-${i}`}
            testimonial={testimonial}
          />
        ))}
      </div>
    </div>
  );
}

export function Testimonials() {
  const mid = Math.ceil(testimonials.length / 2);
  const rowOne = testimonials.slice(0, mid);
  const rowTwo = testimonials.slice(mid);

  return (
    <section className="overflow-hidden py-20 sm:py-28 lg:py-32">
      <Container>
        <AnimatedSection variant="fade">
          <SectionHeading
            badge="Testimonials"
            title="Loved by teams who ship"
            description="From fast-growing startups to enterprise leaders, teams trust Nero to power their most important work."
          />
        </AnimatedSection>
      </Container>

      <div className="mt-16 flex flex-col gap-5">
        <MarqueeRow items={rowOne} duration="52s" />
        <MarqueeRow items={rowTwo} duration="46s" reverse />
      </div>
    </section>
  );
}
