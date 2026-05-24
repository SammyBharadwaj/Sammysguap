"use client";

import { cn } from "@/lib/utils";

export type DashboardTab = "overview" | "budgeting";

type DashboardTabsProps = {
  active: DashboardTab;
  onChange: (tab: DashboardTab) => void;
  className?: string;
};

const tabs: { id: DashboardTab; label: string }[] = [
  { id: "overview", label: "Overview" },
  { id: "budgeting", label: "Budgeting" },
];

export function DashboardTabs({ active, onChange, className }: DashboardTabsProps) {
  return (
    <div
      role="tablist"
      aria-label="Dashboard sections"
      className={cn("hidden gap-1 border-b border-foreground/10 md:flex", className)}
    >
      {tabs.map((tab) => (
        <button
          key={tab.id}
          type="button"
          role="tab"
          aria-selected={active === tab.id}
          onClick={() => onChange(tab.id)}
          className={cn(
            "-mb-px min-h-11 border-b-2 px-4 py-2.5 text-sm font-medium transition-colors touch-manipulation",
            active === tab.id
              ? "border-foreground text-foreground"
              : "border-transparent text-muted-foreground hover:text-foreground",
          )}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
