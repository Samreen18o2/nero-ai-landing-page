import { cn } from "@/lib/utils";

type BadgeProps = {
  children: React.ReactNode;
  className?: string;
};

export function Badge({ children, className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border border-[var(--nero-border)] bg-white/5 px-3 py-1 text-xs font-medium tracking-wide text-[var(--nero-text-muted)]",
        className
      )}
    >
      {children}
    </span>
  );
}
