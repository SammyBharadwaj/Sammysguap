import Link from "next/link";
import { Wallet } from "lucide-react";

import { ThemeToggle } from "@/components/theme/theme-toggle";
import { appMeta } from "@/data/mock/dashboard";

type AppShellProps = {
  children: React.ReactNode;
};

export function AppShell({ children }: AppShellProps) {
  return (
    <div className="flex min-h-[100dvh] flex-col bg-background">
      <header
        className="sticky top-0 z-30 border-b border-border bg-background/90 backdrop-blur-md"
        style={{ paddingTop: "env(safe-area-inset-top)" }}
      >
        <div className="mx-auto flex h-12 max-w-5xl items-center justify-between px-4 sm:h-14 sm:px-6">
          <Link
            href="/dashboard"
            className="flex min-h-11 min-w-11 items-center gap-2 touch-manipulation"
          >
            <div className="flex size-8 shrink-0 items-center justify-center rounded-full border border-foreground/15 bg-primary">
              <Wallet className="size-4 text-primary-foreground" />
            </div>
            <span className="text-sm font-semibold tracking-tight">{appMeta.name}</span>
          </Link>
          <div className="flex items-center gap-1.5 sm:gap-2">
            <ThemeToggle />
            <div
              className="flex min-h-10 items-center gap-2 rounded-full border border-foreground/10 bg-card py-1 pl-1 pr-2.5 touch-manipulation"
              aria-label={`Signed in as ${appMeta.user.name}`}
            >
              <div className="flex size-7 items-center justify-center rounded-full bg-secondary text-[11px] font-semibold">
                {appMeta.user.initials}
              </div>
              <span className="hidden max-w-[100px] truncate text-xs font-medium sm:inline md:max-w-none">
                {appMeta.user.name}
              </span>
            </div>
          </div>
        </div>
      </header>
      <main className="flex-1 overflow-x-hidden">{children}</main>
    </div>
  );
}
