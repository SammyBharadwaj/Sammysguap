export type PaycheckAllocation = {
  id: string;
  label: string;
  amount: number;
  percent: number;
  description: string;
};

export type BudgetCategory = {
  id: string;
  name: string;
  budgeted: number;
  spent: number;
  group: "fixed" | "variable" | "savings";
};

export type MonthlyExpense = {
  id: string;
  date: string;
  merchant: string;
  category: string;
  amount: number;
};

export const paycheckSummary = {
  gross: 14_200,
  net: 12_400,
  frequency: "Bi-weekly",
  nextPayDate: "Apr 4, 2026",
  monthLabel: "March 2026",
};

export const paycheckAllocations: PaycheckAllocation[] = [
  {
    id: "fixed",
    label: "Fixed costs",
    amount: 4_960,
    percent: 40,
    description: "Rent, utilities, insurance, subscriptions",
  },
  {
    id: "variable",
    label: "Variable spending",
    amount: 2_480,
    percent: 20,
    description: "Food, transport, shopping, entertainment",
  },
  {
    id: "savings",
    label: "Savings",
    amount: 2_480,
    percent: 20,
    description: "Emergency fund & short-term goals",
  },
  {
    id: "invest",
    label: "Investing",
    amount: 1_860,
    percent: 15,
    description: "Brokerage & retirement contributions",
  },
  {
    id: "debt",
    label: "Debt paydown",
    amount: 620,
    percent: 5,
    description: "Credit card & loan payments",
  },
];

export const budgetCategories: BudgetCategory[] = [
  { id: "rent", name: "Rent", budgeted: 2_200, spent: 2_200, group: "fixed" },
  { id: "utilities", name: "Utilities", budgeted: 180, spent: 165, group: "fixed" },
  { id: "insurance", name: "Insurance", budgeted: 320, spent: 320, group: "fixed" },
  { id: "subscriptions", name: "Subscriptions", budgeted: 95, spent: 87, group: "fixed" },
  { id: "groceries", name: "Groceries", budgeted: 520, spent: 478, group: "variable" },
  { id: "dining", name: "Dining out", budgeted: 280, spent: 312, group: "variable" },
  { id: "transport", name: "Transport", budgeted: 240, spent: 198, group: "variable" },
  { id: "shopping", name: "Shopping", budgeted: 200, spent: 164, group: "variable" },
  { id: "emergency", name: "Emergency fund", budgeted: 800, spent: 800, group: "savings" },
  { id: "brokerage", name: "Brokerage", budgeted: 1_200, spent: 1_200, group: "savings" },
  { id: "401k", name: "401(k)", budgeted: 660, spent: 660, group: "savings" },
];

export const recentExpenses: MonthlyExpense[] = [
  { id: "1", date: "Mar 22", merchant: "Whole Foods", category: "Groceries", amount: 86.42 },
  { id: "2", date: "Mar 21", merchant: "Uber", category: "Transport", amount: 24.5 },
  { id: "3", date: "Mar 20", merchant: "Netflix", category: "Subscriptions", amount: 15.99 },
  { id: "4", date: "Mar 19", merchant: "Sweetgreen", category: "Dining out", amount: 18.75 },
  { id: "5", date: "Mar 18", merchant: "Amazon", category: "Shopping", amount: 42.3 },
  { id: "6", date: "Mar 17", merchant: "PG&E", category: "Utilities", amount: 82.1 },
];

export const budgetingInsights = {
  unallocated: 0,
  remainingVariable: 106,
  overBudgetCategories: ["Dining out"],
};
