"use client";

import { cn } from "@/lib/utils";
import { Mail, ShieldCheck, Zap } from "lucide-react";

export function Newsletter() {
    return (
        <section className="w-full bg-slate-950/50 px-6 py-24 border-t border-border/50">
            <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-12">
                <div className="max-w-md w-full text-center md:text-left">
                    <h2 className="text-3xl font-heading font-bold text-foreground sm:text-4xl">
                        Stay ahead of the <span className="text-primary italic">curve</span>
                    </h2>
                    <p className="text-muted-foreground mt-4 text-sm leading-relaxed">
                        Get weekly AI resume-building tips, ATS updates, and career growth strategies delivered directly to your inbox.
                    </p>
                    <div className="flex flex-col sm:flex-row items-center gap-3 mt-10">
                        <input
                            className="h-12 px-5 w-full bg-background/50 outline-none focus:ring-2 focus:ring-primary/20 transition-all border border-border rounded-full text-sm"
                            type="email"
                            placeholder="your@email.com"
                        />
                        <button className="h-12 w-full sm:w-auto bg-primary hover:bg-primary/90 transition-all px-8 rounded-full text-primary-foreground font-bold text-sm whitespace-nowrap shadow-[0_0_20px_rgba(189,157,255,0.2)] active:scale-95">
                            Subscribe
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 md:max-w-lg">
                    <div className="space-y-4">
                        <div className="flex items-center gap-3">
                            <div className="bg-primary/10 w-max p-2.5 rounded-xl border border-primary/20">
                                <Zap className="size-5 text-primary" />
                            </div>
                            <h3 className="text-base font-heading font-semibold text-foreground">Weekly Insights</h3>
                        </div>
                        <p className="text-muted-foreground text-xs leading-relaxed">
                            Deep dives into AI prompt engineering for resumes and interview preparation.
                        </p>
                    </div>

                    <div className="space-y-4">
                        <div className="flex items-center gap-3">
                            <div className="bg-primary/10 w-max p-2.5 rounded-xl border border-primary/20">
                                <ShieldCheck className="size-5 text-primary" />
                            </div>
                            <h3 className="text-base font-heading font-semibold text-foreground">Privacy First</h3>
                        </div>
                        <p className="text-muted-foreground text-xs leading-relaxed">
                            Zero spam. We value your career data and your inbox's sanity. Unsubscribe anytime.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};
