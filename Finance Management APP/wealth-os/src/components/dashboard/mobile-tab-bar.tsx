"use client";

import { LayoutGrid, Wallet } from "lucide-react";

import type { DashboardTab } from "@/components/dashboard/dashboard-tabs";
import { cn } from "@/lib/utils";

type MobileTabBarProps = {
  active: DashboardTab;
  onChange: (tab: DashboardTab) => void;
};

const items: { id: DashboardTab; label: string; icon: typeof LayoutGrid }[] = [
  { id: "overview", label: "Overview", icon: LayoutGrid },
  { id: "budgeting", label: "Budgeting", icon: Wallet },
];

export function MobileTabBar({ active, onChange }: MobileTabBarProps) {
  return (
    <nav
      aria-label="Dashboard navigation"
      className="fixed inset-x-0 bottom-0 z-40 border-t border-foreground/10 bg-background/95 backdrop-blur-lg md:hidden"
      style={{ paddingBottom: "max(0.5rem, env(safe-area-inset-bottom))" }}
    >
      <div className="mx-auto flex max-w-lg">
        {items.map((item) => {
          const Icon = item.icon;
          const isActive = active === item.id;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onChange(item.id)}
              className={cn(
                "flex min-h-[3.25rem] flex-1 flex-col items-center justify-center gap-0.5 px-2 py-2 text-[11px] font-medium transition-colors touch-manipulation",
                isActive ? "text-foreground" : "text-muted-foreground",
              )}
              aria-current={isActive ? "page" : undefined}
            >
              <Icon className={cn("size-5", isActive && "text-brand")} strokeWidth={isActive ? 2.25 : 1.75} />
              {item.label}
            </button>
          );
        })}
      </div>
    </nav>
  );
}
