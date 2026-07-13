"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { statistics } from "@/lib/constants";

function useCountUp(value: string, isInView: boolean) {
  const [display, setDisplay] = useState("0");

  useEffect(() => {
    if (!isInView) return;

    const match = value.match(/^([\d.]+)(.*)$/);
    if (!match) {
      setDisplay(value);
      return;
    }

    const target = parseFloat(match[1]);
    const suffix = match[2];
    const duration = 1600;
    const start = performance.now();
    let frame = 0;

    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = target * eased;
      setDisplay(
        Number.isInteger(target)
          ? `${Math.round(current)}${suffix}`
          : `${current.toFixed(1)}${suffix}`
      );
      if (progress < 1) frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [isInView, value]);

  return display;
}

function StatCard({ value, label }: { value: string; label: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const display = useCountUp(value, isInView);

  return (
    <RevealItem variant="up">
      <motion.div
        ref={ref}
        whileHover={{ scale: 1.03 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className="group relative overflow-hidden rounded-2xl border border-[var(--nero-border)] bg-[var(--nero-surface)] px-4 py-8 text-center transition-shadow duration-300 hover:shadow-[0_20px_60px_-20px_rgba(129,140,248,0.35)] sm:py-10"
      >
        <span className="gradient-border absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        <p className="text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
          <span className="gradient-text">{display}</span>
        </p>
        <p className="mt-2 text-sm text-[var(--nero-text-muted)] sm:text-base">
          {label}
        </p>
      </motion.div>
    </RevealItem>
  );
}

export function Statistics() {
  return (
    <section className="py-20 sm:py-28">
      <Container>
        <RevealGroup
          stagger={0.1}
          className="grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-5"
        >
          {statistics.map((stat) => (
            <StatCard key={stat.label} value={stat.value} label={stat.label} />
          ))}
        </RevealGroup>
      </Container>
    </section>
  );
}
