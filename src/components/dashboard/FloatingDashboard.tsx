"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Sparkles, TrendingUp, CheckCircle2, Clock } from "lucide-react";
import { DashboardMockup } from "./DashboardMockup";

type FloatCard = {
  className: string;
  rotate: number;
  duration: number;
  delay: number;
  y: number;
  content: React.ReactNode;
};

const cards: FloatCard[] = [
  {
    className: "-left-4 top-16 sm:-left-12 sm:top-24",
    rotate: -6,
    duration: 7,
    delay: 0,
    y: 14,
    content: (
      <div className="flex items-center gap-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-500/15 text-emerald-400">
          <CheckCircle2 className="h-4.5 w-4.5" />
        </div>
        <div>
          <p className="text-xs font-medium text-[var(--nero-text)]">
            Task automated
          </p>
          <p className="text-[10px] text-[var(--nero-text-subtle)]">
            Saved 42 min today
          </p>
        </div>
      </div>
    ),
  },
  {
    className: "-right-2 top-8 sm:-right-10 sm:top-12",
    rotate: 7,
    duration: 8.5,
    delay: 0.6,
    y: 18,
    content: (
      <div className="flex items-center gap-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[var(--nero-accent)]/15 text-[var(--nero-accent)]">
          <Sparkles className="h-4.5 w-4.5" />
        </div>
        <div>
          <p className="text-xs font-medium text-[var(--nero-text)]">
            AI drafted reply
          </p>
          <p className="text-[10px] text-[var(--nero-text-subtle)]">
            Ready to review
          </p>
        </div>
      </div>
    ),
  },
  {
    className: "-right-4 bottom-16 sm:-right-14 sm:bottom-24",
    rotate: -5,
    duration: 9,
    delay: 1.1,
    y: 16,
    content: (
      <div className="flex items-center gap-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[var(--nero-violet)]/15 text-[var(--nero-violet)]">
          <TrendingUp className="h-4.5 w-4.5" />
        </div>
        <div>
          <p className="text-xs font-medium text-[var(--nero-text)]">
            +23% productivity
          </p>
          <p className="text-[10px] text-[var(--nero-text-subtle)]">This week</p>
        </div>
      </div>
    ),
  },
  {
    className: "-left-2 bottom-10 sm:-left-10 sm:bottom-16",
    rotate: 5,
    duration: 7.8,
    delay: 0.3,
    y: 12,
    content: (
      <div className="flex items-center gap-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/10 text-[var(--nero-text-muted)]">
          <Clock className="h-4.5 w-4.5" />
        </div>
        <div>
          <p className="text-xs font-medium text-[var(--nero-text)]">
            4 workflows queued
          </p>
          <p className="text-[10px] text-[var(--nero-text-subtle)]">
            Running in background
          </p>
        </div>
      </div>
    ),
  },
];

export function FloatingDashboard() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div className="relative">
      {/* Soft glow behind the whole cluster */}
      <div className="pointer-events-none absolute inset-0 -z-10 scale-90 rounded-[2rem] bg-[var(--nero-accent)]/10 blur-3xl" />

      <motion.div
        animate={
          prefersReducedMotion ? undefined : { y: [0, -10, 0] }
        }
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      >
        <DashboardMockup />
      </motion.div>

      {cards.map((card, i) => (
        <motion.div
          key={i}
          className={`glass-strong absolute z-20 hidden rounded-xl px-3.5 py-3 shadow-[0_20px_50px_-15px_rgba(0,0,0,0.7)] sm:block ${card.className}`}
          initial={{ opacity: 0, scale: 0.8, rotate: card.rotate }}
          animate={
            prefersReducedMotion
              ? { opacity: 1, scale: 1 }
              : {
                  opacity: 1,
                  scale: 1,
                  y: [0, -card.y, 0],
                  rotate: [card.rotate, card.rotate + 1.5, card.rotate],
                }
          }
          transition={{
            opacity: { duration: 0.6, delay: 0.8 + card.delay },
            scale: { duration: 0.6, delay: 0.8 + card.delay },
            y: {
              duration: card.duration,
              repeat: Infinity,
              ease: "easeInOut",
              delay: card.delay,
            },
            rotate: {
              duration: card.duration,
              repeat: Infinity,
              ease: "easeInOut",
              delay: card.delay,
            },
          }}
        >
          {card.content}
        </motion.div>
      ))}
    </div>
  );
}
