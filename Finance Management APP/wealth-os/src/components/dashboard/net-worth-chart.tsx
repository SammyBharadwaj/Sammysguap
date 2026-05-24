"use client";

import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { ChartPanel } from "@/components/dashboard/chart-panel";
import { ChartTooltip } from "@/components/dashboard/chart-tooltip";
import type { NetWorthPoint } from "@/data/mock/dashboard";
import { chartColors } from "@/lib/chart-theme";
import { formatCurrency } from "@/lib/utils";

type NetWorthChartProps = {
  data: NetWorthPoint[];
};

function formatAxis(value: number) {
  if (value >= 1_000_000) return `$${(value / 1_000_000).toFixed(1)}M`;
  if (value >= 1_000) return `$${(value / 1_000).toFixed(0)}k`;
  return `$${value}`;
}

export function NetWorthChart({ data }: NetWorthChartProps) {
  return (
    <ChartPanel
      title="Net worth"
      description="12-month trend across all accounts"
      className="min-h-[320px] lg:min-h-[360px]"
    >
      <ResponsiveContainer width="100%" height={280}>
        <AreaChart data={data} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="netWorthFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={chartColors.netWorth} stopOpacity={0.35} />
              <stop offset="100%" stopColor={chartColors.netWorth} stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid
            strokeDasharray="3 3"
            stroke={chartColors.grid}
            vertical={false}
          />
          <XAxis
            dataKey="month"
            axisLine={false}
            tickLine={false}
            tick={{ fill: chartColors.axis, fontSize: 11 }}
            dy={8}
          />
          <YAxis
            axisLine={false}
            tickLine={false}
            tick={{ fill: chartColors.axis, fontSize: 11 }}
            tickFormatter={formatAxis}
            width={48}
          />
          <Tooltip
            content={<ChartTooltip />}
            cursor={{ stroke: chartColors.grid, strokeWidth: 1 }}
          />
          <Area
            type="monotone"
            dataKey="netWorth"
            name="Net worth"
            stroke={chartColors.netWorth}
            strokeWidth={2}
            fill="url(#netWorthFill)"
            dot={false}
            activeDot={{ r: 4, fill: chartColors.netWorth, strokeWidth: 0 }}
          />
        </AreaChart>
      </ResponsiveContainer>
      <p className="mt-2 text-center text-[11px] text-muted-foreground">
        Peak this period: {formatCurrency(Math.max(...data.map((d) => d.netWorth)))}
      </p>
    </ChartPanel>
  );
}
