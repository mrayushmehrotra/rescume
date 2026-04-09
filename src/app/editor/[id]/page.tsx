"use client";

import { UserButton } from "@clerk/nextjs";
import {
  ArrowLeft,
  BrainCircuit,
  CheckCircle,
  ChevronLeft,
  ChevronRight,
  Edit3,
  History,
  Layout,
  Maximize2,
  Minus,
  Plus,
  Send,
  Settings,
  Settings2,
  Sparkles,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { Progress } from "@/components/ui/interfaces-progress";

export default function EditorPage() {
  const [title, setTitle] = useState("Senior_Software_Engineer_2024");
  const [activeTab, setActiveTab] = useState("latex");

  return (
    <div className="h-screen overflow-hidden flex flex-col bg-background text-foreground selection:bg-primary/30 antialiased">
      {/* Top Header */}
      <header className="fixed top-0 w-full flex justify-between items-center px-6 py-3 bg-background/80 backdrop-blur-xl z-50 border-b border-border/10">
        <div className="flex items-center gap-6">
          <Link
            href="/dashboard"
            className="hover:bg-foreground/5 p-2 rounded-full transition-all text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft size={20} />
          </Link>
          <div className="flex items-center gap-3">
            <input
              className="bg-transparent border-none focus:ring-0 text-foreground font-black text-lg p-0 w-auto tracking-tight"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <Edit3 size={14} className="text-muted-foreground cursor-pointer" />
          </div>
        </div>
        <div className="flex items-center gap-4">
          <button
            type="button"
            className="px-4 py-2 border border-border/50 text-foreground text-xs font-black uppercase tracking-widest hover:bg-foreground/5 transition-all rounded-md"
          >
            Export PDF
          </button>
          <button
            type="button"
            className="px-6 py-2 bg-primary text-primary-foreground text-xs font-black uppercase tracking-widest hover:shadow-[0_0_15px_rgba(189,157,255,0.4)] transition-all rounded-md"
          >
            Save
          </button>
          <div className="ml-2 flex items-center">
            <UserButton
              appearance={{
                elements: {
                  avatarBox: "h-8 w-8 border border-primary/20 rounded-full"
                }
              }}
            />
          </div>
        </div>
      </header>
      <div className="fixed top-[52px] w-full z-40 bg-background/50">
        <Progress value={45} className="h-0.5 rounded-none" />
      </div>

      {/* Side Navigation (Minimized) */}
      <nav className="fixed left-0 top-1/2 -translate-y-1/2 bg-card border border-border/50 rounded-r-xl py-4 flex flex-col gap-6 px-3 shadow-xl z-40">
        <button
          type="button"
          className="text-primary bg-primary/10 p-2 rounded-lg"
          title="Editor"
        >
          <Layout size={20} />
        </button>
        <button
          type="button"
          className="text-muted-foreground hover:text-foreground p-2 transition-all"
          title="AI Insights"
        >
          <BrainCircuit size={20} />
        </button>
        <button
          type="button"
          className="text-muted-foreground hover:text-foreground p-2 transition-all"
          title="Tailoring"
        >
          <Settings2 size={20} />
        </button>
        <button
          type="button"
          className="text-muted-foreground hover:text-foreground p-2 transition-all"
          title="Settings"
        >
          <Settings size={20} />
        </button>
      </nav>

      {/* Main Content Area */}
      <main className="flex-1 mt-16 flex overflow-hidden">
        {/* Left Panel: Editor & AI */}
        <section className="w-1/2 flex flex-col border-r border-border/10 bg-card/20 pb-4">
          {/* Editor Header / Tabs */}
          <div className="flex bg-card/50 border-b border-border/10 px-4 pt-2">
            <button
              type="button"
              onClick={() => setActiveTab("latex")}
              className={`px-6 py-3 text-xs font-mono font-bold border-b-2 transition-all ${activeTab === "latex"
                ? "text-primary border-primary"
                : "text-muted-foreground border-transparent"
                }`}
            >
              LaTeX Source
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("cv")}
              className={`px-6 py-3 text-xs font-mono font-bold border-b-2 transition-all ${activeTab === "cv"
                ? "text-primary border-primary"
                : "text-muted-foreground border-transparent"
                }`}
            >
              CV Mode
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("cl")}
              className={`px-6 py-3 text-xs font-mono font-bold border-b-2 transition-all ${activeTab === "cl"
                ? "text-primary border-primary"
                : "text-muted-foreground border-transparent"
                }`}
            >
              Cover Letter
            </button>
          </div>

          {/* Actual Editor Content (LaTeX) */}
          <div className="flex-1 overflow-y-auto p-6 font-mono text-sm leading-relaxed bg-background/50">
            <div className="flex gap-4">
              <div className="text-muted-foreground/30 select-none text-right w-8 shrink-0">
                1<br />2<br />3<br />4<br />5<br />6<br />7<br />8<br />9<br />
                10
                <br />
                11
                <br />
                12
                <br />
                13
                <br />
                14
                <br />
                15
                <br />
                16
              </div>
              <div className="flex-1 text-foreground/90">
                <span className="text-primary">\documentclass</span>
                <span>{"{resumestyle}"}</span>
                <br />
                <span className="text-primary">\begin</span>
                <span>{"{document}"}</span>
                <br />
                <br />
                <span className="text-secondary opacity-70">
                  % Header Information
                </span>
                <br />
                <span className="text-primary">\name</span>
                <span>{"{Alex Rivera}"}</span>
                <br />
                <span className="text-primary">\contact</span>
                <span>{"{San Francisco, CA | 555-0123}"}</span>
                <br />
                <br />
                <span className="text-primary">\section</span>
                <span>{"{Experience}"}</span>
                <br />
                <span className="text-primary">\entry</span>
                <span>{"{Senior Software Engineer}{Meta}{2021--Present}"}</span>
                <br />
                <span className="text-destructive">\itemize</span>
                <span>{"{"}</span>
                <br />
                <span className="ml-4 tracking-tight -leading-tight block">
                  \item Spearheaded migration of legacy services to Rust.
                </span>
                <span className="ml-4 tracking-tight -leading-tight block">
                  \item Optimized query latency by 40% across 50 nodes.
                </span>
                <span className="ml-4 tracking-tight -leading-tight block">
                  \item Mentored 12 junior engineers in distributed systems.
                </span>
                <span>{"}"}</span>
                <br />
                <br />
                <span className="text-primary">\section</span>
                <span>{"{Technical Skills}"}</span>
                <br />
                <span className="text-primary">\skills</span>
                <span>{"{Rust, TypeScript, Kubernetes, AWS, PostgreSQL}"}</span>
              </div>
            </div>
          </div>

          {/* AI Input Section (Fixed Bottom of Left Panel) */}
          <div className="p-6 bg-card/60 backdrop-blur-md border-t border-border/10 flex flex-col gap-4">
            <div className="flex gap-3 overflow-x-auto pb-1 no-scrollbar">
              <button
                type="button"
                className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold whitespace-nowrap hover:bg-primary/20 transition-all uppercase tracking-tighter shadow-sm"
              >
                <Sparkles size={14} />
                Tailor to JD
              </button>
              <button
                type="button"
                className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-card/80 border border-border/20 text-muted-foreground text-xs font-bold whitespace-nowrap hover:bg-foreground/5 transition-all uppercase tracking-tighter shadow-sm hover:text-foreground"
              >
                <History size={14} />
                Improve Bullets
              </button>
              <button
                type="button"
                className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-card/80 border border-border/20 text-muted-foreground text-xs font-bold whitespace-nowrap hover:bg-foreground/5 transition-all uppercase tracking-tighter shadow-sm hover:text-foreground"
              >
                <CheckCircle size={14} />
                Compliance Check
              </button>
            </div>
            <div className="relative group">
              <div className="absolute -inset-0.5 bg-linear-to-r from-primary to-secondary rounded-xl blur opacity-20 group-focus-within:opacity-40 transition duration-500" />
              <div className="relative flex items-center bg-background rounded-xl border border-border/50 p-1">
                <input
                  className="flex-1 bg-transparent border-none focus:ring-0 text-sm p-4 placeholder:text-muted-foreground/30 font-sans"
                  placeholder="Paste job description or ask AI to edit..."
                  type="text"
                />
                <button
                  type="button"
                  className="p-3 bg-primary text-primary-foreground rounded-lg mr-1 hover:scale-105 active:scale-95 transition-transform shadow-lg"
                >
                  <Send size={18} strokeWidth={2.5} />
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Right Panel: Live Preview */}
        <section className="w-1/2 flex flex-col items-center justify-start p-12 overflow-y-auto relative bg-background border-l border-white/5">
          {/* A4 Document Wrapper (Simulating the rendered PDF) */}
          <div className="bg-white w-[595px] min-h-[842px] shadow-[0_40px_80px_rgba(0,0,0,0.6)] p-12 flex flex-col text-[#19191f] mb-20 origin-top scale-[0.85] rounded-sm transform-gpu transition-transform hover:scale-[0.87]">
            <header className="text-center mb-8">
              <h1 className="text-4xl font-black tracking-tight mb-2 uppercase">
                ALEX RIVERA
              </h1>
              <p className="text-[10px] text-gray-600 font-black uppercase tracking-[0.2em]">
                San Francisco, CA • 555-0123 • alex.rivera@email.com
              </p>
            </header>

            <div className="mb-6">
              <h2 className="text-sm font-black border-b-2 border-gray-900 pb-1 mb-4 uppercase tracking-wider">
                Professional Experience
              </h2>
              <div className="mb-6">
                <div className="flex justify-between items-baseline mb-1">
                  <span className="font-bold text-lg">
                    Senior Software Engineer
                  </span>
                  <span className="text-xs text-gray-500 italic font-medium">
                    Jan 2021 – Present
                  </span>
                </div>
                <div className="text-sm font-bold text-gray-800 mb-2">
                  Meta, Infrastructure Team
                </div>
                <ul className="list-disc list-outside ml-5 text-[13px] text-gray-700 space-y-2 leading-snug">
                  <li>
                    Spearheaded migration of legacy performance monitoring
                    services from Python to Rust, reducing memory footprint by
                    70% and increasing throughput by 3x.
                  </li>
                  <li>
                    Optimized global query latency by 40% through implementation
                    of a custom caching layer across 50+ distributed nodes using
                    Redis and gRPC.
                  </li>
                  <li>
                    Mentored 12 junior engineers in distributed systems design
                    and performance engineering, improving team velocity by 25%.
                  </li>
                </ul>
              </div>
            </div>

            <div className="mb-6">
              <h2 className="text-sm font-black border-b-2 border-gray-900 pb-1 mb-4 uppercase tracking-wider">
                Education
              </h2>
              <div className="flex justify-between items-baseline">
                <div>
                  <span className="font-bold text-md">
                    B.S. in Computer Science
                  </span>
                  <span className="text-sm text-gray-800">
                    , Stanford University
                  </span>
                </div>
                <span className="text-xs text-gray-500 italic font-medium">
                  Sept 2016 – June 2020
                </span>
              </div>
            </div>

            <div>
              <h2 className="text-sm font-black border-b-2 border-gray-900 pb-1 mb-4 uppercase tracking-wider">
                Technical Skills
              </h2>
              <div className="text-sm text-gray-700 leading-relaxed grid grid-cols-[100px_1fr] gap-x-2 gap-y-1">
                <span className="font-bold">Languages:</span>{" "}
                <span>Rust, TypeScript, Go, Python, C++, SQL</span>
                <span className="font-bold">Frameworks:</span>{" "}
                <span>React, Node.js, Actix-web, TensorFlow, PyTorch</span>
                <span className="font-bold">Infra:</span>{" "}
                <span>Kubernetes, AWS (EC2, S3, RDS), PostgreSQL, Docker</span>
              </div>
            </div>
          </div>

          {/* Bottom Preview Controls (Floating) */}
          <div className="fixed bottom-8 left-[75%] -translate-x-1/2 bg-card/40 backdrop-blur-xl border border-white/10 rounded-full px-6 py-2.5 flex items-center gap-6 shadow-2xl z-50">
            <div className="flex items-center gap-4 border-r border-white/10 pr-6">
              <button
                type="button"
                className="hover:bg-white/10 p-1 rounded-full transition-all text-muted-foreground hover:text-foreground"
              >
                <Minus size={16} />
              </button>
              <span className="text-xs font-mono font-bold text-foreground w-8 text-center">
                90%
              </span>
              <button
                type="button"
                className="hover:bg-white/10 p-1 rounded-full transition-all text-muted-foreground hover:text-foreground"
              >
                <Plus size={16} />
              </button>
            </div>
            <div className="flex items-center gap-3 border-r border-white/10 pr-6">
              <button
                type="button"
                className="hover:bg-white/10 p-1 rounded-full transition-all text-muted-foreground hover:text-foreground"
              >
                <ChevronLeft size={16} />
              </button>
              <span className="text-xs font-mono font-bold text-foreground whitespace-nowrap">
                Page 1 of 1
              </span>
              <button
                type="button"
                className="hover:bg-white/10 p-1 rounded-full transition-all text-muted-foreground hover:text-foreground"
              >
                <ChevronRight size={16} />
              </button>
            </div>
            <button
              type="button"
              className="hover:text-primary transition-all text-muted-foreground"
            >
              <Maximize2 size={16} />
            </button>
          </div>
        </section>
      </main>
    </div>
  );
}
