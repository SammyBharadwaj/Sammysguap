"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ArrowLeftRight,
  Landmark,
  LayoutDashboard,
  PieChart,
  Settings,
  Sparkles,
  Wallet,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

import { appMeta, navigation, type NavItem } from "@/data/mock/dashboard";
import { cn } from "@/lib/utils";

const iconMap: Record<string, LucideIcon> = {
  "layout-dashboard": LayoutDashboard,
  landmark: Landmark,
  "arrow-left-right": ArrowLeftRight,
  "pie-chart": PieChart,
  sparkles: Sparkles,
  settings: Settings,
};

type SidebarProps = {
  onNavigate?: () => void;
  className?: string;
};

function NavLink({ item, active, onNavigate }: { item: NavItem; active: boolean; onNavigate?: () => void }) {
  const Icon = iconMap[item.icon] ?? LayoutDashboard;

  if (item.disabled) {
    return (
      <span
        className="flex cursor-not-allowed items-center gap-3 rounded-lg px-3 py-2 text-sm text-muted-foreground/50"
        title="Coming soon"
      >
        <Icon className="size-4 shrink-0 opacity-50" />
        <span>{item.label}</span>
        <span className="ml-auto rounded-md border border-border/60 px-1.5 py-0.5 text-[10px] font-medium uppercase tracking-wide text-muted-foreground/60">
          Soon
        </span>
      </span>
    );
  }

  return (
    <Link
      href={item.href}
      onClick={onNavigate}
      className={cn(
        "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
        active
          ? "bg-sidebar-accent text-sidebar-accent-foreground shadow-sm"
          : "text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground",
      )}
    >
      <Icon className={cn("size-4 shrink-0", active && "text-primary")} />
      <span>{item.label}</span>
      {item.badge ? (
        <span className="ml-auto rounded-full bg-primary/15 px-2 py-0.5 text-[10px] font-semibold text-primary">
          {item.badge}
        </span>
      ) : null}
    </Link>
  );
}

export function Sidebar({ onNavigate, className }: SidebarProps) {
  const pathname = usePathname();

  return (
    <aside
      className={cn(
        "flex h-full w-64 shrink-0 flex-col border-r border-sidebar-border bg-sidebar/95 backdrop-blur-xl",
        className,
      )}
    >
      <div className="flex h-14 items-center gap-2.5 border-b border-sidebar-border px-4">
        <div className="flex size-8 items-center justify-center rounded-lg bg-primary/15 text-primary ring-1 ring-primary/25">
          <Wallet className="size-4" />
        </div>
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold tracking-tight text-sidebar-foreground">
            {appMeta.name}
          </p>
          <p className="truncate text-[11px] text-muted-foreground">{appMeta.tagline}</p>
        </div>
      </div>

      <nav className="flex-1 space-y-1 overflow-y-auto p-3" aria-label="Main navigation">
        <p className="px-3 pb-2 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground/70">
          Overview
        </p>
        {navigation.map((item) => (
          <NavLink
            key={item.id}
            item={item}
            active={pathname === item.href || pathname.startsWith(`${item.href}/`)}
            onNavigate={onNavigate}
          />
        ))}
      </nav>

      <div className="border-t border-sidebar-border p-3">
        <div className="rounded-lg border border-border/60 bg-card/40 p-3">
          <p className="text-xs font-medium text-foreground">Local-first</p>
          <p className="mt-1 text-[11px] leading-relaxed text-muted-foreground">
            Your data stays on this device. Connect accounts when you&apos;re ready.
          </p>
        </div>
      </div>
    </aside>
  );
}
