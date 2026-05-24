export type MetricTrend = "up" | "down" | "neutral";

export type DashboardMetric = {
  id: string;
  label: string;
  value: number;
  format: "currency" | "percent";
  change: number;
  trend: MetricTrend;
  periodLabel: string;
  description?: string;
};

export type NavItem = {
  id: string;
  label: string;
  href: string;
  icon: string;
  badge?: string;
  disabled?: boolean;
};

export type NetWorthPoint = {
  month: string;
  netWorth: number;
};

export type CashFlowPoint = {
  month: string;
  income: number;
  spending: number;
};

export type AllocationSlice = {
  id: string;
  label: string;
  value: number;
  percent: number;
};

export type FinancialGoal = {
  id: string;
  name: string;
  current: number;
  target: number;
  deadline: string;
  category: string;
};

export type InsightTone = "positive" | "warning" | "neutral";

export type SmartInsight = {
  id: string;
  title: string;
  body: string;
  tone: InsightTone;
  metric?: string;
};

export const appMeta = {
  name: "Wealth OS",
  tagline: "Personal finance command center",
  user: {
    name: "Sammy Bharadwaj",
    initials: "SB",
    plan: "Personal",
  },
};

export const navigation: NavItem[] = [
  { id: "dashboard", label: "Dashboard", href: "/dashboard", icon: "layout-dashboard" },
  { id: "accounts", label: "Accounts", href: "/accounts", icon: "landmark", disabled: true },
  {
    id: "transactions",
    label: "Transactions",
    href: "/transactions",
    icon: "arrow-left-right",
    disabled: true,
  },
  { id: "budgets", label: "Budgets", href: "/budgets", icon: "pie-chart", disabled: true },
  { id: "insights", label: "Insights", href: "/insights", icon: "sparkles", disabled: true },
  { id: "settings", label: "Settings", href: "/settings", icon: "settings", disabled: true },
];

export const dashboardMetrics: DashboardMetric[] = [
  {
    id: "net-worth",
    label: "Net worth",
    value: 284_750,
    format: "currency",
    change: 4.2,
    trend: "up",
    periodLabel: "vs last month",
    description: "All accounts",
  },
  {
    id: "income",
    label: "Income",
    value: 12_400,
    format: "currency",
    change: 3.1,
    trend: "up",
    periodLabel: "this month",
    description: "Net take-home",
  },
  {
    id: "spending",
    label: "Spending",
    value: 6_240,
    format: "currency",
    change: -3.4,
    trend: "down",
    periodLabel: "vs last month",
    description: "Lower is better",
  },
  {
    id: "investing",
    label: "Investing",
    value: 251_920,
    format: "currency",
    change: 5.1,
    trend: "up",
    periodLabel: "portfolio value",
  },
  {
    id: "savings-rate",
    label: "Savings rate",
    value: 28.5,
    format: "percent",
    change: 2.1,
    trend: "up",
    periodLabel: "of income saved",
  },
  {
    id: "safe-to-invest",
    label: "Safe to invest",
    value: 18_600,
    format: "currency",
    change: 8.4,
    trend: "up",
    periodLabel: "after reserves",
    description: "Excess cash above 6-mo buffer",
  },
];

export const dashboardSummary = {
  greeting: "Good evening",
  headline: "Your wealth snapshot is healthy.",
  subheadline: "Net worth is up 4.2% this month with spending below your target.",
  lastUpdated: "Updated just now · mock data",
  monthlyIncome: 12_400,
  monthlyExpenses: 8_870,
  runwayMonths: 14,
};

export const netWorthHistory: NetWorthPoint[] = [
  { month: "Jun", netWorth: 238_400 },
  { month: "Jul", netWorth: 244_100 },
  { month: "Aug", netWorth: 249_800 },
  { month: "Sep", netWorth: 255_200 },
  { month: "Oct", netWorth: 261_900 },
  { month: "Nov", netWorth: 268_500 },
  { month: "Dec", netWorth: 273_200 },
  { month: "Jan", netWorth: 278_600 },
  { month: "Feb", netWorth: 281_400 },
  { month: "Mar", netWorth: 284_750 },
];

export const monthlyCashFlow: CashFlowPoint[] = [
  { month: "Oct", income: 11_800, spending: 7_950 },
  { month: "Nov", income: 12_100, spending: 8_420 },
  { month: "Dec", income: 13_200, spending: 9_180 },
  { month: "Jan", income: 12_050, spending: 7_640 },
  { month: "Feb", income: 12_600, spending: 6_890 },
  { month: "Mar", income: 12_400, spending: 6_240 },
];

export const accountAllocation: AllocationSlice[] = [
  { id: "brokerage", label: "Brokerage", value: 142_500, percent: 50.0 },
  { id: "retirement", label: "Retirement", value: 85_420, percent: 30.0 },
  { id: "cash", label: "Cash", value: 42_180, percent: 14.8 },
  { id: "crypto", label: "Crypto", value: 11_200, percent: 3.9 },
  { id: "other", label: "Other", value: 3_450, percent: 1.2 },
];

export const financialGoals: FinancialGoal[] = [
  {
    id: "emergency-fund",
    name: "Emergency fund",
    current: 25_200,
    target: 30_000,
    deadline: "Aug 2026",
    category: "Safety",
  },
  {
    id: "house-down",
    name: "House down payment",
    current: 48_000,
    target: 80_000,
    deadline: "Dec 2027",
    category: "Home",
  },
  {
    id: "vacation",
    name: "Japan trip",
    current: 2_400,
    target: 5_000,
    deadline: "May 2026",
    category: "Lifestyle",
  },
];

export const smartInsights: SmartInsight[] = [
  {
    id: "spending-down",
    title: "Spending is trending down",
    body: "March spend is 26% below your 6-month average. You're on track to beat your monthly budget by $840.",
    tone: "positive",
    metric: "-26% vs avg",
  },
  {
    id: "investable-cash",
    title: "Idle cash opportunity",
    body: "$18.6k is above your 6-month reserve. Consider moving $10k into your brokerage auto-invest plan.",
    tone: "neutral",
    metric: "$18.6k available",
  },
  {
    id: "concentration",
    title: "Portfolio concentration",
    body: "Tech equities are 42% of your brokerage allocation — above your 35% target. Rebalance when markets open.",
    tone: "warning",
    metric: "42% tech",
  },
  {
    id: "savings-streak",
    title: "Savings streak: 4 months",
    body: "You've saved at least 25% of income since December. Keep routing surplus to your house goal.",
    tone: "positive",
    metric: "28.5% rate",
  },
];
