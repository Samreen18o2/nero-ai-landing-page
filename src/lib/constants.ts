import {
  Brain,
  Zap,
  Shield,
  BarChart3,
  MessageSquare,
  Workflow,
  Mail,
  Calendar,
  FileText,
  Code2,
  Cloud,
  Database,
  Video,
  PenTool,
  LineChart,
  LifeBuoy,
  Layers,
  Search,
  Table,
  ListChecks,
  Sparkles,
  type LucideIcon,
} from "lucide-react";

export const navLinks = [
  { label: "Features", href: "#features" },
  { label: "Capabilities", href: "#capabilities" },
  { label: "Product", href: "#product" },
  { label: "Pricing", href: "#pricing" },
  { label: "FAQ", href: "#faq" },
] as const;

// Fictional companies for the "trusted by" row.
export const trustedCompanies = [
  "Northwind",
  "Quantic",
  "Evergreen",
  "Helio",
  "Vantage",
  "Monolith",
  "Skyward",
] as const;

export type Feature = {
  icon: LucideIcon;
  title: string;
  description: string;
};

export const features: Feature[] = [
  {
    icon: Brain,
    title: "Context-aware intelligence",
    description:
      "Nero understands your workflow, documents, and team context to deliver answers that actually matter—not generic AI fluff.",
  },
  {
    icon: Zap,
    title: "Instant automation",
    description:
      "Turn repetitive tasks into one-click workflows. From inbox triage to report generation, Nero handles the busywork.",
  },
  {
    icon: Workflow,
    title: "Unified workspace",
    description:
      "Connect your tools, knowledge base, and conversations in one intelligent hub. No more tab-switching chaos.",
  },
  {
    icon: MessageSquare,
    title: "Natural collaboration",
    description:
      "Chat with your data, share insights with your team, and co-create in real time with AI that stays in sync.",
  },
  {
    icon: BarChart3,
    title: "Actionable analytics",
    description:
      "Track productivity gains, workflow bottlenecks, and team performance with dashboards built for decision-makers.",
  },
  {
    icon: Shield,
    title: "Enterprise-grade security",
    description:
      "SOC 2 Type II certified with end-to-end encryption, SSO, and granular access controls your IT team will love.",
  },
];

export type Capability = {
  icon: LucideIcon;
  title: string;
  example: string;
};

// Concrete examples of what the AI can actually do.
export const aiCapabilities: Capability[] = [
  {
    icon: FileText,
    title: "Summarize anything",
    example:
      "Condense a 60-message thread into three clear action items in seconds.",
  },
  {
    icon: PenTool,
    title: "Draft in your voice",
    example:
      "“Reply to this customer and offer a 20% discount” — written on-brand, instantly.",
  },
  {
    icon: Search,
    title: "Answer from your docs",
    example:
      "Ask “What's our refund policy?” and get a cited answer pulled from your knowledge base.",
  },
  {
    icon: Workflow,
    title: "Automate workflows",
    example:
      "“Every Monday, compile last week's metrics and post them to #leadership.”",
  },
  {
    icon: Table,
    title: "Extract structured data",
    example:
      "Pull the invoice number, date, and total from any PDF into a clean table.",
  },
  {
    icon: ListChecks,
    title: "Turn calls into tasks",
    example:
      "Convert a meeting recording into notes, decisions, and assigned to-dos.",
  },
];

export type Integration = {
  icon: LucideIcon;
  name: string;
  category: string;
};

// Fictional apps representing the common tool categories Nero connects to.
export const integrations: Integration[] = [
  { icon: MessageSquare, name: "Pulse", category: "Messaging" },
  { icon: Mail, name: "Postbox", category: "Email" },
  { icon: FileText, name: "Canvas", category: "Docs & wikis" },
  { icon: Code2, name: "Forge", category: "Code & repos" },
  { icon: Cloud, name: "Vault", category: "File storage" },
  { icon: PenTool, name: "Frame", category: "Design" },
  { icon: Calendar, name: "Cadence", category: "Calendar" },
  { icon: Video, name: "Relay", category: "Video calls" },
  { icon: Database, name: "Ledger", category: "CRM" },
  { icon: Layers, name: "Board", category: "Project tasks" },
  { icon: LineChart, name: "Signal", category: "Analytics" },
  { icon: LifeBuoy, name: "Beacon", category: "Support desk" },
];

export const howItWorksSteps = [
  {
    step: "01",
    title: "Connect your stack",
    description:
      "Integrate your messaging, docs, and workspace tools in minutes. Nero maps your knowledge graph automatically.",
  },
  {
    step: "02",
    title: "Train on your context",
    description:
      "Nero learns from your docs, conversations, and workflows—privately and securely—so every response is tailored to you.",
  },
  {
    step: "03",
    title: "Automate & accelerate",
    description:
      "Deploy AI agents, automate recurring tasks, and ship faster with intelligence that works alongside your team.",
  },
] as const;

export const statistics = [
  { value: "10x", label: "Faster task completion" },
  { value: "4.2hrs", label: "Saved per person weekly" },
  { value: "98%", label: "Customer satisfaction" },
  { value: "50K+", label: "Teams worldwide" },
] as const;

