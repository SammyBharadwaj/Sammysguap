import { ArrowDownRight, ArrowUpRight, Minus } from "lucide-react";

import type { DashboardMetric } from "@/data/mock/dashboard";
import { cn, formatCurrency, formatPercent } from "@/lib/utils";

type MetricCardProps = {
  metric: DashboardMetric;
  className?: string;
};

function formatValue(metric: DashboardMetric) {
  if (metric.format === "percent") {
    return `${metric.value.toFixed(1)}%`;
  }
  return formatCurrency(metric.value);
}

function TrendIcon({ trend }: { trend: DashboardMetric["trend"] }) {
  if (trend === "up") return <ArrowUpRight className="size-3.5" />;
  if (trend === "down") return <ArrowDownRight className="size-3.5" />;
  return <Minus className="size-3.5" />;
}

export function MetricCard({ metric, className }: MetricCardProps) {
  const isPositiveChange = metric.change > 0;
  const lowerIsBetter = ["spending", "monthly-spend", "debt"].includes(metric.id);
  const changeIsGood = lowerIsBetter ? !isPositiveChange : isPositiveChange;

  return (
    <article
      className={cn(
        "rounded-xl border border-foreground/10 bg-card p-3.5 transition-colors active:bg-muted/30 sm:p-4 sm:hover:border-foreground/20",
        className,
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
            {metric.label}
          </p>
          {metric.description ? (
            <p className="text-[10px] text-muted-foreground">{metric.description}</p>
          ) : null}
        </div>
        <span
          className={cn(
            "inline-flex items-center gap-0.5 rounded-full border px-2 py-0.5 text-[10px] font-medium tabular-nums",
            changeIsGood
              ? "border-positive/30 bg-positive/10 text-positive"
              : "border-negative/30 bg-negative/10 text-negative",
          )}
        >
          <TrendIcon trend={metric.trend} />
          {formatPercent(metric.change)}
        </span>
      </div>

      <p className="mt-3 font-mono text-xl font-semibold tabular-nums tracking-tight text-foreground">
        {formatValue(metric)}
      </p>
      <p className="mt-1 text-[11px] text-muted-foreground">{metric.periodLabel}</p>
    </article>
  );
}
