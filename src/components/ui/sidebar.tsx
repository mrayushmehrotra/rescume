"use client";

import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import {
    Blocks,
    ChevronsUpDown,
    FileClock,
    GraduationCap,
    Layout,
    LayoutDashboard,
    LogOut,
    MessageSquareText,
    MessagesSquare,
    Plus,
    Settings,
    UserCircle,
    UserCog,
    UserSearch,
    Sparkles,
    FileText,
    Shield,
    Bell,
    CreditCard,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useUser, SignOutButton } from "@clerk/nextjs";

const sidebarVariants = {
    open: {
        width: "16rem",
    },
    closed: {
        width: "4rem",
    },
};

const variants = {
    open: {
        x: 0,
        opacity: 1,
        transition: {
            x: { stiffness: 1000, velocity: -100 },
        },
    },
    closed: {
        x: -20,
        opacity: 0,
        transition: {
            x: { stiffness: 100 },
        },
    },
};

const transitionProps = {
    type: "spring",
    stiffness: 300,
    damping: 30,
} as const;

const staggerVariants = {
    open: {
        transition: { staggerChildren: 0.03, delayChildren: 0.1 },
    },
};

export function SessionNavBar() {
    const [isCollapsed, setIsCollapsed] = useState(true);
    const pathname = usePathname();
    const { user } = useUser();

    return (
        <motion.div
            className={cn(
                "fixed left-0 z-40 h-full shrink-0 border-r border-border/10 bg-background/80 backdrop-blur-xl",
            )}
            initial={isCollapsed ? "closed" : "open"}
            animate={isCollapsed ? "closed" : "open"}
            variants={sidebarVariants}
            transition={transitionProps}
            onMouseEnter={() => setIsCollapsed(false)}
            onMouseLeave={() => setIsCollapsed(true)}
        >
            <div className="flex flex-col h-full">
                {/* Header / Org Selector */}
                <div className="h-[64px] border-b border-border/10 flex items-center px-4">
                    <Link href="/" className="flex items-center gap-3">
                        <div className="size-8 bg-primary rounded-lg flex items-center justify-center shadow-[0_0_15px_rgba(189,157,255,0.4)]">
                            <span className="material-symbols-outlined text-white text-xl">auto_awesome</span>
                        </div>
                        {!isCollapsed && (
                            <motion.span variants={variants} className="font-heading font-bold tracking-tighter text-lg">
                                Rescume
                            </motion.span>
                        )}
                    </Link>
                </div>

                {/* Main Nav */}
                <ScrollArea className="flex-1 px-3 py-4">
                    <motion.div variants={staggerVariants} className="space-y-1">
                        <NavItem
                            href="/dashboard"
                            icon={<LayoutDashboard className="size-4" />}
                            label="Dashboard"
                            active={pathname === "/dashboard"}
                            isCollapsed={isCollapsed}
                        />
                        <NavItem
                            href="/editor/new"
                            icon={<Plus className="size-4" />}
                            label="New Resume"
                            active={pathname?.includes("editor")}
                            isCollapsed={isCollapsed}
                            badge="AI"
                        />
                        <NavItem
                            href="/dashboard/history"
                            icon={<FileClock className="size-4" />}
                            label="History"
                            active={pathname === "/dashboard/history"}
                            isCollapsed={isCollapsed}
                        />

                        <Separator className="my-4 bg-border/10" />

                        <NavItem
                            href="/templates"
                            icon={<Layout className="size-4" />}
                            label="Templates"
                            active={pathname === "/templates"}
                            isCollapsed={isCollapsed}
                        />
                        <NavItem
                            href="/help"
                            icon={<GraduationCap className="size-4" />}
                            label="Help Center"
                            active={pathname === "/help"}
                            isCollapsed={isCollapsed}
                        />

                        <Separator className="my-4 bg-border/10" />

                        {!isCollapsed && (
                            <motion.p
                                variants={variants}
                                className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest px-3 mb-2"
                            >
                                Settings
                            </motion.p>
                        )}

                        <NavItem
                            href="/settings/profile"
                            icon={<UserCircle className="size-4" />}
                            label="Profile"
                            active={pathname === "/settings/profile"}
                            isCollapsed={isCollapsed}
                        />
                        <NavItem
                            href="/settings/security"
                            icon={<Shield className="size-4" />}
                            label="Security"
                            active={pathname === "/settings/security"}
                            isCollapsed={isCollapsed}
                        />
                        <NavItem
                            href="/settings/notifications"
                            icon={<Bell className="size-4" />}
                            label="Notifications"
                            active={pathname === "/settings/notifications"}
                            isCollapsed={isCollapsed}
                        />
                        <NavItem
                            href="/settings/billing"
                            icon={<CreditCard className="size-4" />}
                            label="Billing"
                            active={pathname === "/settings/billing"}
                            isCollapsed={isCollapsed}
                        />
                        <NavItem
                            href="/settings/preferences"
                            icon={<Settings className="size-4" />}
                            label="Preferences"
                            active={pathname === "/settings/preferences"}
                            isCollapsed={isCollapsed}
                        />
                    </motion.div>
                </ScrollArea>

                {/* Footer / User Profile */}
                <div className="p-3 border-t border-border/10">
                    <DropdownMenu modal={false}>
                        <DropdownMenuTrigger asChild>
                            <Button
                                variant="ghost"
                                className={cn(
                                    "w-full flex items-center gap-3 px-2 transition-all",
                                    isCollapsed ? "justify-center" : "justify-start"
                                )}
                            >
                                <Avatar className="size-6 border border-border/20">
                                    <AvatarImage src={user?.imageUrl} />
                                    <AvatarFallback className="bg-primary/10 text-primary text-[10px]">
                                        {user?.firstName?.charAt(0) || "U"}
                                    </AvatarFallback>
                                </Avatar>
                                {!isCollapsed && (
                                    <motion.div variants={variants} className="flex-1 text-left">
                                        <p className="text-sm font-medium truncate leading-none mb-1">
                                            {user?.fullName || "Account"}
                                        </p>
                                        <p className="text-[10px] text-muted-foreground truncate leading-none">
                                            {user?.primaryEmailAddress?.emailAddress}
                                        </p>
                                    </motion.div>
                                )}
                                {!isCollapsed && <ChevronsUpDown className="size-3 text-muted-foreground/50" />}
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="start" className="w-[200px]" sideOffset={12}>
                            <div className="px-2 py-1.5 flex flex-col gap-0.5">
                                <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest pl-1 mb-1">Session</p>
                                <DropdownMenuItem asChild>
                                    <Link href="/settings" className="flex items-center gap-2">
                                        <Settings className="size-4" /> Settings
                                    </Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem asChild>
                                    <Link href="/settings/profile" className="flex items-center gap-2">
                                        <UserCircle className="size-4" /> Profile
                                    </Link>
                                </DropdownMenuItem>
                            </div>
                            <DropdownMenuSeparator />
                            <SignOutButton>
                                <DropdownMenuItem className="text-destructive focus:bg-destructive/10 focus:text-destructive cursor-pointer flex items-center gap-2">
                                    <LogOut className="size-4" /> Sign Out
                                </DropdownMenuItem>
                            </SignOutButton>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
        </motion.div>
    );
}

function NavItem({
    href,
    icon,
    label,
    active,
    isCollapsed,
    badge
}: {
    href: string;
    icon: React.ReactNode;
    label: string;
    active?: boolean;
    isCollapsed: boolean;
    badge?: string;
}) {
    return (
        <Link
            href={href}
            className={cn(
                "flex h-9 w-full items-center rounded-lg px-3 transition-all duration-200 group",
                active
                    ? "bg-primary/10 text-primary border border-primary/20"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground border border-transparent"
            )}
        >
            <div className={cn("shrink-0 transition-transform group-hover:scale-110", active && "text-primary")}>
                {icon}
            </div>
            {!isCollapsed && (
                <motion.div
                    variants={variants}
                    className="ml-3 flex-1 flex items-center justify-between overflow-hidden"
                >
                    <span className="text-sm font-medium whitespace-nowrap">{label}</span>
                    {badge && (
                        <Badge className="ml-2 h-4 px-1 text-[8px] bg-primary/20 text-primary border-primary/20">
                            {badge}
                        </Badge>
                    )}
                </motion.div>
            )}
        </Link>
    );
}
