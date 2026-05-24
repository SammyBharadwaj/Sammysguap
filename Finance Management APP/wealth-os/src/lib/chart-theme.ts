/** Chart colors — read from CSS variables (theme-aware) */
export const chartColors = {
  netWorth: "hsl(var(--chart-net-worth))",
  bank: "hsl(var(--chart-bank))",
  credit: "hsl(var(--chart-credit))",
  investments: "hsl(var(--chart-investments))",
  retirement: "hsl(var(--chart-retirement))",
  crypto: "hsl(var(--chart-crypto))",
  grid: "hsl(var(--chart-grid))",
  axis: "hsl(var(--chart-axis))",
  tooltipBg: "hsl(var(--chart-tooltip-bg))",
  tooltipBorder: "hsl(var(--chart-tooltip-border))",
  positive: "hsl(var(--positive))",
  negative: "hsl(var(--negative))",
  income: "hsl(var(--chart-income))",
  spending: "hsl(var(--chart-spending))",
} as const;

export const allocationPalette = [
  chartColors.bank,
  chartColors.retirement,
  chartColors.investments,
  chartColors.crypto,
  chartColors.credit,
] as const;
