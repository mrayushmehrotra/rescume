"use client";

import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";
import { trpc } from "@/lib/trpc";

export default function NewEditorPage() {
  const router = useRouter();
  const didRun = useRef(false);
  const createResume = trpc.resume.create.useMutation({
    onSuccess: (data) => {
      router.replace(`/editor/${data.id}`);
    },
  });

  useEffect(() => {
    if (didRun.current) return;
    didRun.current = true;
    createResume.mutate({
      title: "Untitled Resume",
      content: String.raw`\documentclass[11pt]{article}
\begin{document}
Hello, world.
\end{document}`,
      jobDescription: "",
      coverLetter: "",
    });
  }, [createResume]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-6 text-center">
      <div className="max-w-md space-y-4">
        <Loader2 className="mx-auto size-8 animate-spin text-primary" />
        <h1 className="text-2xl font-bold tracking-tight">
          Creating your editor
        </h1>
        <p className="text-sm text-muted-foreground">
          Preparing a new resume workspace and redirecting you into the editor.
        </p>
      </div>
    </div>
  );
}
