"use client";

import { Bell, Menu, Search } from "lucide-react";

import { appMeta } from "@/data/mock/dashboard";
import { cn } from "@/lib/utils";

type TopbarProps = {
  title: string;
  subtitle?: string;
  onMenuClick?: () => void;
  className?: string;
};

export function Topbar({ title, subtitle, onMenuClick, className }: TopbarProps) {
  return (
    <header
      className={cn(
        "sticky top-0 z-30 flex h-14 shrink-0 items-center gap-3 border-b border-border/80 bg-background/80 px-4 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60 lg:px-6",
        className,
      )}
    >
      <button
        type="button"
        onClick={onMenuClick}
        className="inline-flex size-9 items-center justify-center rounded-lg border border-border/80 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground lg:hidden"
        aria-label="Open navigation"
      >
        <Menu className="size-4" />
      </button>

      <div className="min-w-0 flex-1">
        <h1 className="truncate text-sm font-semibold tracking-tight text-foreground sm:text-base">
          {title}
        </h1>
        {subtitle ? (
          <p className="truncate text-xs text-muted-foreground">{subtitle}</p>
        ) : null}
      </div>

      <div className="hidden items-center gap-2 sm:flex">
        <label className="relative">
          <span className="sr-only">Search</span>
          <Search className="pointer-events-none absolute left-2.5 top-1/2 size-3.5 -translate-y-1/2 text-muted-foreground" />
          <input
            type="search"
            placeholder="Search accounts, transactions…"
            disabled
            className="h-9 w-56 rounded-lg border border-border/80 bg-card/50 pl-8 pr-3 text-xs text-foreground placeholder:text-muted-foreground/70 outline-none ring-offset-background transition focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-60 xl:w-72"
          />
        </label>
      </div>

      <button
        type="button"
        className="inline-flex size-9 items-center justify-center rounded-lg border border-border/80 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
        aria-label="Notifications"
      >
        <Bell className="size-4" />
      </button>

      <div className="flex items-center gap-2 rounded-lg border border-border/80 bg-card/40 py-1 pl-1 pr-2.5">
        <div className="flex size-7 items-center justify-center rounded-md bg-primary/15 text-[11px] font-semibold text-primary">
          {appMeta.user.initials}
        </div>
        <div className="hidden min-w-0 sm:block">
          <p className="truncate text-xs font-medium leading-none text-foreground">
            {appMeta.user.name}
          </p>
          <p className="truncate text-[10px] text-muted-foreground">{appMeta.user.plan}</p>
        </div>
      </div>
    </header>
  );
}
