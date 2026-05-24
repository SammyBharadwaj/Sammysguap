import { AlertTriangle, Lightbulb, TrendingUp } from "lucide-react";
import type { LucideIcon } from "lucide-react";

import type { InsightTone, SmartInsight } from "@/data/mock/dashboard";
import { cn } from "@/lib/utils";

type InsightCardProps = {
  insight: SmartInsight;
  className?: string;
};

/** Pastels used only on insight cards (secondary accents) */
const toneConfig: Record<
  InsightTone,
  { icon: LucideIcon; border: string; bg: string; iconColor: string }
> = {
  positive: {
    icon: TrendingUp,
    border: "border-pastel-mint/60",
    bg: "bg-pastel-mint/25",
    iconColor: "text-positive",
  },
  warning: {
    icon: AlertTriangle,
    border: "border-pastel-peach/60",
    bg: "bg-pastel-peach/25",
    iconColor: "text-negative",
  },
  neutral: {
    icon: Lightbulb,
    border: "border-pastel-lavender/60",
    bg: "bg-pastel-lavender/30",
    iconColor: "text-foreground",
  },
};

export function InsightCard({ insight, className }: InsightCardProps) {
  const config = toneConfig[insight.tone];
  const Icon = config.icon;

  return (
    <article
      className={cn(
        "rounded-xl border p-4",
        config.border,
        config.bg,
        className,
      )}
    >
      <div className="flex gap-3">
        <div className={cn("mt-0.5 shrink-0", config.iconColor)}>
          <Icon className="size-4" />
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-2">
            <h3 className="text-sm font-semibold leading-snug">{insight.title}</h3>
            {insight.metric ? (
              <span className="shrink-0 rounded-full border border-foreground/10 bg-card px-2 py-0.5 font-mono text-[10px] tabular-nums text-muted-foreground">
                {insight.metric}
              </span>
            ) : null}
          </div>
          <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">
            {insight.body}
          </p>
        </div>
      </div>
    </article>
  );
}
