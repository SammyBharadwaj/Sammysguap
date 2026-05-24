"use client";

import { formatCurrency } from "@/lib/utils";

type TooltipPayloadItem = {
  name?: string;
  value?: number | string;
  color?: string;
};

type ChartTooltipProps = {
  active?: boolean;
  payload?: TooltipPayloadItem[];
  label?: string | number;
  valueFormatter?: (value: number) => string;
};

export function ChartTooltip({
  active,
  payload,
  label,
  valueFormatter = (v) => formatCurrency(Number(v)),
}: ChartTooltipProps) {
  if (!active || !payload?.length) return null;

  return (
    <div className="rounded-lg border border-foreground/10 bg-card px-3 py-2 text-xs shadow-md">
      {label ? (
        <p className="mb-1.5 font-medium text-foreground">{label}</p>
      ) : null}
      <ul className="space-y-1">
        {payload.map((entry) => (
          <li key={String(entry.name)} className="flex items-center gap-2">
            <span
              className="size-2 shrink-0 rounded-full"
              style={{ backgroundColor: entry.color }}
            />
            <span className="text-muted-foreground">{entry.name}</span>
            <span className="ml-auto font-mono font-medium tabular-nums text-foreground">
              {valueFormatter(Number(entry.value))}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