export type Testimonial = {
  quote: string;
  author: string;
  role: string;
  company: string;
  initials: string;
};

export const testimonials: Testimonial[] = [
  {
    quote:
      "Nero replaced three separate tools for us. Our engineering team ships 40% faster, and onboarding new hires takes half the time.",
    author: "Sarah Chen",
    role: "VP of Engineering",
    company: "Northwind",
    initials: "SC",
  },
  {
    quote:
      "The context awareness is unreal. It actually understands our product docs and gives answers our team can trust without double-checking.",
    author: "Marcus Webb",
    role: "Head of Product",
    company: "Helio",
    initials: "MW",
  },
  {
    quote:
      "We evaluated every AI workspace on the market. Nero was the only one that felt built for serious teams, not demos.",
    author: "Elena Rodriguez",
    role: "COO",
    company: "Vantage",
    initials: "ER",
  },
  {
    quote:
      "Our support team resolves tickets 2x faster now. Nero drafts replies from our help center and the answers are genuinely good.",
    author: "David Okafor",
    role: "Director of Support",
    company: "Quantic",
    initials: "DO",
  },
  {
    quote:
      "I was skeptical about another AI tool, but the automations paid for themselves in a week. The weekly reports alone save me hours.",
    author: "Priya Nair",
    role: "Operations Lead",
    company: "Evergreen",
    initials: "PN",
  },
  {
    quote:
      "Search across our entire knowledge base finally just works. New designers find what they need without pinging the whole team.",
    author: "Tomás Alvarez",
    role: "Design Manager",
    company: "Skyward",
    initials: "TA",
  },
  {
    quote:
      "Security review was the easiest we've done. SSO, audit logs, granular permissions—our IT team signed off without a fight.",
    author: "Hannah Weiss",
    role: "CISO",
    company: "Monolith",
    initials: "HW",
  },
  {
    quote:
      "Nero feels like a teammate who's read every doc we've ever written. The onboarding for new hires is night and day.",
    author: "Kenji Watanabe",
    role: "Chief of Staff",
    company: "Helio",
    initials: "KW",
  },
];

export type PricingPlan = {
  name: string;
  monthlyPrice: string;
  yearlyPrice: string;
  period: string;
  description: string;
  features: string[];
  highlighted?: boolean;
  cta: string;
  custom?: boolean;
};

export const pricingPlans: PricingPlan[] = [
  {
    name: "Starter",
    monthlyPrice: "$0",
    yearlyPrice: "$0",
    period: "forever",
    description: "For individuals exploring AI-powered productivity.",
    features: [
      "Up to 100 AI queries/month",
      "3 integrations",
      "Basic automations",
      "Community support",
    ],
    cta: "Get started free",
  },
  {
    name: "Pro",
    monthlyPrice: "$29",
    yearlyPrice: "$23",
    period: "per user / month",
    description: "For teams ready to transform how they work.",
    features: [
      "Unlimited AI queries",
      "Unlimited integrations",
      "Advanced automations & agents",
      "Priority support",
      "Analytics dashboard",
      "SSO & team management",
    ],
    highlighted: true,
    cta: "Start 14-day trial",
  },
  {
    name: "Enterprise",
    monthlyPrice: "Custom",
    yearlyPrice: "Custom",
    period: "tailored pricing",
    description: "For organizations with advanced security needs.",
    features: [
      "Everything in Pro",
      "Dedicated success manager",
      "Custom AI model fine-tuning",
      "On-premise deployment",
      "SLA & audit logs",
      "Advanced compliance controls",
    ],
    custom: true,
    cta: "Contact sales",
  },
];

export const faqItems = [
  {
    question: "How is Nero different from ChatGPT or other AI tools?",
    answer:
      "Nero is built for teams, not casual chat. It connects to your actual tools and documents, maintains context across projects, and automates workflows—not just answers questions. Think of it as an AI layer across your entire stack.",
  },
  {
    question: "Is my data used to train AI models?",
    answer:
      "Never. Your data stays private and is never used to train our models or shared with third parties. We're SOC 2 Type II certified and offer enterprise-grade encryption at rest and in transit.",
  },
  {
    question: "What integrations do you support?",
    answer:
      "Nero connects to 50+ tools across messaging, docs, code, storage, design, calendars, CRM, and support—plus a robust API for custom integrations.",
  },
  {
    question: "Can I try Nero before committing?",
    answer:
      "Absolutely. Our Starter plan is free forever, and Pro comes with a 14-day trial—no credit card required. Enterprise customers can schedule a personalized demo with our team.",
  },
  {
    question: "How does pricing work for growing teams?",
    answer:
      "Pro is billed per user with volume discounts starting at 50 seats, and yearly billing saves you 20%. You can add or remove seats anytime, and we only charge for active users.",
  },
] as const;

export type SocialLink = {
  label: string;
  href: string;
};

export const socialLinks: SocialLink[] = [
  { label: "X", href: "#" },
  { label: "GitHub", href: "#" },
  { label: "LinkedIn", href: "#" },
  { label: "YouTube", href: "#" },
];
