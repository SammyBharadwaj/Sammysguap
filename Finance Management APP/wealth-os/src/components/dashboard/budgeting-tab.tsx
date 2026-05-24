import type { BudgetCategory } from "@/data/mock/budgeting";
import {
  budgetCategories,
  budgetingInsights,
  paycheckAllocations,
  paycheckSummary,
  recentExpenses,
} from "@/data/mock/budgeting";
import { cn, formatCurrency } from "@/lib/utils";

const groupLabels = {
  fixed: "Fixed",
  variable: "Variable",
  savings: "Savings & investing",
} as const;

function CategoryCard({ cat }: { cat: BudgetCategory }) {
  const over = cat.spent > cat.budgeted;
  const pct = Math.min(100, Math.round((cat.spent / cat.budgeted) * 100));

  return (
    <div className="border-b border-foreground/5 px-4 py-3.5 last:border-0">
      <div className="flex items-start justify-between gap-3">
        <p className="font-medium">{cat.name}</p>
        <p
          className={cn(
            "shrink-0 font-mono text-sm tabular-nums",
            over ? "text-negative" : "text-foreground",
          )}
        >
          {formatCurrency(cat.spent)}
        </p>
      </div>
      <div className="mt-2 flex items-center justify-between text-xs text-muted-foreground">
        <span>Budget {formatCurrency(cat.budgeted)}</span>
        <span className={over ? "text-negative" : "text-positive"}>{pct}%</span>
      </div>
      <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-muted">
        <div
          className={cn("h-full rounded-full", over ? "bg-negative" : "bg-positive")}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}

export function BudgetingTab() {
  const totalBudgeted = budgetCategories.reduce((s, c) => s + c.budgeted, 0);
  const totalSpent = budgetCategories.reduce((s, c) => s + c.spent, 0);

  return (
    <div className="space-y-6 pt-4 sm:space-y-8 sm:pt-6">
      <section className="rounded-2xl border border-foreground/10 bg-card p-4 sm:p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
              {paycheckSummary.monthLabel}
            </p>
            <h2 className="mt-1 font-serif text-xl text-foreground sm:text-2xl">Paycheck plan</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              {paycheckSummary.frequency} · Next pay {paycheckSummary.nextPayDate}
            </p>
          </div>
          <div className="sm:text-right">
            <p className="text-xs text-muted-foreground">Net per paycheck</p>
            <p className="font-mono text-2xl font-semibold tabular-nums">
              {formatCurrency(paycheckSummary.net)}
            </p>
            <p className="text-xs text-muted-foreground">
              Gross {formatCurrency(paycheckSummary.gross)}
            </p>
          </div>
        </div>

        <div className="mt-5 space-y-4 sm:mt-6 sm:space-y-3">
          {paycheckAllocations.map((item) => (
            <div key={item.id}>
              <div className="flex items-center justify-between gap-2 text-sm">
                <div className="min-w-0">
                  <span className="font-medium">{item.label}</span>
                  <span className="ml-2 text-muted-foreground">{item.percent}%</span>
                </div>
                <span className="shrink-0 font-mono tabular-nums">{formatCurrency(item.amount)}</span>
              </div>
              <p className="text-[11px] leading-snug text-muted-foreground">{item.description}</p>
              <div className="mt-2 h-2 overflow-hidden rounded-full bg-muted">
                <div
                  className="h-full rounded-full bg-primary"
                  style={{ width: `${item.percent}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </section>

      <section>
        <div className="mb-3 flex flex-col gap-2 sm:mb-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="text-sm font-semibold text-foreground">Monthly categories</h2>
            <p className="text-xs text-muted-foreground">
              Budgeted {formatCurrency(totalBudgeted)} · Spent {formatCurrency(totalSpent)}
            </p>
          </div>
          {budgetingInsights.remainingVariable > 0 ? (
            <span className="w-fit rounded-full border border-foreground/10 bg-pastel-mint/40 px-2.5 py-1 text-[11px] font-medium text-positive">
              {formatCurrency(budgetingInsights.remainingVariable)} left in variable
            </span>
          ) : null}
        </div>

        {(["fixed", "variable", "savings"] as const).map((group) => {
          const items = budgetCategories.filter((c) => c.group === group);
          if (!items.length) return null;
          return (
            <div key={group} className="mb-5 sm:mb-6">
              <p className="mb-2 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
                {groupLabels[group]}
              </p>

              {/* Mobile: card list */}
              <div className="overflow-hidden rounded-xl border border-foreground/10 bg-card md:hidden">
                {items.map((cat) => (
                  <CategoryCard key={cat.id} cat={cat} />
                ))}
              </div>

              {/* Desktop: table */}
              <div className="hidden overflow-hidden rounded-xl border border-foreground/10 bg-card md:block">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-foreground/10 text-left text-[11px] text-muted-foreground">
                      <th className="px-4 py-2.5 font-medium">Category</th>
                      <th className="px-4 py-2.5 font-medium text-right">Budget</th>
                      <th className="px-4 py-2.5 font-medium text-right">Spent</th>
                      <th className="px-4 py-2.5 font-medium">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {items.map((cat) => {
                      const over = cat.spent > cat.budgeted;
                      const pct = Math.min(100, Math.round((cat.spent / cat.budgeted) * 100));
                      return (
                        <tr
                          key={cat.id}
                          className="border-b border-foreground/5 last:border-0"
                        >
                          <td className="px-4 py-3 font-medium">{cat.name}</td>
                          <td className="px-4 py-3 text-right font-mono tabular-nums text-muted-foreground">
                            {formatCurrency(cat.budgeted)}
                          </td>
                          <td
                            className={cn(
                              "px-4 py-3 text-right font-mono tabular-nums",
                              over && "text-negative",
                            )}
                          >
                            {formatCurrency(cat.spent)}
                          </td>
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-2">
                              <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-muted">
                                <div
                                  className={cn(
                                    "h-full rounded-full",
                                    over ? "bg-negative" : "bg-positive",
                                  )}
                                  style={{ width: `${pct}%` }}
                                />
                              </div>
                              <span className="w-8 text-[10px] tabular-nums text-muted-foreground">
                                {pct}%
                              </span>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          );
        })}

        {budgetingInsights.overBudgetCategories.length > 0 ? (
          <p className="text-xs text-negative">
            Over budget: {budgetingInsights.overBudgetCategories.join(", ")}
          </p>
        ) : null}
      </section>

      <section>
        <h2 className="text-sm font-semibold text-foreground">Recent expenses</h2>
        <p className="text-xs text-muted-foreground">Where your money went this month</p>
        <ul className="mt-3 divide-y divide-foreground/10 overflow-hidden rounded-xl border border-foreground/10 bg-card sm:mt-4">
          {recentExpenses.map((expense) => (
            <li
              key={expense.id}
              className="flex items-center justify-between gap-3 px-4 py-3.5 text-sm active:bg-muted/50"
            >
              <div className="min-w-0 flex-1">
                <p className="truncate font-medium">{expense.merchant}</p>
                <p className="truncate text-xs text-muted-foreground">
                  {expense.date} · {expense.category}
                </p>
              </div>
              <span className="shrink-0 font-mono text-sm tabular-nums">
                −{formatCurrency(expense.amount)}
              </span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
