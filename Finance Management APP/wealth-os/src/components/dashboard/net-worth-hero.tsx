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
  Line,
  ComposedChart,
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
  comparisonValue?: number;
  label: string;
  index: number;
} | null;

export function NetWorthHero() {
  const [timeframe, setTimeframe] = useState<ChartTimeframe>("ALL");
  const [hoverData, setHoverData] = useState<HoverData>(null);
  const [selectedAccount, setSelectedAccount] = useState<string>("netWorth");

  const chartData = useMemo(
    () => sliceByTimeframe(netWorthHistoryByAccount, timeframe),
    [timeframe],
  );

  // Get the selected account info
  const selectedAccountInfo = accountLines.find(a => a.key === selectedAccount);
  const selectedColor = selectedAccountInfo?.color || "#00D632";
  
  // Calculate change for selected account
  const latestValue = chartData[chartData.length - 1]?.[selectedAccount as keyof NetWorthHistoryPoint] as number || 0;
  const previousValue = chartData[chartData.length - 2]?.[selectedAccount as keyof NetWorthHistoryPoint] as number || latestValue;
  const changeAmount = latestValue - previousValue;
  const changePercent = previousValue !== 0 ? (changeAmount / Math.abs(previousValue)) * 100 : 0;
  const isPositive = changeAmount >= 0;

  // Determine display values based on hover state
  const displayValue = hoverData?.value ?? latestValue;
  const displayLabel = hoverData?.label ?? null;
  const displayComparisonValue = hoverData?.comparisonValue;

  const handleMouseMove = useCallback((data: { activePayload?: Array<{ payload: NetWorthHistoryPoint }>; activeTooltipIndex?: number }) => {
    if (data.activePayload && data.activePayload.length > 0 && data.activeTooltipIndex !== undefined) {
      const point = data.activePayload[0].payload;
      const value = point[selectedAccount as keyof NetWorthHistoryPoint] as number;
      const comparisonValue = selectedAccount !== "netWorth" ? point.netWorth : undefined;
      setHoverData({
        value,
        comparisonValue,
        label: point.label,
        index: data.activeTooltipIndex,
      });
    }
  }, [selectedAccount]);

  const handleMouseLeave = useCallback(() => {
    setHoverData(null);
  }, []);

  const selectAccount = (key: string) => {
    setSelectedAccount(key);
    setHoverData(null);
  };

  // Find min and max for better Y axis domain
  const selectedValues = chartData.map(d => d[selectedAccount as keyof NetWorthHistoryPoint] as number);
  const netWorthValues = chartData.map(d => d.netWorth);
  const allValues = selectedAccount !== "netWorth" 
    ? [...selectedValues, ...netWorthValues]
    : selectedValues;
  const minValue = Math.min(...allValues);
  const maxValue = Math.max(...allValues);
  const padding = (maxValue - minValue) * 0.15;

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

      {/* Value display with account label */}
      <div className="mb-1">
        <div className="flex items-center gap-2 mb-1">
          <span 
            className="size-3 rounded-full" 
            style={{ backgroundColor: selectedColor }}
          />
          <span className="text-sm font-medium text-muted-foreground">
            {selectedAccountInfo?.label || "Net Worth"}
          </span>
        </div>
        <p className="font-mono text-[1.75rem] font-semibold leading-tight tabular-nums tracking-tight sm:text-5xl">
          {formatCurrency(displayValue)}
        </p>
        <div className="mt-1.5 flex flex-wrap items-center gap-x-3 gap-y-1">
          {displayLabel ? (
            <>
              <span className="text-sm text-muted-foreground">{displayLabel}</span>
              {displayComparisonValue !== undefined && (
                <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
                  <span className="size-2 rounded-full bg-foreground/30" />
                  Net Worth: {formatCurrency(displayComparisonValue)}
                </span>
              )}
            </>
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
                {formatCurrency(Math.abs(changeAmount))} ({formatPercent(Math.abs(changePercent))})
              </span>
              <span className="text-sm text-muted-foreground">
                {netWorthSnapshot.periodLabel}
              </span>
            </>
          )}
        </div>
      </div>

      {/* Chart with selected account line + optional net worth comparison */}
      <div className="relative mt-5 h-[200px] w-full min-w-0 sm:mt-6 sm:h-[280px]">
        <ResponsiveContainer width="100%" height="100%" minWidth={0}>
          <ComposedChart
            data={chartData}
            margin={{ top: 20, right: 8, left: 8, bottom: 0 }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          >
            <defs>
              <linearGradient id="selectedGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={selectedColor} stopOpacity={0.3} />
                <stop offset="50%" stopColor={selectedColor} stopOpacity={0.1} />
                <stop offset="100%" stopColor={selectedColor} stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis
              dataKey="label"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 10 }}
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
                stroke: selectedColor,
                strokeWidth: 1,
                strokeDasharray: "4 4",
              }}
            />
            {/* Show net worth as dashed comparison line when another account is selected */}
            {selectedAccount !== "netWorth" && (
              <Line
                type="monotone"
                dataKey="netWorth"
                stroke="hsl(var(--foreground))"
                strokeWidth={1.5}
                strokeDasharray="4 4"
                strokeOpacity={0.3}
                dot={false}
                activeDot={false}
              />
            )}
            {/* Selected account area */}
            <Area
              type="monotone"
              dataKey={selectedAccount}
              stroke={selectedColor}
              strokeWidth={2}
              fill="url(#selectedGradient)"
              dot={false}
              activeDot={{
                r: 6,
                fill: selectedColor,
                stroke: "hsl(var(--background))",
                strokeWidth: 2,
              }}
            />
            {/* Show reference dot with label when hovering */}
            {hoverData && chartData[hoverData.index] && (
              <ReferenceDot
                x={chartData[hoverData.index].label}
                y={chartData[hoverData.index][selectedAccount as keyof NetWorthHistoryPoint] as number}
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
          </ComposedChart>
        </ResponsiveContainer>
      </div>

      {/* Time period selector */}
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

      {/* Account selector - single selection with matching colors */}
      <div className="-mx-4 mt-4 flex gap-2 overflow-x-auto px-4 pb-1 scrollbar-none sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0">
        {accountLines.map((account) => {
          const isSelected = selectedAccount === account.key;
          return (
            <button
              key={account.id}
              type="button"
              onClick={() => selectAccount(account.key)}
              className={cn(
                "inline-flex shrink-0 items-center gap-1.5 rounded-full border px-3 py-2 text-xs font-medium transition-all touch-manipulation sm:py-1.5 sm:text-[11px]",
                isSelected
                  ? "border-transparent text-white shadow-sm"
                  : "border-foreground/10 bg-card text-muted-foreground hover:border-foreground/20 hover:text-foreground",
              )}
              style={isSelected ? { backgroundColor: account.color } : undefined}
            >
              {!isSelected && (
                <span
                  className="size-2.5 rounded-full sm:size-2"
                  style={{ backgroundColor: account.color }}
                />
              )}
              {account.label}
            </button>
          );
        })}
      </div>
    </section>
  );
}
