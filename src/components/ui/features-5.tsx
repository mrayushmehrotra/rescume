import { Activity, DraftingCompass, Mail, Zap } from 'lucide-react'

export function Features() {
    return (
        <section className="py-16 md:py-32">
            <div className="mx-auto max-w-xl md:max-w-6xl px-6">
                <div className="grid items-center gap-12 md:grid-cols-2 md:gap-12 lg:grid-cols-5 lg:gap-24">
                    <div className="lg:col-span-2">
                        <div className="md:pr-6 lg:pr-0">
                            <h2 className="text-4xl font-heading lg:text-5xl">Built for Modern Careers</h2>
                            <p className="mt-6 text-muted-foreground text-lg">
                                Rescume eliminates the friction of manual tailoring. Land more interviews with a platform optimized for speed and ATS compatibility.
                            </p>
                        </div>
                        <ul className="mt-8 divide-y border-y border-border/50 *:flex *:items-center *:gap-3 *:py-3 text-sm">
                            <li className="hover:text-primary transition-colors">
                                <Zap className="size-5 text-primary" />
                                AI Resume Editor
                            </li>
                            <li className="hover:text-primary transition-colors">
                                <Activity className="size-5 text-primary" />
                                Real-time PDF Rendering
                            </li>
                            <li className="hover:text-primary transition-colors">
                                <DraftingCompass className="size-5 text-primary" />
                                LaTeX Source as Truth
                            </li>
                            <li className="hover:text-primary transition-colors">
                                <Mail className="size-5 text-primary" />
                                ATS-Friendly Export
                            </li>
                        </ul>
                    </div>
                    <div className="border-border/50 relative rounded-3xl border p-3 lg:col-span-3">
                        <div className="bg-linear-to-b aspect-76/59 relative rounded-2xl from-primary/20 to-transparent p-px">
                            <div className="relative size-full overflow-hidden rounded-xl bg-card">
                                <img
                                    src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200&auto=format&fit=crop"
                                    className="hidden size-full object-cover dark:block opacity-90"
                                    alt="Rescume analytics dashboard dark"
                                />
                                <img
                                    src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1200&auto=format&fit=crop"
                                    className="size-full object-cover shadow dark:hidden"
                                    alt="Rescume analytics dashboard light"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
