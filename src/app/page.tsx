"use client";

import { Progress } from "@/components/ui/interfaces-progress";
import Image from "next/image";
import Link from "next/link";
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
    <main className="relative min-h-screen flex flex-col items-center justify-center p-6 overflow-hidden bg-background">
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
            <span className="text-xl font-black tracking-tighter text-foreground">
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

      {/* Background Radial Glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at center, rgba(189, 157, 255, 0.12) 0%, rgba(14, 14, 19, 0) 70%)",
        }}
      />

      {/* Content Canvas */}
      <div
        className={`w-full max-w-[440px] z-10 transition-all duration-1000 delay-300 ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
      >
        {/* Identity Section */}
        <div className="flex flex-col items-center mb-10 text-center">
          <div className="flex items-center gap-3 mb-4">
            <span
              className="material-symbols-outlined text-primary text-4xl"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              auto_awesome
            </span>
            <h1 className="text-3xl font-black tracking-tighter text-foreground">
              Rescume
            </h1>
          </div>
          <p className="text-muted-foreground text-lg font-medium tracking-tight">
            Tailor your resume for every job, in seconds.
          </p>
        </div>

        {/* Auth Card */}
        <div className="bg-card/40 backdrop-blur-xl p-8 rounded-xl border border-primary/15 shadow-[0_20px_40px_rgba(0,0,0,0.4),0_0_20px_rgba(189,157,255,0.05)]">
          <div className="flex flex-col gap-3 mb-8">
            <button
              type="button"
              className="w-full bg-white text-black font-bold py-3 px-4 rounded-lg flex items-center justify-center gap-3 hover:bg-gray-100 transition-all active:scale-[0.98]"
            >
              <Image
                alt="Google Logo"
                width={20}
                height={20}
                src="/google.svg"
              />
              <span>Continue with Google</span>
            </button>
          </div>

          {/* Divider */}
          <div className="flex items-center gap-4 mb-8">
            <div className="h-px flex-1 bg-border/30" />
            <span className="text-muted-foreground text-xs uppercase tracking-widest font-bold">
              or
            </span>
            <div className="h-px flex-1 bg-border/30" />
          </div>

          {/* Form Section */}
          <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
            <div className="space-y-1.5">
              <label
                htmlFor="email"
                className="text-xs font-bold text-muted-foreground uppercase tracking-tighter px-1"
              >
                Email Address
              </label>
              <input
                id="email"
                className="w-full bg-background border-none focus:ring-1 focus:ring-primary text-foreground rounded-lg py-3 px-4 font-mono text-sm transition-all placeholder:text-muted-foreground/30"
                placeholder="engineer@alpha.com"
                type="email"
              />
            </div>
            <div className="space-y-1.5">
              <div className="flex justify-between items-center px-1">
                <label
                  htmlFor="password"
                  className="text-xs font-bold text-muted-foreground uppercase tracking-tighter"
                >
                  Password
                </label>
                <Link
                  href="#"
                  className="text-xs font-bold text-primary hover:underline"
                >
                  Forgot?
                </Link>
              </div>
              <input
                id="password"
                className="w-full bg-background border-none focus:ring-1 focus:ring-primary text-foreground rounded-lg py-3 px-4 font-mono text-sm transition-all placeholder:text-muted-foreground/30"
                placeholder="••••••••"
                type="password"
              />
            </div>
            <button
              className="w-full bg-primary text-primary-foreground font-black uppercase tracking-widest py-4 rounded-lg mt-4 shadow-[0_0_15px_rgba(189,157,255,0.2)] hover:shadow-[0_0_25px_rgba(189,157,255,0.4)] transition-all duration-300 active:scale-95"
              type="submit"
            >
              Sign In
            </button>
          </form>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center">
          <p className="text-muted-foreground text-sm">
            Don&apos;t have an account?
            <Link
              href="#"
              className="text-primary font-bold hover:text-primary/80 transition-colors ml-1"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>

      {/* Decorative Corner Accents */}
      <div className="fixed top-0 left-0 p-8 opacity-20 hidden md:block">
        <div className="text-[10px] font-mono text-primary leading-tight">
          SYSTEM_STATUS: ONLINE
          <br />
          ENCRYPTION: AES_256
          <br />
          CORE: RESCUME_V4.0
        </div>
      </div>
      <div className="fixed bottom-0 right-0 p-8 opacity-20 hidden md:block">
        <div className="text-[10px] font-mono text-primary leading-tight text-right">
          COORD: 40.7128° N, 74.0060° W<br />
          SESSION_TOKEN: NULL_AUTH
          <br />
          RES_ARCH: OBSIDIAN
        </div>
      </div>
    </main>
  );
}
