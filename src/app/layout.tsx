import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SmoothScroll } from "@/components/providers/SmoothScroll";
import { ScrollProgress } from "@/components/ui/ScrollProgress";
import { Spotlight } from "@/components/ui/Spotlight";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Nero AI — The AI workspace for modern teams",
  description:
    "Nero AI connects your tools, automates your workflows, and amplifies your team's productivity with context-aware intelligence.",
  openGraph: {
    title: "Nero AI — The AI workspace for modern teams",
    description:
      "Context-aware AI that understands your work. Automate tasks, unify your stack, and ship faster.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full scroll-smooth antialiased`}
    >
      <body className="min-h-full overflow-x-hidden bg-[var(--nero-bg)] text-[var(--nero-text)]">
        <ScrollProgress />
        <Spotlight />
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
