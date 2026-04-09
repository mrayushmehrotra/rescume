"use client";

import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { lazy, Suspense, useState } from "react";

const Dithering = lazy(() =>
    import("@paper-design/shaders-react").then((mod) => ({
        default: mod.Dithering,
    })),
);

export function CTASection({
    href = "/sign-up",
    label = "Start Typing",
}: {
    href?: string;
    label?: string;
}) {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <section className="py-12 w-full flex justify-center items-center px-4 md:px-6">
            <div
                className="w-full max-w-7xl relative"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                role="presentation"
            >
                <div className="relative overflow-hidden rounded-[48px] border border-border bg-card shadow-sm min-h-[600px] md:min-h-[600px] flex flex-col items-center justify-center duration-500">
                    <Suspense fallback={<div className="absolute inset-0 bg-muted/20" />}>
                        <div className="absolute inset-0 z-0 pointer-events-none opacity-40 dark:opacity-30 mix-blend-multiply dark:mix-blend-screen">
                            <Dithering
                                colorBack="#00000000" // Transparent
                                colorFront="#bd9dff" // Rescume primary accent
                                shape="warp"
                                type="4x4"
                                speed={isHovered ? 0.6 : 0.2}
                                className="size-full"
                                minPixelRatio={1}
                            />
                        </div>
                    </Suspense>

                    <div className="relative z-10 px-6 max-w-4xl mx-auto text-center flex flex-col items-center">
                        <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-primary/10 bg-primary/5 px-4 py-1.5 text-sm font-medium text-primary backdrop-blur-sm">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
                            </span>
                            Flat 50% off to new customers
                        </div>

                        {/* Headline */}
                        <h2 className="font-heading text-5xl md:text-7xl lg:text-8xl font-medium tracking-tight text-foreground mb-8 leading-[1.05]">
                            Reshape your career, <br />
                            <span className="text-foreground/80">one job at a time.</span>
                        </h2>

                        {/* Description */}
                        <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mb-12 leading-relaxed">
                            The only AI-powered editor that gives you full LaTeX control and a live PDF preview.
                            Tailor your resume for any job description in seconds, not hours.
                        </p>

                        {/* Button */}
                        <Link
                            href={href}
                            className="group relative inline-flex h-14 items-center justify-center gap-3 overflow-hidden rounded-full bg-primary px-12 text-base font-medium text-primary-foreground transition-all duration-300 hover:bg-primary/90 hover:scale-105 active:scale-95 hover:ring-4 hover:ring-primary/20"
                        >
                            <span className="relative z-10">{label}</span>
                            <ArrowRight className="h-5 w-5 relative z-10 transition-transform duration-300 group-hover:translate-x-1" />
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}
