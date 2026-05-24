"use client";

import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

import { ChartPanel } from "@/components/dashboard/chart-panel";
import { ChartTooltip } from "@/components/dashboard/chart-tooltip";
import type { AllocationSlice } from "@/data/mock/dashboard";
import { allocationPalette, chartColors } from "@/lib/chart-theme";
import { formatCurrency } from "@/lib/utils";

type AllocationChartProps = {
  data: AllocationSlice[];
};

export function AllocationChart({ data }: AllocationChartProps) {
  const chartData = data.map((slice, index) => ({
    ...slice,
    fill: allocationPalette[index % allocationPalette.length],
  }));

  return (
    <ChartPanel
      title="Account allocation"
      description="Portfolio mix by account type"
      className="min-h-0 sm:min-h-[320px]"
    >
      <div className="flex flex-col items-center gap-4 md:flex-row md:items-center">
        <div className="h-[180px] w-full max-w-[180px] shrink-0 sm:h-[200px] sm:max-w-[200px]">
          <ResponsiveContainer width="100%" height="100%" minWidth={0}>
            <PieChart>
              <Pie
                data={chartData}
                dataKey="value"
                nameKey="label"
                cx="50%"
                cy="50%"
                innerRadius={58}
                outerRadius={88}
                paddingAngle={2}
                stroke="transparent"
              >
                {chartData.map((entry) => (
                  <Cell key={entry.id} fill={entry.fill} />
                ))}
              </Pie>
              <Tooltip
                content={
                  <ChartTooltip
                    valueFormatter={(v) => formatCurrency(v)}
                  />
                }
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <ul className="w-full space-y-2 md:flex-1">
          {chartData.map((slice) => (
            <li key={slice.id} className="flex items-center gap-2 text-xs">
              <span
                className="size-2.5 shrink-0 rounded-full"
                style={{ backgroundColor: slice.fill }}
              />
              <span className="min-w-0 flex-1 truncate text-muted-foreground">{slice.label}</span>
              <span className="shrink-0 font-mono tabular-nums text-foreground">
                {slice.percent}%
              </span>
              <span className="shrink-0 font-mono text-[10px] tabular-nums text-muted-foreground">
                {formatCurrency(slice.value)}
              </span>
            </li>
          ))}
        </ul>
      </div>

      <p
        className="mt-4 text-center text-[11px] text-muted-foreground sm:text-left"
        style={{ color: chartColors.axis }}
      >
        Total: {formatCurrency(data.reduce((sum, s) => sum + s.value, 0))}
      </p>
    </ChartPanel>
  );
}
