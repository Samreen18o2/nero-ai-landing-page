"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  CheckCircle2,
  Clock,
  TrendingUp,
  MessageSquare,
  FileText,
  Zap,
  ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";

const tabs = [
  { id: "overview", label: "Overview", icon: TrendingUp },
  { id: "tasks", label: "Tasks", icon: CheckCircle2 },
  { id: "chat", label: "AI Chat", icon: MessageSquare },
] as const;

type TabId = (typeof tabs)[number]["id"];

const tasks = [
  { id: 1, title: "Summarize Q3 board deck", status: "done", time: "2m ago" },
  { id: 2, title: "Draft product launch email", status: "active", time: "In progress" },
  { id: 3, title: "Sync Slack threads to Notion", status: "queued", time: "Queued" },
  { id: 4, title: "Generate weekly team report", status: "queued", time: "Queued" },
];

const chatMessages = [
  {
    role: "user" as const,
    text: "What were the key decisions from yesterday's standup?",
  },
  {
    role: "ai" as const,
    text: "Based on your Slack #engineering channel, three key decisions were made: ship v2.4 by Friday, prioritize the API migration, and schedule a design review for the dashboard refresh.",
  },
];

export function DashboardMockup({ className }: { className?: string }) {
  const [activeTab, setActiveTab] = useState<TabId>("overview");

  return (
    <div
      className={cn(
        "gradient-border relative overflow-hidden rounded-2xl bg-[var(--nero-surface)] shadow-[0_0_80px_rgba(129,140,248,0.08)]",
        className
      )}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-[var(--nero-glow)] to-transparent opacity-50" />

      <div className="relative">
        {/* Window chrome */}
        <div className="flex items-center justify-between border-b border-[var(--nero-border)] px-4 py-3 sm:px-5">
          <div className="flex items-center gap-2">
            <div className="flex gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-zinc-600" />
              <span className="h-2.5 w-2.5 rounded-full bg-zinc-600" />
              <span className="h-2.5 w-2.5 rounded-full bg-zinc-600" />
            </div>
            <span className="ml-2 hidden text-xs text-[var(--nero-text-subtle)] sm:inline">
              nero.ai / workspace
            </span>
          </div>
          <div className="flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-2.5 py-1">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
            <span className="text-[10px] font-medium text-emerald-400 sm:text-xs">
              AI Active
            </span>
          </div>
        </div>

        {/* Tab bar */}
        <div className="flex gap-1 border-b border-[var(--nero-border)] px-3 py-2 sm:px-4">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition-all duration-200 sm:text-sm",
                activeTab === tab.id
                  ? "bg-white/10 text-[var(--nero-text)]"
                  : "text-[var(--nero-text-subtle)] hover:bg-white/5 hover:text-[var(--nero-text-muted)]"
              )}
            >
              <tab.icon className="h-3.5 w-3.5" />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="min-h-[280px] p-4 sm:min-h-[320px] sm:p-5">
          <AnimatePresence mode="wait">
            {activeTab === "overview" && (
              <motion.div
                key="overview"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2 }}
                className="space-y-4"
              >
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                  {[
                    { label: "Tasks automated", value: "127", change: "+23%" },
                    { label: "Hours saved", value: "18.4", change: "+12%" },
                    { label: "AI queries", value: "2.4k", change: "+8%" },
                  ].map((stat) => (
                    <div
                      key={stat.label}
                      className="rounded-xl border border-[var(--nero-border)] bg-white/[0.02] p-3 sm:p-4"
                    >
                      <p className="text-[10px] text-[var(--nero-text-subtle)] sm:text-xs">
                        {stat.label}
                      </p>
                      <p className="mt-1 text-lg font-semibold sm:text-xl">
                        {stat.value}
                      </p>
                      <p className="mt-0.5 text-[10px] text-emerald-400 sm:text-xs">
                        {stat.change}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="rounded-xl border border-[var(--nero-border)] bg-white/[0.02] p-4">
                  <div className="flex items-center justify-between">
                    <p className="text-xs font-medium text-[var(--nero-text-muted)]">
                      Productivity trend
                    </p>
                    <span className="text-[10px] text-[var(--nero-text-subtle)]">
                      Last 7 days
                    </span>
                  </div>
                  <div className="mt-3 flex h-16 items-end gap-1">
                    {[40, 55, 45, 70, 65, 85, 92].map((h, i) => (
                      <div
                        key={i}
                        className="flex-1 rounded-sm bg-gradient-to-t from-[var(--nero-accent)]/20 to-[var(--nero-accent)]/60 transition-all duration-300 hover:from-[var(--nero-accent)]/30 hover:to-[var(--nero-accent)]/80"
                        style={{ height: `${h}%` }}
                      />
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === "tasks" && (
              <motion.div
                key="tasks"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2 }}
                className="space-y-2"
              >
                {tasks.map((task) => (
                  <div
                    key={task.id}
                    className="group flex items-center gap-3 rounded-xl border border-[var(--nero-border)] bg-white/[0.02] p-3 transition-colors hover:bg-white/[0.04]"
                  >
                    <div
                      className={cn(
                        "flex h-8 w-8 shrink-0 items-center justify-center rounded-lg",
                        task.status === "done" && "bg-emerald-500/10 text-emerald-400",
                        task.status === "active" && "bg-[var(--nero-accent)]/10 text-[var(--nero-accent)]",
                        task.status === "queued" && "bg-white/5 text-[var(--nero-text-subtle)]"
                      )}
                    >
                      {task.status === "done" ? (
                        <CheckCircle2 className="h-4 w-4" />
                      ) : task.status === "active" ? (
                        <Zap className="h-4 w-4" />
                      ) : (
                        <Clock className="h-4 w-4" />
                      )}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium">{task.title}</p>
                      <p className="text-xs text-[var(--nero-text-subtle)]">
                        {task.time}
                      </p>
                    </div>
                    <ChevronRight className="h-4 w-4 shrink-0 text-[var(--nero-text-subtle)] opacity-0 transition-opacity group-hover:opacity-100" />
                  </div>
                ))}
              </motion.div>
            )}

            {activeTab === "chat" && (
              <motion.div
                key="chat"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2 }}
                className="space-y-3"
              >
                {chatMessages.map((msg, i) => (
                  <div
                    key={i}
                    className={cn(
                      "flex gap-2.5",
                      msg.role === "user" ? "justify-end" : "justify-start"
                    )}
                  >
                    {msg.role === "ai" && (
                      <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-[var(--nero-accent)]/10">
                        <Sparkles className="h-3.5 w-3.5 text-[var(--nero-accent)]" />
                      </div>
                    )}
                    <div
                      className={cn(
                        "max-w-[85%] rounded-xl px-3.5 py-2.5 text-sm leading-relaxed",
                        msg.role === "user"
                          ? "bg-white/10 text-[var(--nero-text)]"
                          : "border border-[var(--nero-border)] bg-white/[0.02] text-[var(--nero-text-muted)]"
                      )}
                    >
                      {msg.text}
                    </div>
                  </div>
                ))}
                <div className="flex items-center gap-2 rounded-xl border border-[var(--nero-border)] bg-white/[0.02] px-3 py-2.5">
                  <FileText className="h-4 w-4 text-[var(--nero-text-subtle)]" />
                  <span className="flex-1 text-xs text-[var(--nero-text-subtle)]">
                    Ask Nero anything about your workspace...
                  </span>
                  <div className="flex h-6 w-6 items-center justify-center rounded-md bg-[var(--nero-accent)]/20">
                    <Sparkles className="h-3 w-3 text-[var(--nero-accent)]" />
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
