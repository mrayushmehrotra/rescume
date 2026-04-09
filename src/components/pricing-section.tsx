"use client";

import React from 'react';
import { Shield, Users, Rocket } from 'lucide-react';
import {
    PricingTable,
    PricingTableBody,
    PricingTableHeader,
    PricingTableHead,
    PricingTableRow,
    PricingTableCell,
    PricingTablePlan,
} from '@/components/ui/pricing-table';
import { Button } from '@/components/ui/button';

export function PricingSection() {
    return (
        <div className="relative w-full overflow-hidden px-4 py-24 border-t border-border/50 bg-card/20">
            <div className="relative mx-auto flex max-w-4xl flex-col items-center text-center mb-16">
                <h2 className="text-3xl font-heading mb-4 sm:text-5xl">
                    Simple, <span className="text-primary">Transparent</span> Pricing
                </h2>
                <p className="text-muted-foreground max-w-2xl">
                    Choose the plan that fits your career goals. Whether you're a student or a senior executive, we have a plan for you.
                </p>
            </div>

            <PricingTable className="mx-auto my-5 max-w-5xl">
                <PricingTableHeader>
                    <PricingTableRow>
                        <th />
                        <th className="p-1">
                            <PricingTablePlan
                                name="Solo"
                                badge="Free Forever"
                                price="$0"
                                compareAt="$9"
                                icon={Shield}
                            >
                                <Button variant="outline" className="w-full rounded-lg" size="lg">
                                    Choose Free
                                </Button>
                            </PricingTablePlan>
                        </th>
                        <th className="p-1">
                            <PricingTablePlan
                                name="Pro"
                                badge="Best for Active Seekers"
                                price="$19"
                                compareAt="$39"
                                icon={Users}
                                className="after:pointer-events-none after:absolute after:-inset-0.5 after:rounded-[inherit] after:bg-linear-to-b after:from-primary/20 after:to-transparent after:blur-[2px] border-primary/50 shadow-[0_0_20px_rgba(189,157,255,0.1)]"
                            >
                                <Button
                                    className="w-full rounded-lg bg-primary text-primary-foreground hover:bg-primary/90"
                                    size="lg"
                                >
                                    Go Pro
                                </Button>
                            </PricingTablePlan>
                        </th>
                        <th className="p-1">
                            <PricingTablePlan
                                name="Scale"
                                badge="Enterprise / Teams"
                                price="$49"
                                compareAt="$99"
                                icon={Rocket}
                            >
                                <Button variant="outline" className="w-full rounded-lg" size="lg">
                                    Contact Sales
                                </Button>
                            </PricingTablePlan>
                        </th>
                    </PricingTableRow>
                </PricingTableHeader>
                <PricingTableBody>
                    {RESUME_FEATURES.map((feature, index) => (
                        <PricingTableRow key={index}>
                            <PricingTableHead className="font-medium text-muted-foreground">{feature.label}</PricingTableHead>
                            {feature.values.map((value, idx) => (
                                <PricingTableCell key={idx} className="text-center">{value}</PricingTableCell>
                            ))}
                        </PricingTableRow>
                    ))}
                </PricingTableBody>
            </PricingTable>
        </div>
    );
}

const RESUME_FEATURES = [
    {
        label: 'Monthly Resumes',
        values: ['3', 'Unlimited', 'Unlimited'],
    },
    {
        label: 'AI Tailoring Tokens',
        values: ['5', 'Unlimited', 'Unlimited'],
    },
    {
        label: 'ATS Check',
        values: [true, true, true],
    },
    {
        label: 'Live PDF Preview',
        values: [true, true, true],
    },
    {
        label: 'LaTeX Source Access',
        values: [false, true, true],
    },
    {
        label: 'Cover Letter Gen',
        values: [false, true, true],
    },
    {
        label: 'Multi-device Sync',
        values: [false, true, true],
    },
    {
        label: 'Priority Support',
        values: [false, 'Email', '24/7 Dedicated'],
    },
    {
        label: 'Custom Branding',
        values: [false, false, true],
    },
];
