"use client";

import { UserButton } from "@clerk/nextjs";
import {
  FileText,
  MoreVertical as MoreVerticalIcon,
  Plus as PlusIcon,
  Search as SearchIcon,
} from "lucide-react";
import Link from "next/link";

const resumes = [
  {
    id: 1,
    title: "Senior Backend Engineer — Stripe",
    date: "Oct 24, 2023",
    tags: ["Tailored", "Cover Letter"],
    status: "tailored",
  },
  {
    id: 2,
    title: "Full Stack Developer — Vercel",
    date: "Oct 12, 2023",
    tags: ["Draft"],
    status: "draft",
  },
  {
    id: 3,
    title: "System Architect — General Motors",
    date: "Sep 28, 2023",
    tags: ["Tailored"],
    status: "tailored",
  },
  {
    id: 4,
    title: "Cloud Security Lead — AWS",
    date: "Aug 15, 2023",
    tags: ["Draft", "Cover Letter"],
    status: "draft",
  },
];

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-primary/30 antialiased">
      {/* Top Navbar */}
      <nav className="fixed top-0 w-full flex justify-between items-center px-6 py-3 bg-background/80 backdrop-blur-xl z-50 border-b border-border/10">
        <div className="flex items-center gap-8">
          <Link
            href="/"
            className="text-xl font-black tracking-tighter text-foreground flex items-center gap-2"
          >
            <span
              className="material-symbols-outlined text-primary"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              auto_awesome
            </span>
            Rescume
          </Link>
          <div className="hidden md:flex items-center gap-6">
            <Link
              href="/dashboard"
              className="text-primary border-b-2 border-primary pb-1 font-medium tracking-tight"
            >
              Dashboard
            </Link>
            <Link
              href="#"
              className="text-muted-foreground hover:text-foreground transition-colors font-medium tracking-tight"
            >
              Templates
            </Link>
            <Link
              href="#"
              className="text-muted-foreground hover:text-foreground transition-colors font-medium tracking-tight"
            >
              History
            </Link>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <button
            type="button"
            className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold bg-primary text-primary-foreground scale-95 active:opacity-80 transition-transform hover:bg-primary/90 shadow-[0_0_15px_rgba(189,157,255,0.3)]"
          >
            <PlusIcon size={16} strokeWidth={3} />
            New Resume
          </button>
          <button
            type="button"
            className="text-muted-foreground hover:text-foreground transition-colors p-2 rounded-lg hover:bg-foreground/5"
          >
            <span className="material-symbols-outlined">auto_awesome</span>
          </button>
          <div className="ml-2 flex items-center">
            <UserButton
              appearance={{
                elements: {
                  avatarBox: "h-8 w-8 border border-border/50 rounded-full"
                }
              }}
            />
          </div>
        </div>
      </nav>

      {/* Main Canvas */}
      <main className="pt-24 pb-20 px-6 max-w-7xl mx-auto">
        {/* Header Section */}
        <header className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h1 className="text-4xl font-black tracking-tighter text-foreground mb-2">
              My Resumes
            </h1>
            <p className="text-muted-foreground max-w-md">
              Manage and tailor your professional engineering profiles for
              top-tier opportunities.
            </p>
          </div>
          <div className="relative group w-full md:w-80 font-mono">
            <SearchIcon
              className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors"
              size={18}
            />
            <input
              className="w-full bg-card/50 border-none rounded-lg py-3 pl-10 pr-4 text-foreground placeholder:text-muted-foreground/50 focus:ring-1 focus:ring-primary/50 text-sm transition-all"
              placeholder="Search by role or company..."
              type="text"
            />
          </div>
        </header>

        {/* Bento Grid Layout for Resumes */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
       

          {/* Add New Resume Placeholder */}
          <button
            type="button"
            className="group relative bg-card/20 border-2 border-dashed border-border/30 rounded-xl p-6 flex flex-col items-center justify-center gap-4 transition-all hover:border-primary/50 hover:bg-primary/5 min-h-[220px]"
          >
            <div className="w-12 h-12 rounded-full bg-card flex items-center justify-center group-hover:bg-primary/20 transition-colors">
              <PlusIcon className="text-muted-foreground group-hover:text-primary transition-colors" />
            </div>
            <div className="text-center">
              <span className="block text-foreground font-bold">
                New Resume
              </span>
              <span className="block text-xs text-muted-foreground">
                Start from a template or import
              </span>
            </div>
          </button>
        </div>

        {/* AI Insights Floating Banner */}
        <section className="mt-16 relative overflow-hidden rounded-2xl bg-card/30 backdrop-blur-xl border border-white/5 p-8">
          <div className="absolute top-0 left-0 w-64 h-64 bg-primary/10 blur-[100px] -z-10"></div>
          <div className="flex flex-col md:flex-row gap-8 items-center justify-between">
            <div className="flex gap-6 items-center">
              <div className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center border border-primary/20">
                <span
                  className="material-symbols-outlined text-primary text-3xl"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  psychology
                </span>
              </div>
              <div>
                <h4 className="text-xl font-bold text-foreground">
                  Career Optimization Insight
                </h4>
                <p className="text-muted-foreground mt-1">
                  Based on current market trends, adding{" "}
                  <span className="text-primary/80 font-mono font-bold italic">
                    Rust
                  </span>{" "}
                  or{" "}
                  <span className="text-primary/80 font-mono font-bold italic">
                    WebAssembly
                  </span>{" "}
                  could increase your response rate by 24% for System Architect
                  roles.
                </p>
              </div>
            </div>
            <button
              type="button"
              className="whitespace-nowrap px-6 py-2 rounded-lg bg-card/50 text-primary border border-primary/20 hover:bg-primary/10 transition-all font-bold text-sm tracking-tight"
            >
              Analyze My Profile
            </button>
          </div>
        </section>
      </main>

      {/* Bottom Navigation (Mobile Only) */}
      <div className="md:hidden fixed bottom-0 left-0 w-full bg-card flex justify-around items-center py-4 px-6 z-50 border-t border-border/10">
        <button
          type="button"
          className="flex flex-col items-center gap-1 text-primary"
        >
          <span
            className="material-symbols-outlined"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            dashboard
          </span>
          <span className="text-[10px] font-bold uppercase tracking-widest">
            Dashboard
          </span>
        </button>
        <button
          type="button"
          className="flex flex-col items-center gap-1 text-muted-foreground"
        >
          <span className="material-symbols-outlined">description</span>
          <span className="text-[10px] font-bold uppercase tracking-widest">
            Resumes
          </span>
        </button>
        <button
          type="button"
          className="flex flex-col items-center gap-1 text-muted-foreground"
        >
          <span className="material-symbols-outlined">auto_awesome</span>
          <span className="text-[10px] font-bold uppercase tracking-widest">
            AI Tools
          </span>
        </button>
        <button
          type="button"
          className="flex flex-col items-center gap-1 text-muted-foreground"
        >
          <span className="material-symbols-outlined">settings</span>
          <span className="text-[10px] font-bold uppercase tracking-widest">
            Settings
          </span>
        </button>
      </div>
    </div>
  );
}
