"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import {
  Search,
  Layers,
  Bot,
  ArrowUpRight,
  Circle,
  CheckCircle2,
  Inbox,
  FileText,
  BarChart3,
} from "lucide-react";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Badge } from "@/components/ui/Badge";
import { EASE_OUT } from "@/lib/motion";
import { cn } from "@/lib/utils";

type FaceKey = "projects" | "agents";

const sidebarItems = [
  { key: "search", icon: Search, label: "Search" },
  { key: "projects", icon: Layers, label: "Projects" },
  { key: "agents", icon: Bot, label: "Agents" },
] as const;

const projectItems = [
  { name: "Q4 Product Launch", status: "In progress", progress: 72 },
  { name: "API Migration", status: "Review", progress: 90 },
  { name: "Design System v2", status: "Planning", progress: 35 },
];

const agentRuns = [
  {
    name: "Inbox Triage",
    detail: "Processing 24 emails",
    icon: Inbox,
    tone: "text-[var(--nero-accent)] bg-[var(--nero-accent)]/10",
  },
  {
    name: "Report Generator",
    detail: "Drafting weekly summary",
    icon: FileText,
    tone: "text-[var(--nero-violet)] bg-[var(--nero-violet)]/10",
  },
  {
    name: "Meeting Notes",
    detail: "Synced to Notion",
    icon: CheckCircle2,
    tone: "text-emerald-400 bg-emerald-500/10",
  },
  {
    name: "Data Analyst",
    detail: "Monitoring 8 metrics",
    icon: BarChart3,
    tone: "text-[var(--nero-accent)] bg-[var(--nero-accent)]/10",
  },
];

