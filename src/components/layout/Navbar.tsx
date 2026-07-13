"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { navLinks } from "@/lib/constants";
import { cn } from "@/lib/utils";

const menuStagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06, delayChildren: 0.08 } },
};

const menuItem: Variants = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] } },
};

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [mobileOpen]);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <Container as="nav" className="pt-4">
        <motion.div
          initial={{ y: -80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className={cn(
            "relative z-50 flex items-center justify-between rounded-2xl px-4 py-3 transition-[background,box-shadow,border-color] duration-500 sm:px-6",
            scrolled || mobileOpen
              ? "glass-strong shadow-[0_8px_32px_rgba(0,0,0,0.4)]"
              : "bg-transparent"
          )}
        >
          <a href="#" className="flex items-center" aria-label="Nero AI home">
            <Image
              src="/images/logo.png"
              alt="Nero AI"
              width={512}
              height={268}
              priority
              className="h-10 w-auto sm:h-11"
            />
          </a>

          <div className="hidden items-center gap-1 md:flex">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="rounded-lg px-3.5 py-2 text-sm text-[var(--nero-text-muted)] transition-colors hover:bg-white/5 hover:text-[var(--nero-text)]"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="hidden items-center gap-3 md:flex">
            <Button variant="ghost" size="sm" href="#">
              Log in
            </Button>
            <Button variant="primary" size="sm" href="#pricing">
              Get started
            </Button>
          </div>

          {/* Morphing hamburger / close button */}
          <button
            className="relative flex h-10 w-10 items-center justify-center rounded-lg text-[var(--nero-text)] transition-colors hover:bg-white/5 md:hidden"
            onClick={() => setMobileOpen((o) => !o)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
          >
            <div className="relative h-4 w-5">
              <span
                className={cn(
                  "absolute left-0 h-0.5 w-5 rounded-full bg-gradient-to-r from-[var(--nero-accent)] to-[var(--nero-violet)] transition-all duration-300 ease-out",
                  mobileOpen ? "top-1/2 -translate-y-1/2 rotate-45" : "top-1"
                )}
              />
              <span
                className={cn(
                  "absolute left-0 h-0.5 w-5 rounded-full bg-gradient-to-r from-[var(--nero-violet)] to-[var(--nero-accent)] transition-all duration-300 ease-out",
                  mobileOpen ? "bottom-1/2 translate-y-1/2 -rotate-45" : "bottom-1"
                )}
              />
            </div>
          </button>
        </motion.div>
      </Container>

      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Backdrop — closes the menu when tapping anywhere else */}
            <motion.button
              type="button"
              aria-label="Close menu"
              tabIndex={-1}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={() => setMobileOpen(false)}
              className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm md:hidden"
            />

            {/* Dropdown panel */}
            <motion.div
              initial={{ opacity: 0, y: -12, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -12, scale: 0.98 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="glass-strong fixed inset-x-4 top-[5rem] z-40 origin-top overflow-hidden rounded-3xl p-3 shadow-[0_24px_60px_-15px_rgba(0,0,0,0.7)] md:hidden"
            >
              {/* Subtle brand gradient wash over the glass */}
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 rounded-3xl bg-gradient-to-br from-[var(--nero-accent)]/12 via-transparent to-[var(--nero-violet)]/12"
              />
              <div
                aria-hidden
                className="pointer-events-none absolute -top-16 left-1/2 h-40 w-40 -translate-x-1/2 rounded-full bg-[var(--nero-accent)]/20 blur-3xl"
              />

              <motion.nav
                variants={menuStagger}
                initial="hidden"
                animate="show"
                className="relative flex flex-col"
              >
                {navLinks.map((link) => (
                  <motion.a
                    key={link.href}
                    href={link.href}
                    variants={menuItem}
                    onClick={() => setMobileOpen(false)}
                    className="group flex items-center justify-between rounded-2xl px-4 py-4 text-lg font-medium text-[var(--nero-text-muted)] transition-colors hover:bg-white/5 hover:text-[var(--nero-text)]"
                  >
                    {link.label}
                    <ArrowUpRight className="h-4 w-4 -translate-x-1 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100" />
                  </motion.a>
                ))}

                <motion.div
                  variants={menuItem}
                  className="mt-3 flex flex-col gap-2 border-t border-[var(--nero-border)] pt-4"
                >
                  <Button variant="secondary" size="lg" href="#">
                    Log in
                  </Button>
                  <Button variant="primary" size="lg" href="#pricing">
                    Get started
                  </Button>
                </motion.div>
              </motion.nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
