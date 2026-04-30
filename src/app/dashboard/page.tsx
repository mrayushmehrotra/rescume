"use client";

import { UserButton } from "@clerk/nextjs";
import {
  FileText,
  MoreVertical as MoreVerticalIcon,
  Plus as PlusIcon,
  Search as SearchIcon,
  Clock,
  Loader2,
} from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { trpc } from "@/lib/trpc";
import { useState } from "react";

export default function DashboardPage() {
  const pathname = usePathname();
  const router = useRouter();
  const [isCreating, setIsCreating] = useState(false);

  // Fetch resumes
  const { data: resumes, isLoading } = trpc.resume.list.useQuery();

  // Create resume mutation
  const createResume = trpc.resume.create.useMutation({
    onSuccess: (data) => {
      router.push(`/editor/${data.id}`);
    },
    onSettled: () => {
      setIsCreating(false);
    },
  });

  const handleCreateNew = async () => {
    if (isCreating) return;
    setIsCreating(true);
    createResume.mutate({ title: "Untitled Resume" });
  };

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
              className={
                pathname === "/dashboard"
                  ? "text-primary border-b-2 border-primary pb-1 font-medium tracking-tight"
                  : "text-muted-foreground hover:text-foreground transition-colors font-medium tracking-tight"
              }
            >
              Dashboard
            </Link>
            <Link
              href="/settings"
              className={
                pathname === "/settings"
                  ? "text-primary border-b-2 border-primary pb-1 font-medium tracking-tight"
                  : "text-muted-foreground hover:text-foreground transition-colors font-medium tracking-tight"
              }
            >
              Settings
            </Link>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={handleCreateNew}
            disabled={isCreating}
            className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold bg-primary text-primary-foreground scale-95 active:opacity-80 transition-transform hover:bg-primary/90 shadow-[0_0_15px_rgba(189,157,255,0.3)] disabled:opacity-50"
          >
            {isCreating ? (
              <Loader2 className="animate-spin" size={16} />
            ) : (
              <PlusIcon size={16} strokeWidth={3} />
            )}
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
                  avatarBox: "h-8 w-8 border border-border/50 rounded-full",
                },
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
        </header>

        {/* Bento Grid Layout for Resumes */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Add New Resume Placeholder */}
          <button
            type="button"
            onClick={handleCreateNew}
            disabled={isCreating}
            className="group relative bg-card/20 border-2 border-dashed border-border/30 rounded-xl p-6 flex flex-col items-center justify-center gap-4 transition-all hover:border-primary/50 hover:bg-primary/5 min-h-[240px] disabled:opacity-50"
          >
            <div className="w-12 h-12 rounded-full bg-card flex items-center justify-center group-hover:bg-primary/20 transition-colors">
              {isCreating ? (
                <Loader2 className="animate-spin text-primary" />
              ) : (
                <PlusIcon className="text-muted-foreground group-hover:text-primary transition-colors" />
              )}
            </div>
            <div className="text-center">
              <span className="block text-foreground font-bold">
                {isCreating ? "Creating..." : "New Resume"}
              </span>
              <span className="block text-xs text-muted-foreground">
                Ssdasdtart from a template or import
              </span>
            </div>
          </button>

          {/* Render real resumes */}
          {isLoading ? (
            <div className="col-span-full flex justify-center py-20">
              <Loader2 className="animate-spin text-primary/40" size={40} />
            </div>
          ) : (
            resumes?.map((resume) => (
              <Link
                key={resume.id}
                href={`/editor/${resume.id}`}
                className="group relative bg-card/30 border border-border/50 rounded-2xl p-6 hover:border-primary/30 hover:bg-card/50 transition-all hover:shadow-[0_10px_40px_rgba(0,0,0,0.1)] flex flex-col justify-between h-[240px]"
              >
                <div className="flex justify-between items-start">
                  <div className="p-2.5 rounded-xl bg-primary/10 text-primary">
                    <FileText size={22} />
                  </div>
                  <button className="p-1 hover:bg-foreground/5 rounded-lg transition-colors text-muted-foreground hover:text-foreground">
                    <MoreVerticalIcon size={20} />
                  </button>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <h3 className="font-bold text-lg leading-tight group-hover:text-primary transition-colors line-clamp-2">
                      {resume.title}
                    </h3>
                    <div className="flex items-center gap-3 text-xs text-muted-foreground font-medium">
                      <span className="flex items-center gap-1">
                        <Clock size={12} />{" "}
                        {new Date(resume.updatedAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))
          )}
        </div>
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

function TemplateCard({
  title,
  description,
  tag,
  color,
  icon,
}: {
  title: string;
  description: string;
  tag: string;
  color: string;
  icon: string;
}) {
  return (
    <div className="group relative bg-card/40 border border-border/50 rounded-xl p-5 hover:border-primary/40 hover:bg-card/60 transition-all cursor-pointer flex flex-col gap-4">
      <div
        className={`w-10 h-10 rounded-lg ${color} flex items-center justify-center`}
      >
        <span className="material-symbols-outlined text-primary text-xl">
          {icon}
        </span>
      </div>
      <div>
        <div className="flex items-center gap-2 mb-1">
          <h3 className="font-bold text-sm tracking-tight text-foreground">
            {title}
          </h3>
          <span className="text-[10px] bg-primary/10 text-primary px-1.5 py-0.5 rounded uppercase font-black tracking-tighter">
            {tag}
          </span>
        </div>
        <p className="text-xs text-muted-foreground leading-relaxed">
          {description}
        </p>
      </div>
      <button
        type="button"
        className="mt-2 w-full py-2 bg-foreground/5 text-foreground text-[10px] font-black uppercase tracking-widest rounded-md opacity-0 group-hover:opacity-100 transition-opacity hover:bg-primary hover:text-white"
      >
        Use Template
      </button>
    </div>
  );
}
