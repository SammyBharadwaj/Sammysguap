"use client";

import { useMemo, useState, useCallback } from "react";
import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  ReferenceDot,
} from "recharts";

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

type HoverData = {
  value: number;
  label: string;
  index: number;
} | null;

export function NetWorthHero() {
  const [timeframe, setTimeframe] = useState<ChartTimeframe>("ALL");
  const [hoverData, setHoverData] = useState<HoverData>(null);
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
  const chartColor = isPositive ? "#00D632" : "#FF5252";

  const displayValue = hoverData?.value ?? netWorthSnapshot.total;
  const displayLabel = hoverData?.label ?? null;

  const handleMouseMove = useCallback((data: { activePayload?: Array<{ payload: NetWorthHistoryPoint }>; activeTooltipIndex?: number }) => {
    if (data.activePayload && data.activePayload.length > 0 && data.activeTooltipIndex !== undefined) {
      const point = data.activePayload[0].payload;
      setHoverData({
        value: point.netWorth,
        label: point.label,
        index: data.activeTooltipIndex,
      });
    }
  }, []);

  const handleMouseLeave = useCallback(() => {
    setHoverData(null);
  }, []);

  const toggleLine = (key: string) => {
    setVisible((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  // Find min and max for better Y axis domain
  const netWorthValues = chartData.map(d => d.netWorth);
  const minValue = Math.min(...netWorthValues);
  const maxValue = Math.max(...netWorthValues);
  const padding = (maxValue - minValue) * 0.1;

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

      {/* Robinhood-style value display */}
      <div className="mb-1">
        <p className="font-mono text-[1.75rem] font-semibold leading-tight tabular-nums tracking-tight sm:text-5xl">
          {formatCurrency(displayValue)}
        </p>
        <div className="mt-1.5 flex items-center gap-2">
          {displayLabel ? (
            <span className="text-sm text-muted-foreground">{displayLabel}</span>
          ) : (
            <>
              <span
                className={cn(
                  "flex items-center gap-1 text-sm font-medium tabular-nums",
                  isPositive ? "text-positive" : "text-negative",
                )}
              >
                {isPositive ? (
                  <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M7 14l5-5 5 5H7z" />
                  </svg>
                ) : (
                  <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M7 10l5 5 5-5H7z" />
                  </svg>
                )}
                {formatCurrency(Math.abs(netWorthSnapshot.changeAmount))} ({formatPercent(netWorthSnapshot.changePercent)})
              </span>
              <span className="text-sm text-muted-foreground">
                {netWorthSnapshot.periodLabel}
              </span>
            </>
          )}
        </div>
      </div>

      {/* Robinhood-style chart */}
      <div className="relative mt-5 h-[200px] w-full min-w-0 sm:mt-6 sm:h-[280px]">
        <ResponsiveContainer width="100%" height="100%" minWidth={0}>
          <AreaChart
            data={chartData}
            margin={{ top: 20, right: 8, left: 8, bottom: 0 }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          >
            <defs>
              <linearGradient id="netWorthGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={chartColor} stopOpacity={0.3} />
                <stop offset="50%" stopColor={chartColor} stopOpacity={0.1} />
                <stop offset="100%" stopColor={chartColor} stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis
              dataKey="label"
              axisLine={false}
              tickLine={false}
              tick={{ fill: chartColors.axis, fontSize: 10 }}
              dy={8}
              interval="preserveStartEnd"
            />
            <YAxis
              domain={[minValue - padding, maxValue + padding]}
              axisLine={false}
              tickLine={false}
              tick={false}
              width={0}
            />
            <Tooltip
              content={() => null}
              cursor={{
                stroke: chartColor,
                strokeWidth: 1,
                strokeDasharray: "4 4",
              }}
            />
            <Area
              type="monotone"
              dataKey="netWorth"
              stroke={chartColor}
              strokeWidth={2}
              fill="url(#netWorthGradient)"
              dot={false}
              activeDot={{
                r: 6,
                fill: chartColor,
                stroke: "hsl(var(--background))",
                strokeWidth: 2,
              }}
            />
            {/* Show reference dot with label when hovering */}
            {hoverData && chartData[hoverData.index] && (
              <ReferenceDot
                x={chartData[hoverData.index].label}
                y={chartData[hoverData.index].netWorth}
                r={0}
                label={{
                  value: chartData[hoverData.index].label,
                  position: "top",
                  fill: "hsl(var(--foreground))",
                  fontSize: 11,
                  fontWeight: 500,
                  dy: -12,
                }}
              />
            )}
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Robinhood-style time period selector */}
      <div className="mt-4 flex items-center justify-center gap-1 rounded-lg bg-muted/50 p-1 sm:justify-start">
        {chartTimeframes.map((tf) => (
          <button
            key={tf}
            type="button"
            onClick={() => setTimeframe(tf)}
            className={cn(
              "min-w-[44px] rounded-md px-3 py-1.5 text-xs font-semibold transition-all touch-manipulation",
              timeframe === tf
                ? "bg-foreground text-background shadow-sm"
                : "text-muted-foreground hover:text-foreground",
            )}
          >
            {tf}
          </button>
        ))}
      </div>

      {/* Account toggles */}
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
    </section>
  );
}
