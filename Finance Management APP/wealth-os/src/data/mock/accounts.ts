import { chartColors } from "@/lib/chart-theme";

export type AccountLine = {
  id: string;
  label: string;
  color: string;
  /** Data key on history points */
  key: string;
};

export type NetWorthHistoryPoint = {
  date: string;
  label: string;
  bank: number;
  credit: number;
  investments: number;
  retirement: number;
  crypto: number;
  netWorth: number;
};

export const accountLines: AccountLine[] = [
  { id: "net-worth", label: "Net worth", color: chartColors.netWorth, key: "netWorth" },
  { id: "bank", label: "Bank", color: chartColors.bank, key: "bank" },
  { id: "investments", label: "Investments", color: chartColors.investments, key: "investments" },
  { id: "retirement", label: "401(k)", color: chartColors.retirement, key: "retirement" },
  { id: "crypto", label: "Crypto", color: chartColors.crypto, key: "crypto" },
  { id: "credit", label: "Credit", color: chartColors.credit, key: "credit" },
];

export const netWorthHistoryByAccount: NetWorthHistoryPoint[] = [
  {
    date: "2025-10",
    label: "Oct",
    bank: 36_800,
    credit: -10_200,
    investments: 148_500,
    retirement: 82_400,
    crypto: 9_200,
    netWorth: 266_700,
  },
  {
    date: "2025-11",
    label: "Nov",
    bank: 37_600,
    credit: -9_800,
    investments: 150_200,
    retirement: 83_100,
    crypto: 9_600,
    netWorth: 270_700,
  },
  {
    date: "2025-12",
    label: "Dec",
    bank: 38_900,
    credit: -9_600,
    investments: 152_400,
    retirement: 83_800,
    crypto: 10_100,
    netWorth: 275_600,
  },
  {
    date: "2026-01",
    label: "Jan",
    bank: 39_500,
    credit: -9_450,
    investments: 154_200,
    retirement: 84_400,
    crypto: 10_500,
    netWorth: 278_600,
  },
  {
    date: "2026-02",
    label: "Feb",
    bank: 40_800,
    credit: -9_400,
    investments: 155_800,
    retirement: 85_000,
    crypto: 10_800,
    netWorth: 281_400,
  },
  {
    date: "2026-03",
    label: "Mar",
    bank: 42_180,
    credit: -9_350,
    investments: 157_150,
    retirement: 85_420,
    crypto: 11_200,
    netWorth: 284_750,
  },
];

export const netWorthSnapshot = {
  total: 284_750,
  changeAmount: 3_350,
  changePercent: 1.19,
  periodLabel: "Past month",
};

export const chartTimeframes = ["1W", "1M", "3M", "1Y", "ALL"] as const;
export type ChartTimeframe = (typeof chartTimeframes)[number];
