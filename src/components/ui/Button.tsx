"use client";

import { cn } from "@/lib/utils";

type ButtonProps = {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
  className?: string;
  href?: string;
  onClick?: () => void;
  type?: "button" | "submit";
};

export function Button({
  children,
  variant = "primary",
  size = "md",
  className,
  href,
  onClick,
  type = "button",
}: ButtonProps) {
  const baseStyles =
    "inline-flex items-center justify-center gap-2 rounded-full font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--nero-accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--nero-bg)]";

  const variants = {
    primary:
      "bg-white text-[var(--nero-bg)] hover:bg-zinc-100 hover:shadow-[0_0_30px_rgba(255,255,255,0.15)] active:scale-[0.98]",
    secondary:
      "glass text-[var(--nero-text)] hover:bg-[var(--nero-surface-hover)] hover:border-[var(--nero-border-strong)] active:scale-[0.98]",
    ghost:
      "text-[var(--nero-text-muted)] hover:text-[var(--nero-text)] hover:bg-white/5",
  };

  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-2.5 text-sm",
    lg: "px-8 py-3.5 text-base",
  };

  const classes = cn(baseStyles, variants[variant], sizes[size], className);

  if (href) {
    return (
      <a href={href} className={classes}>
        {children}
      </a>
    );
  }

  return (
    <button type={type} onClick={onClick} className={classes}>
      {children}
    </button>
  );
}
