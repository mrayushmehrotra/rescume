"use client";

import { SessionNavBar } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";

export default function SettingsPage() {
    return (
        <div className="flex h-screen w-full bg-background overflow-hidden selection:bg-primary/30 antialiased font-sans">
            <SessionNavBar />

            <main className="flex-1 overflow-y-auto pl-16 md:pl-20 py-12 lg:py-20 px-6 lg:px-12">
                <div className="max-w-4xl mx-auto space-y-12">
                    {/* Header */}
                    <div className="space-y-2">
                        <h1 className="text-4xl font-heading font-bold tracking-tight text-foreground">Settings</h1>
                        <p className="text-muted-foreground text-lg">Manage your account preferences and system configuration.</p>
                    </div>

                    <Separator className="bg-border/10" />

                    {/* Advanced / Dangerous Area */}
                    <div className="pt-12">
                        <div className="p-6 rounded-2xl border border-destructive/20 bg-destructive/5 space-y-4">
                            <div className="flex flex-col gap-1">
                                <h3 className="text-destructive font-bold">Delete Account</h3>
                                <p className="text-sm text-destructive/70">Once you delete your account, all your resumes and tailored history will be permanently removed. This action is irreversible.</p>
                            </div>
                            <button className="px-5 py-2.5 rounded-xl border border-destructive/30 text-destructive text-sm font-bold hover:bg-destructive hover:text-white transition-all">
                                Terminate Account
                            </button>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
