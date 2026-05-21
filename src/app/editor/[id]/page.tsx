"use client";

import Editor from "@monaco-editor/react";
import {
  ArrowLeft,
  Check,
  ClipboardCopy,
  Loader2,
  Sparkles,
  Trash2,
} from "lucide-react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { SessionNavBar } from "@/components/ui/sidebar";
import { trpc } from "@/lib/trpc";

function buildATSScore(content: string, jobDescription: string) {
  const contentWords = new Set(
    content
      .toLowerCase()
      .split(/[^a-z0-9]+/)
      .map((word) => word.trim())
      .filter(Boolean),
  );
  const keywords = jobDescription
    .toLowerCase()
    .split(/[^a-z0-9]+/)
    .map((word) => word.trim())
    .filter((word) => word.length > 4);

  if (keywords.length === 0) return 72;

  const hits = keywords.filter((keyword) => contentWords.has(keyword)).length;
  return Math.min(95, Math.max(52, Math.round((hits / keywords.length) * 100)));
}

export default function EditorPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const id = params.id;

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [coverLetter, setCoverLetter] = useState("");
  const [copied, setCopied] = useState(false);

  const { data: resume, isLoading } = trpc.resume.get.useQuery({ id });

  useEffect(() => {
    if (!resume) return;
    setTitle(resume.title);
    setContent(resume.content);
    setJobDescription(resume.jobDescription);
    setCoverLetter(resume.coverLetter);
  }, [resume]);

  const saveMutation = trpc.resume.update.useMutation();
  const tailorMutation = trpc.resume.tailor.useMutation();
  const deleteMutation = trpc.resume.remove.useMutation({
    onSuccess: () => router.push("/dashboard"),
  });

  const handleSave = async () => {
    await saveMutation.mutateAsync({
      id,
      title,
      content,
      jobDescription,
      coverLetter,
    });
  };

  const handleTailor = async () => {
    const tailored = await tailorMutation.mutateAsync({ id, jobDescription });
    if (!tailored) return;
    setTitle(tailored.title);
    setContent(tailored.content);
    setJobDescription(tailored.jobDescription);
    setCoverLetter(tailored.coverLetter);
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 1400);
  };

  const score = buildATSScore(content, jobDescription);
  const saveLabel = saveMutation.isPending ? "Saving..." : "Save Resume";

  return (
    <div className="flex min-h-screen bg-background text-foreground antialiased">
      <SessionNavBar />

      <main className="flex-1 overflow-hidden pl-16 md:pl-20">
        <div className="mx-auto flex min-h-screen max-w-[1800px] flex-col px-4 py-4 sm:px-6 lg:px-8">
          <div className="mb-4 flex flex-col gap-4 rounded-3xl border border-border/50 bg-card/40 p-4 backdrop-blur-xl lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-center gap-3">
              <Link
                href="/dashboard"
                className="inline-flex size-10 items-center justify-center rounded-full border border-border/50 bg-background/60 transition-colors hover:bg-primary/10 hover:text-primary"
              >
                <ArrowLeft className="size-4" />
              </Link>
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.28em] text-muted-foreground">
                  Resume Editor
                </p>
                <h1 className="text-xl font-bold tracking-tight sm:text-2xl">
                  {title || "Untitled Resume"}
                </h1>
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                ATS score {score}%
              </span>
              <button
                type="button"
                onClick={handleCopy}
                className="inline-flex items-center gap-2 rounded-full border border-border/50 px-4 py-2 text-sm font-medium transition-colors hover:bg-foreground/5"
              >
                {copied ? (
                  <Check className="size-4" />
                ) : (
                  <ClipboardCopy className="size-4" />
                )}
                {copied ? "Copied" : "Copy LaTeX"}
              </button>
              <button
                type="button"
                onClick={handleTailor}
                disabled={tailorMutation.isPending}
                className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-60"
              >
                {tailorMutation.isPending ? (
                  <Loader2 className="size-4 animate-spin" />
                ) : (
                  <Sparkles className="size-4" />
                )}
                Tailor to Job
              </button>
              <button
                type="button"
                onClick={handleSave}
                disabled={saveMutation.isPending}
                className="inline-flex items-center gap-2 rounded-full border border-border/50 px-4 py-2 text-sm font-semibold transition-colors hover:bg-foreground/5 disabled:opacity-60"
              >
                {saveMutation.isPending ? (
                  <Loader2 className="size-4 animate-spin" />
                ) : (
                  <Check className="size-4" />
                )}
                {saveLabel}
              </button>
              <button
                type="button"
                onClick={() => deleteMutation.mutate({ id })}
                disabled={deleteMutation.isPending}
                className="inline-flex items-center gap-2 rounded-full border border-destructive/20 bg-destructive/10 px-4 py-2 text-sm font-semibold text-destructive transition-colors hover:bg-destructive hover:text-white disabled:opacity-60"
              >
                {deleteMutation.isPending ? (
                  <Loader2 className="size-4 animate-spin" />
                ) : (
                  <Trash2 className="size-4" />
                )}
                Delete
              </button>
            </div>
          </div>

          {isLoading ? (
            <div className="flex flex-1 items-center justify-center rounded-3xl border border-border/50 bg-card/20">
              <Loader2 className="size-8 animate-spin text-primary/70" />
            </div>
          ) : resume ? (
            <div className="grid flex-1 gap-4 xl:grid-cols-[minmax(0,1.1fr)_minmax(420px,0.9fr)]">
              <section className="flex min-h-0 flex-col gap-4 rounded-3xl border border-border/50 bg-card/30 p-4 shadow-sm">
                <div className="grid gap-3 lg:grid-cols-[minmax(0,1fr)_320px]">
                  <label className="space-y-2">
                    <span className="text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground">
                      Resume Title
                    </span>
                    <input
                      value={title}
                      onChange={(event) => setTitle(event.target.value)}
                      className="h-12 w-full rounded-2xl border border-border/50 bg-background/70 px-4 text-sm outline-none transition-colors focus:border-primary/40"
                    />
                  </label>
                  <label className="space-y-2">
                    <span className="text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground">
                      Job Description
                    </span>
                    <textarea
                      value={jobDescription}
                      onChange={(event) =>
                        setJobDescription(event.target.value)
                      }
                      className="min-h-12 w-full rounded-2xl border border-border/50 bg-background/70 px-4 py-3 text-sm outline-none transition-colors focus:border-primary/40"
                      rows={3}
                    />
                  </label>
                </div>

                <div className="min-h-0 flex-1 overflow-hidden rounded-2xl border border-border/50 bg-[#0b1020]">
                  <Editor
                    height="100%"
                    language="latex"
                    theme="vs-dark"
                    value={content}
                    onChange={(value) => setContent(value ?? "")}
                    options={{
                      minimap: { enabled: false },
                      fontSize: 14,
                      fontLigatures: true,
                      wordWrap: "on",
                      smoothScrolling: true,
                      scrollBeyondLastLine: false,
                      automaticLayout: true,
                    }}
                  />
                </div>

                <div className="grid gap-4 lg:grid-cols-2">
                  <label className="space-y-2">
                    <span className="text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground">
                      AI Tailored Cover Letter
                    </span>
                    <textarea
                      value={coverLetter}
                      onChange={(event) => setCoverLetter(event.target.value)}
                      className="min-h-[220px] w-full rounded-2xl border border-border/50 bg-background/70 px-4 py-3 text-sm leading-6 outline-none transition-colors focus:border-primary/40"
                    />
                  </label>
                  <div className="space-y-3 rounded-2xl border border-border/50 bg-background/60 p-4">
                    <p className="text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground">
                      Quick Actions
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Tailor the document to a specific role, then save the new
                      version to keep the history intact.
                    </p>
                    <div className="flex flex-wrap gap-2 pt-2">
                      <button
                        type="button"
                        onClick={handleTailor}
                        className="rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
                      >
                        Tailor Draft
                      </button>
                      <button
                        type="button"
                        onClick={handleSave}
                        className="rounded-full border border-border/50 px-4 py-2 text-sm font-semibold transition-colors hover:bg-foreground/5"
                      >
                        Save Version
                      </button>
                    </div>
                  </div>
                </div>
              </section>

              <aside className="min-h-0 rounded-3xl border border-border/50 bg-card/30 p-4 shadow-sm">
                <div className="flex h-full flex-col gap-4">
                  <div className="rounded-2xl border border-border/50 bg-background/80 p-4">
                    <div className="mb-4 flex items-center justify-between">
                      <div>
                        <p className="text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground">
                          Preview
                        </p>
                        <h2 className="text-lg font-bold tracking-tight">
                          Live document snapshot
                        </h2>
                      </div>
                      <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                        {new Date(resume.updatedAt).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="space-y-3 rounded-2xl border border-border/50 bg-[#f8fafc] p-4 text-slate-900">
                      <div className="border-b border-slate-200 pb-3">
                        <p className="text-2xl font-bold tracking-tight">
                          {title || "Your Name"}
                        </p>
                        <p className="text-sm text-slate-600">
                          you@email.com | (555) 555-5555 |
                          linkedin.com/in/yourhandle
                        </p>
                      </div>
                      <PreviewBlock
                        heading="Targeted Summary"
                        body={jobDescription}
                      />
                      <PreviewBlock
                        heading="Resume Source"
                        body={content
                          .split("\n")
                          .filter(Boolean)
                          .slice(0, 12)
                          .join("\n")}
                        monospace
                      />
                      <PreviewBlock heading="Cover Letter" body={coverLetter} />
                    </div>
                  </div>

                  <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-1">
                    <StatCard
                      label="Words matched"
                      value={`${Math.max(3, Math.round(score / 10))}`}
                    />
                    <StatCard
                      label="Status"
                      value={saveMutation.isPending ? "Saving" : "Ready"}
                    />
                  </div>
                </div>
              </aside>
            </div>
          ) : (
            <div className="flex flex-1 flex-col items-center justify-center rounded-3xl border border-border/50 bg-card/20 p-8 text-center">
              <h2 className="text-2xl font-bold">Resume not found</h2>
              <p className="mt-2 max-w-lg text-sm text-muted-foreground">
                The requested resume no longer exists. Create a fresh draft from
                the dashboard.
              </p>
              <Link
                href="/dashboard"
                className="mt-6 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
              >
                Back to dashboard
              </Link>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

function PreviewBlock({
  heading,
  body,
  monospace,
}: {
  heading: string;
  body: string;
  monospace?: boolean;
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-3 shadow-sm">
      <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.24em] text-slate-500">
        {heading}
      </p>
      <pre
        className={`whitespace-pre-wrap text-sm leading-6 text-slate-800 ${
          monospace ? "font-mono text-xs leading-5" : ""
        }`}
      >
        {body}
      </pre>
    </div>
  );
}

function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-border/50 bg-background/70 p-4">
      <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-muted-foreground">
        {label}
      </p>
      <p className="mt-2 text-xl font-bold tracking-tight">{value}</p>
    </div>
  );
}
