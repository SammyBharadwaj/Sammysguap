"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { ChartPanel } from "@/components/dashboard/chart-panel";
import { ChartTooltip } from "@/components/dashboard/chart-tooltip";
import type { CashFlowPoint } from "@/data/mock/dashboard";
import { chartColors } from "@/lib/chart-theme";

type CashFlowChartProps = {
  data: CashFlowPoint[];
};

function formatAxis(value: number) {
  return `$${(value / 1_000).toFixed(0)}k`;
}

export function CashFlowChart({ data }: CashFlowChartProps) {
  return (
    <ChartPanel
      title="Monthly cash flow"
      description="Income vs spending — last 6 months"
      className="min-h-0"
    >
      <ResponsiveContainer width="100%" height={220} minWidth={0}>
        <BarChart data={data} margin={{ top: 8, right: 4, left: -12, bottom: 0 }} barGap={4}>
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
            width={32}
          />
          <Tooltip content={<ChartTooltip />} cursor={{ fill: "hsl(240 4% 12% / 0.5)" }} />
          <Legend
            wrapperStyle={{ fontSize: 11, paddingTop: 12 }}
            iconType="circle"
            iconSize={8}
            formatter={(value) => (
              <span style={{ color: chartColors.axis }}>{value}</span>
            )}
          />
          <Bar
            dataKey="income"
            name="Income"
            fill={chartColors.income}
            radius={[4, 4, 0, 0]}
            maxBarSize={28}
          />
          <Bar
            dataKey="spending"
            name="Spending"
            fill={chartColors.spending}
            radius={[4, 4, 0, 0]}
            maxBarSize={28}
          />
        </BarChart>
      </ResponsiveContainer>
    </ChartPanel>
  );
}