function Sidebar({ active }: { active: FaceKey }) {
  return (
    <div className="hidden w-48 shrink-0 border-r border-[var(--nero-border)] bg-[var(--nero-bg-elevated)] p-4 sm:block">
      <p className="mb-4 text-[10px] font-medium tracking-wider text-[var(--nero-text-subtle)] uppercase">
        Workspace
      </p>
      <div className="space-y-1">
        {sidebarItems.map((item) => {
          const isActive = item.key === active;
          return (
            <div
              key={item.label}
              className={cn(
                "flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-sm transition-colors duration-300",
                isActive
                  ? "bg-white/10 text-[var(--nero-text)]"
                  : "text-[var(--nero-text-subtle)]"
              )}
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function ProjectsFace({ animate }: { animate: boolean }) {
  return (
    <div className="flex h-full w-full">
      <Sidebar active="projects" />
      <div className="flex-1 p-5 sm:p-6">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="text-sm font-semibold">Active Projects</h4>
            <p className="text-xs text-[var(--nero-text-subtle)]">
              3 projects · 12 automations running
            </p>
          </div>
          <Badge>
            <Circle className="h-1.5 w-1.5 fill-emerald-400 text-emerald-400" />
            Live
          </Badge>
        </div>

        <div className="mt-5 space-y-3">
          {projectItems.map((project) => (
            <div
              key={project.name}
              className="group/card rounded-xl border border-[var(--nero-border)] bg-white/[0.02] p-4 transition-all duration-300 hover:border-[var(--nero-border-strong)] hover:bg-white/[0.04]"
            >
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium">{project.name}</p>
                <ArrowUpRight className="h-4 w-4 text-[var(--nero-text-subtle)] opacity-0 transition-opacity group-hover/card:opacity-100" />
              </div>
              <div className="mt-2 flex items-center justify-between">
                <span className="text-xs text-[var(--nero-text-subtle)]">
                  {project.status}
                </span>
                <span className="text-xs font-medium text-[var(--nero-accent)]">
                  {project.progress}%
                </span>
              </div>
              <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/5">
                <motion.div
                  className="h-full rounded-full bg-gradient-to-r from-[var(--nero-accent)] to-[var(--nero-violet)]"
                  initial={{ width: 0 }}
                  animate={animate ? { width: `${project.progress}%` } : undefined}
                  whileInView={!animate ? { width: `${project.progress}%` } : undefined}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function AgentsFace() {
  return (
    <div className="flex h-full w-full">
      <Sidebar active="agents" />
      <div className="flex-1 p-5 sm:p-6">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="text-sm font-semibold">AI Agents</h4>
            <p className="text-xs text-[var(--nero-text-subtle)]">
              4 agents · running autonomously
            </p>
          </div>
          <Badge>
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[var(--nero-accent)]" />
            Auto
          </Badge>
        </div>

        <div className="mt-5 space-y-3">
          {agentRuns.map((agent) => (
            <div
              key={agent.name}
              className="flex items-center gap-3 rounded-xl border border-[var(--nero-border)] bg-white/[0.02] p-3.5"
            >
              <div
                className={cn(
                  "flex h-9 w-9 shrink-0 items-center justify-center rounded-lg",
                  agent.tone
                )}
              >
                <agent.icon className="h-4.5 w-4.5" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium">{agent.name}</p>
                <p className="truncate text-xs text-[var(--nero-text-subtle)]">
                  {agent.detail}
                </p>
              </div>
              <span className="flex items-center gap-1.5 text-[10px] font-medium text-emerald-400">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
                Active
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const FACE_CLASS =
  "gradient-border absolute inset-0 overflow-hidden rounded-2xl bg-[var(--nero-surface)] [backface-visibility:hidden] [-webkit-backface-visibility:hidden]";

function ProductCube() {
  const prefersReducedMotion = useReducedMotion();
  const sceneRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);
  const [hovered, setHovered] = useState(false);
  const [pinned, setPinned] = useState(false);

  const flipped = hovered || pinned;
  const depth = Math.min(width / 2, 340);

  // Ambient scroll-linked rotation: the cube slowly turns as the section
  // passes through the viewport, layered beneath the hover flip.
  const { scrollYProgress } = useScroll({
    target: sceneRef,
    offset: ["start end", "end start"],
  });
  const scrollTiltY = useSpring(
    useTransform(scrollYProgress, [0, 1], [12, -12]),
    { stiffness: 60, damping: 20, restDelta: 0.001 }
  );
  const scrollTiltX = useSpring(
    useTransform(scrollYProgress, [0, 0.5, 1], [4, 0, -4]),
    { stiffness: 60, damping: 20, restDelta: 0.001 }
  );

  useEffect(() => {
    const el = sceneRef.current;
    if (!el) return;
    const ro = new ResizeObserver((entries) => {
      setWidth(entries[0].contentRect.width);
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const toggle = () => setPinned((p) => !p);
  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      toggle();
    }
  };

  // Reduced-motion / accessibility fallback: crossfade the faces instead of
  // rotating in 3D.
  if (prefersReducedMotion) {
    return (
      <div
        role="button"
        tabIndex={0}
        aria-pressed={flipped}
        aria-label="Toggle between Projects and AI Agents view"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onClick={toggle}
        onKeyDown={onKeyDown}
        className="relative h-[420px] cursor-pointer rounded-2xl outline-none focus-visible:ring-2 focus-visible:ring-[var(--nero-accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--nero-bg)]"
      >
        <motion.div
          className={FACE_CLASS}
          style={{ position: "absolute", inset: 0 }}
          animate={{ opacity: flipped ? 0 : 1 }}
          transition={{ duration: 0.4 }}
        >
          <ProjectsFace animate={false} />
        </motion.div>
        <motion.div
          className={FACE_CLASS}
          style={{ position: "absolute", inset: 0 }}
          animate={{ opacity: flipped ? 1 : 0 }}
          transition={{ duration: 0.4 }}
        >
          <AgentsFace />
        </motion.div>
      </div>
    );
  }

  return (
    <div
      ref={sceneRef}
      role="button"
      tabIndex={0}
      aria-pressed={flipped}
      aria-label="Toggle between Projects and AI Agents view"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setHovered(true)}
      onBlur={() => setHovered(false)}
      onClick={toggle}
      onKeyDown={onKeyDown}
      className="relative h-[420px] cursor-pointer rounded-2xl outline-none focus-visible:ring-2 focus-visible:ring-[var(--nero-accent)] focus-visible:ring-offset-4 focus-visible:ring-offset-[var(--nero-bg)]"
      style={{ perspective: 1600, perspectiveOrigin: "center center" }}
    >
      {/* Ambient scroll-tilt layer */}
      <motion.div
        className="relative h-full w-full [transform-style:preserve-3d]"
        style={{ rotateY: scrollTiltY, rotateX: scrollTiltX }}
      >
        {/* Static depth wrapper: pushes the whole cube back by half its width so
            the front-facing face always sits flush at z=0 (no scale/drift). */}
        <div
          className="relative h-full w-full [transform-style:preserve-3d]"
          style={{ transform: `translateZ(-${depth}px)` }}
        >
          {/* Rotating layer: only handles the hover/flip Y rotation. */}
          <motion.div
            className="absolute inset-0 [transform-style:preserve-3d]"
            style={{ transformOrigin: "center center" }}
            animate={{ rotateY: flipped ? -90 : 0 }}
            transition={{ duration: 0.9, ease: EASE_OUT }}
          >
            <div
              className={FACE_CLASS}
              style={{
                position: "absolute",
                inset: 0,
                transform: `translateZ(${depth}px)`,
              }}
            >
              <ProjectsFace animate />
            </div>
            <div
              className={FACE_CLASS}
              style={{
                position: "absolute",
                inset: 0,
                transform: `rotateY(90deg) translateZ(${depth}px)`,
              }}
            >
              <AgentsFace />
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}

export function ProductPreview() {
  return (
    <section
      id="product"
      className="relative overflow-x-clip py-20 sm:py-28 lg:py-32"
    >
      <div className="glow-orb absolute top-1/2 -left-48 h-[400px] w-[400px] bg-[var(--nero-violet)] opacity-10" />

      <Container className="relative">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <AnimatedSection variant="left" as="div">
            <SectionHeading
              badge="Product"
              title="One workspace. Infinite possibilities."
              description="See how Nero brings your projects, automations, and AI agents together in a single, beautifully designed interface."
              align="center"
              className="lg:mx-0 lg:text-left"
            />

            <ul className="mx-auto mt-8 max-w-md space-y-4 lg:mx-0 lg:max-w-none">
              {[
                "Real-time sync across all connected tools",
                "AI agents that run autonomously in the background",
                "Smart search across your entire knowledge base",
              ].map((item) => (
                <li
                  key={item}
                  className="flex items-start justify-center gap-3 text-left lg:justify-start"
                >
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[var(--nero-accent)]" />
                  <span className="text-sm text-[var(--nero-text-muted)] sm:text-base">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </AnimatedSection>

          <AnimatedSection variant="right" as="div">
            <ProductCube />
          </AnimatedSection>
        </div>
      </Container>
    </section>
  );
}
