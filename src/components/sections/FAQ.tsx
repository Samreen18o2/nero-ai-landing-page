"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus } from "lucide-react";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { faqItems } from "@/lib/constants";

function FAQItem({
  question,
  answer,
  isOpen,
  onToggle,
}: {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="border-b border-[var(--nero-border)]">
      <button
        onClick={onToggle}
        className="group flex w-full items-center justify-between gap-4 py-5 text-left transition-colors hover:text-[var(--nero-accent-bright)]"
        aria-expanded={isOpen}
      >
        <span className="text-sm font-medium sm:text-base">{question}</span>
        <motion.span
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-[var(--nero-border)] bg-white/[0.02] transition-colors duration-300 group-hover:border-[var(--nero-border-strong)]"
          animate={{ rotate: isOpen ? 135 : 0 }}
          transition={{ duration: 0.45, ease: [0.32, 0.72, 0, 1] }}
        >
          <Plus className="h-4 w-4" />
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="content"
            initial="collapsed"
            animate="open"
            exit="collapsed"
            variants={{
              open: { height: "auto", opacity: 1 },
              collapsed: { height: 0, opacity: 0 },
            }}
            transition={{
              height: { duration: 0.45, ease: [0.32, 0.72, 0, 1] },
              opacity: { duration: 0.3, ease: "easeInOut" },
            }}
            className="overflow-hidden"
          >
            <motion.p
              variants={{
                open: { y: 0 },
                collapsed: { y: -6 },
              }}
              transition={{ duration: 0.45, ease: [0.32, 0.72, 0, 1] }}
              className="pb-5 text-sm leading-relaxed text-[var(--nero-text-muted)]"
            >
              {answer}
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="py-20 sm:py-28 lg:py-32">
      <Container>
        <AnimatedSection variant="up">
          <SectionHeading
            badge="FAQ"
            title="Frequently asked questions"
            description="Everything you need to know about Nero. Can't find what you're looking for? Reach out to our team."
          />
        </AnimatedSection>

        <RevealGroup stagger={0.06} className="mx-auto mt-12 max-w-2xl">
          {faqItems.map((item, i) => (
            <RevealItem key={item.question} variant="up">
              <FAQItem
                question={item.question}
                answer={item.answer}
                isOpen={openIndex === i}
                onToggle={() => setOpenIndex(openIndex === i ? null : i)}
              />
            </RevealItem>
          ))}
        </RevealGroup>
      </Container>
    </section>
  );
}
