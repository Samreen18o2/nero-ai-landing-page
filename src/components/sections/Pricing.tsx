"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check } from "lucide-react";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { TiltCard } from "@/components/ui/TiltCard";
import { pricingPlans, type PricingPlan } from "@/lib/constants";
import { EASE, staggerContainer, revealVariants } from "@/lib/motion";
import { cn } from "@/lib/utils";

const DESKTOP_QUERY = "(min-width: 1024px)";

type Billing = "monthly" | "yearly";

function BillingToggle({
  billing,
  onChange,
}: {
  billing: Billing;
  onChange: (b: Billing) => void;
}) {
  const options: { id: Billing; label: string }[] = [
    { id: "monthly", label: "Monthly" },
    { id: "yearly", label: "Yearly" },
  ];

  return (
    <div className="mt-8 flex items-center justify-center gap-3">
      <div className="relative flex rounded-full border border-[var(--nero-border)] bg-[var(--nero-surface)] p-1">
        {options.map((option) => {
          const active = billing === option.id;
          return (
            <button
              key={option.id}
              type="button"
              onClick={() => onChange(option.id)}
              aria-pressed={active}
              className={cn(
                "relative z-10 rounded-full px-5 py-2 text-sm font-medium transition-colors duration-300",
                active
                  ? "text-white"
                  : "text-[var(--nero-text-muted)] hover:text-[var(--nero-text)]"
              )}
            >
              {active && (
                <motion.span
                  layoutId="billing-pill"
                  className="absolute inset-0 -z-10 rounded-full bg-gradient-to-r from-[var(--nero-accent)] to-[var(--nero-violet)]"
                  transition={{ type: "spring", stiffness: 320, damping: 30 }}
                />
              )}
              {option.label}
            </button>
          );
        })}
      </div>
      <span className="rounded-full border border-[var(--nero-accent)]/30 bg-[var(--nero-accent)]/10 px-2.5 py-1 text-xs font-medium text-[var(--nero-accent-bright)]">
        Save 20%
      </span>
    </div>
  );
}

function PlanCard({ plan, billing }: { plan: PricingPlan; billing: Billing }) {
  const price = billing === "yearly" ? plan.yearlyPrice : plan.monthlyPrice;
  const showBilledYearly =
    billing === "yearly" && !plan.custom && plan.monthlyPrice !== "$0";

  return (
    <div
      className={cn("relative h-full", plan.highlighted && "lg:z-10 lg:scale-[1.05]")}
    >
      {plan.highlighted && (
        <div className="pointer-events-none absolute -inset-4 -z-10 rounded-[2rem] bg-[var(--nero-accent)]/15 blur-3xl" />
      )}

      <TiltCard
        tilt={plan.highlighted ? 4 : 3}
        drift={4}
        lift={plan.highlighted ? 10 : 6}
        className={cn(
          "flex h-full flex-col p-6 sm:p-8",
          plan.highlighted && "shadow-[0_0_60px_rgba(129,140,248,0.15)]"
        )}
      >
        {plan.highlighted && (
          <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r from-[var(--nero-accent)] to-[var(--nero-violet)] px-3 py-1 text-xs font-medium text-white">
            Most popular
          </span>
        )}

        <div>
          <h3 className="text-lg font-semibold">{plan.name}</h3>
          <p className="mt-1 text-sm text-[var(--nero-text-subtle)]">
            {plan.description}
          </p>
        </div>

        <div className="mt-6 flex min-h-[3rem] items-end">
          <AnimatePresence mode="popLayout" initial={false}>
            <motion.span
              key={price}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25, ease: EASE }}
              className="text-4xl font-semibold tracking-tight"
            >
              {price}
            </motion.span>
          </AnimatePresence>
          <span className="ml-2 pb-1 text-sm text-[var(--nero-text-subtle)]">
            {showBilledYearly ? "per user / month · billed yearly" : plan.period}
          </span>
        </div>

        <ul className="mt-8 flex-1 space-y-3">
          {plan.features.map((feature) => (
            <li key={feature} className="flex items-start gap-2.5">
              <Check className="mt-0.5 h-4 w-4 shrink-0 text-[var(--nero-accent)]" />
              <span className="text-sm text-[var(--nero-text-muted)]">
                {feature}
              </span>
            </li>
          ))}
        </ul>

        <Button
          variant={plan.highlighted ? "primary" : "secondary"}
          size="md"
          className="mt-8 w-full"
          href="#"
        >
          {plan.cta}
        </Button>
      </TiltCard>
    </div>
  );
}

