"use client";

import { Progress } from "@/components/ui/interfaces-progress";

export default function ProgressDemo() {
  return (
    <div className="flex w-full min-h-screen items-center justify-center bg-background p-8 overflow-hidden">
      <div className="w-full max-w-sm space-y-4">
        <Progress value={60} />
      </div>
    </div>
  );
}
