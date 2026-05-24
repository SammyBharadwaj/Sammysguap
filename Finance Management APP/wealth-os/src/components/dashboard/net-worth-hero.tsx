"use client";

import { useMemo, useState } from "react";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { ChartTooltip } from "@/components/dashboard/chart-tooltip";
import {
  accountLines,
  chartTimeframes,
  netWorthHistoryByAccount,
  netWorthSnapshot,
  type ChartTimeframe,
  type NetWorthHistoryPoint,
} from "@/data/mock/accounts";
import { appMeta, dashboardSummary } from "@/data/mock/dashboard";
import { chartColors } from "@/lib/chart-theme";
import { cn, formatCurrency, formatPercent } from "@/lib/utils";

function sliceByTimeframe(
  data: NetWorthHistoryPoint[],
  timeframe: ChartTimeframe,
): NetWorthHistoryPoint[] {
  const slices: Record<ChartTimeframe, number> = {
    "1W": 2,
    "1M": 3,
    "3M": 4,
    "1Y": 6,
    ALL: data.length,
  };
  return data.slice(-slices[timeframe]);
}

export function NetWorthHero() {
  const [timeframe, setTimeframe] = useState<ChartTimeframe>("3M");
  const [visible, setVisible] = useState<Record<string, boolean>>(() =>
    Object.fromEntries(
      accountLines.map((a) => [
        a.key,
        a.key === "netWorth" || a.key === "bank" || a.key === "investments",
      ]),
    ),
  );

  const chartData = useMemo(
    () => sliceByTimeframe(netWorthHistoryByAccount, timeframe),
    [timeframe],
  );

  const isPositive = netWorthSnapshot.changeAmount >= 0;

  const toggleLine = (key: string) => {
    setVisible((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <section className="border-b border-foreground/10 pb-6 sm:pb-8">
      <div className="mb-4 sm:mb-6">
        <h1 className="font-serif text-2xl tracking-tight text-foreground sm:text-4xl">
          {dashboardSummary.greeting},{" "}
          <span className="italic">{appMeta.user.name.split(" ")[0]}</span>
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Here&apos;s how your wealth is tracking.
        </p>
      </div>

      <div className="mb-1">
        <p className="font-mono text-[1.75rem] font-medium leading-tight tabular-nums tracking-tight sm:text-5xl">
          {formatCurrency(netWorthSnapshot.total)}
        </p>
        <p
          className={cn(
            "mt-1.5 text-sm font-medium tabular-nums sm:text-base",
            isPositive ? "text-positive" : "text-negative",
          )}
        >
          <span className="block sm:inline">
            {isPositive ? "+" : ""}
            {formatCurrency(netWorthSnapshot.changeAmount)} (
            {formatPercent(netWorthSnapshot.changePercent)})
          </span>
          <span className="mt-0.5 block text-muted-foreground sm:mt-0 sm:inline sm:before:content-['_']">
            {netWorthSnapshot.periodLabel}
          </span>
        </p>
      </div>

      <div className="mt-5 h-[200px] w-full min-w-0 sm:mt-6 sm:h-[260px]">
        <ResponsiveContainer width="100%" height="100%" minWidth={0}>
          <LineChart
            data={chartData}
            margin={{ top: 8, right: 8, left: -8, bottom: 0 }}
          >
            <CartesianGrid stroke={chartColors.grid} vertical={false} />
            <XAxis
              dataKey="label"
              axisLine={false}
              tickLine={false}
              tick={{ fill: chartColors.axis, fontSize: 10 }}
              dy={8}
              interval="preserveStartEnd"
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: chartColors.axis, fontSize: 10 }}
              tickFormatter={(v) => `$${(Number(v) / 1000).toFixed(0)}k`}
              width={36}
            />
            <Tooltip
              content={<ChartTooltip />}
              cursor={{ stroke: chartColors.grid, strokeWidth: 1 }}
            />
            {accountLines.map((account) =>
              visible[account.key] ? (
                <Line
                  key={account.key}
                  type="monotone"
                  dataKey={account.key}
                  name={account.label}
                  stroke={account.color}
                  strokeWidth={account.key === "netWorth" ? 2.5 : 1.5}
                  dot={false}
                  activeDot={{ r: 5, strokeWidth: 0 }}
                  strokeDasharray={account.key === "credit" ? "4 4" : undefined}
                />
              ) : null,
            )}
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="-mx-4 mt-4 flex gap-2 overflow-x-auto px-4 pb-1 scrollbar-none sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0">
        {accountLines.map((account) => (
          <button
            key={account.id}
            type="button"
            onClick={() => toggleLine(account.key)}
            className={cn(
              "inline-flex shrink-0 items-center gap-1.5 rounded-full border px-3 py-2 text-xs font-medium transition-colors touch-manipulation sm:py-1 sm:text-[11px]",
              visible[account.key]
                ? "border-foreground/15 bg-card text-foreground"
                : "border-transparent bg-muted text-muted-foreground",
            )}
          >
            <span
              className="size-2.5 rounded-full sm:size-2"
              style={{ backgroundColor: account.color }}
            />
            {account.label}
          </button>
        ))}
      </div>

      <div className="mt-4 grid grid-cols-5 gap-1.5 sm:flex sm:gap-1">
        {chartTimeframes.map((tf) => (
          <button
            key={tf}
            type="button"
            onClick={() => setTimeframe(tf)}
            className={cn(
              "min-h-10 rounded-lg px-1 py-2 text-xs font-medium transition-colors touch-manipulation sm:min-h-0 sm:rounded-md sm:px-2.5 sm:py-1",
              timeframe === tf
                ? "bg-foreground text-background"
                : "bg-muted/60 text-muted-foreground active:bg-muted",
            )}
          >
            {tf}
          </button>
        ))}
      </div>
    </section>
  );
}
