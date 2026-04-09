"use client";

import { Progress } from "@/components/ui/interfaces-progress";
import { CTASection } from "@/components/ui/hero-dithering-card";
import { Features } from "@/components/ui/features-5";
import {
  ImageComparison,
  ImageComparisonImage,
  ImageComparisonSlider,
} from "@/components/ui/image-comparison";
import { Show } from "@clerk/nextjs";
import { useEffect, useState } from "react";

export default function LoginPage() {
  const [progress, setProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress >= 100) {
          clearInterval(timer);
          setTimeout(() => setIsLoaded(true), 500);
          return 100;
        }
        const diff = Math.random() * 20;
        return Math.min(oldProgress + diff, 100);
      });
    }, 150);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <main className="relative min-h-screen flex flex-col items-center justify-start overflow-x-hidden bg-background">
      {/* Loading Overlay */}
      <div
        className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-background transition-all duration-700 ease-in-out ${isLoaded ? "-translate-y-full opacity-0" : "translate-y-0 opacity-100"
          }`}
      >
        <div className="w-full max-w-[240px] flex flex-col gap-6 items-center px-6">
          <div className="flex items-center gap-3 mb-2 animate-pulse">
            <span
              className="material-symbols-outlined text-primary text-3xl"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              auto_awesome
            </span>
            <span className="text-xl font-bold tracking-tighter text-foreground">
              Rescume
            </span>
          </div>
          <div className="w-full">
            <Progress value={progress} className="h-1" />
            <div className="flex justify-between mt-3">
              <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
                Loading Assets
              </span>
              <span className="text-[10px] font-mono font-bold text-primary">
                {Math.round(progress)}%
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Content Canvas */}
      <div
        className={`w-full transition-all duration-1000 delay-300 flex flex-col ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
      >
        <Show when="signed-out">
          <CTASection href="/sign-in" label="Get Started" />
        </Show>

        <Show when="signed-in">
          <CTASection href="/dashboard" label="Go to Dashboard" />
        </Show>

        {/* Comparison Section */}

        <div className="border-t border-border/50">
          <Features />
        </div>
        <div className="w-full max-w-5xl mx-auto px-6 py-24 flex flex-col items-center gap-12">
          <div className="text-center">
            <h2 className="text-3xl font-heading mb-4">Standard vs. Rescume AI</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              We only support Latex Coded resumes. Slide to see how our AI transforms basic bullet points into high-impact, performance-oriented highlights.
            </p>
          </div>
          <div className="w-full relative group">
            <ImageComparison className="aspect-16/9 w-full rounded-2xl border border-border shadow-2xl" enableHover>
              <ImageComparisonImage
                src="/simple_resume.png"
                className="object-contain"
                alt="Generic Resume Before"
                position="right"
              />
              <ImageComparisonImage
                src="/latex_resume.jpg"
                className="object-contain "

                alt="AI Optimized Resume After"
                position="left"
              />
              <ImageComparisonSlider className="w-1 bg-primary/50 backdrop-blur-md">
                <div className="absolute top-1/2 left-1/2 size-10 -translate-x-1/2 -translate-y-1/2 rounded-full bg-background border-4 border-primary shadow-xl flex items-center justify-center">
                  <span className="material-symbols-outlined text-primary scale-75 select-none">swap_horiz</span>
                </div>
              </ImageComparisonSlider>
            </ImageComparison>
          
          </div>
        </div>

      </div>

    </main>
  );
}
