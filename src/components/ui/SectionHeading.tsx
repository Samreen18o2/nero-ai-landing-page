import { cn } from "@/lib/utils";
import { Badge } from "./Badge";

type SectionHeadingProps = {
  badge?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
};

export function SectionHeading({
  badge,
  title,
  description,
  align = "center",
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "max-w-2xl",
        align === "center" && "mx-auto text-center",
        className
      )}
    >
      {badge && (
        <Badge className="mb-5">
          <span className="h-1.5 w-1.5 rounded-full bg-[var(--nero-accent)]" />
          {badge}
        </Badge>
      )}
      <h2 className="text-3xl font-semibold tracking-tight text-[var(--nero-text)] sm:text-4xl lg:text-[2.75rem] lg:leading-[1.15]">
        {title}
      </h2>
      {description && (
        <p className="mt-4 text-base leading-relaxed text-[var(--nero-text-muted)] sm:text-lg">
          {description}
        </p>
      )}
    </div>
  );
}