export function Pricing() {
  const [billing, setBilling] = useState<Billing>("yearly");
  const trackRef = useRef<HTMLDivElement>(null);
  const innerRefs = useRef<(HTMLDivElement | null)[]>([]);
  const rafRef = useRef<number>(0);

  const highlightIndex = pricingPlans.findIndex((p) => p.highlighted);

  // Scale whichever card is closest to the horizontal centre; shrink & dim the
  // rest. Applied to an inner wrapper so the snap target itself keeps its size.
  const updateScales = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;

    const isDesktop = window.matchMedia(DESKTOP_QUERY).matches;
    const trackRect = track.getBoundingClientRect();
    const center = trackRect.left + trackRect.width / 2;

    innerRefs.current.forEach((el) => {
      if (!el) return;
      if (isDesktop) {
        el.style.transform = "";
        el.style.opacity = "";
        return;
      }
      const rect = el.getBoundingClientRect();
      const cardCenter = rect.left + rect.width / 2;
      const t = Math.min(Math.abs(cardCenter - center) / rect.width, 1);
      const scale = 1 - t * 0.14; // centred: 1.0 → edges: ~0.86
      const opacity = 1 - t * 0.4; // centred: 1.0 → edges: ~0.6
      el.style.transform = `scale(${scale.toFixed(4)})`;
      el.style.opacity = opacity.toFixed(3);
    });
  }, []);

  const onScroll = useCallback(() => {
    cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(updateScales);
  }, [updateScales]);

  // Centre the highlighted (Pro) card on load, then compute scales.
  useEffect(() => {
    const track = trackRef.current;
    const card = innerRefs.current[highlightIndex];
    if (!track || !card) return;

    if (!window.matchMedia(DESKTOP_QUERY).matches) {
      const trackRect = track.getBoundingClientRect();
      const cardRect = card.getBoundingClientRect();
      const delta =
        cardRect.left + cardRect.width / 2 - (trackRect.left + trackRect.width / 2);
      track.scrollLeft += delta;
    }
    updateScales();

    window.addEventListener("resize", updateScales);
    return () => {
      window.removeEventListener("resize", updateScales);
      cancelAnimationFrame(rafRef.current);
    };
  }, [highlightIndex, updateScales]);

  return (
    <section
      id="pricing"
      className="overflow-hidden border-y border-[var(--nero-border)] bg-[var(--nero-bg-elevated)] py-20 sm:py-28 lg:py-32"
    >
      <Container>
        <AnimatedSection variant="up">
          <SectionHeading
            badge="Pricing"
            title="Simple, transparent pricing"
            description="Start free and scale as your team grows. No hidden fees, no surprises."
          />
          <BillingToggle billing={billing} onChange={setBilling} />
        </AnimatedSection>
      </Container>

      <motion.div
        ref={trackRef}
        onScroll={onScroll}
        variants={staggerContainer(0.12)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-80px" }}
        className={cn(
          // Mobile: snap-scroll carousel with peeking neighbours.
          "mt-14 flex snap-x snap-mandatory items-center gap-4 overflow-x-auto px-[6%] pt-6 pb-8",
          "[-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
          // Desktop: revert to a centered 3-column grid.
          "lg:mx-auto lg:mt-16 lg:grid lg:max-w-6xl lg:grid-cols-3 lg:items-center lg:gap-5 lg:overflow-visible lg:px-8 lg:pt-0 lg:pb-0"
        )}
      >
        {pricingPlans.map((plan, i) => (
          <motion.div
            key={plan.name}
            variants={revealVariants.up}
            transition={{ duration: 0.7, ease: EASE }}
            className="w-[88%] shrink-0 snap-center sm:w-[64%] lg:w-auto lg:shrink"
          >
            <div
              ref={(el) => {
                innerRefs.current[i] = el;
              }}
              className="h-full origin-center will-change-transform max-lg:transition-[transform,opacity] max-lg:duration-200 max-lg:ease-out"
            >
              <PlanCard plan={plan} billing={billing} />
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
