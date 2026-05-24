"use client";

import type { BudgetCategory } from "@/data/mock/budgeting";
import {
  budgetCategories as initialBudgetCategories,
  paycheckAllocations,
  paycheckSummary,
  recentExpenses,
} from "@/data/mock/budgeting";
import { cn, formatCurrency } from "@/lib/utils";
import { useState, useRef, useEffect } from "react";

const groupLabels = {
  fixed: "Fixed",
  variable: "Variable",
  savings: "Savings & investing",
} as const;

function BudgetStatusBadge({ spent, budgeted }: { spent: number; budgeted: number }) {
  const pct = Math.round((spent / budgeted) * 100);
  const remaining = budgeted - spent;
  
  if (pct >= 100) {
    const overAmount = spent - budgeted;
    return (
      <span className="inline-flex items-center gap-1 rounded-full bg-negative/15 px-2 py-0.5 text-[10px] font-medium text-negative">
        <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
        {pct > 100 ? `Over by ${formatCurrency(overAmount)}` : "At limit"}
      </span>
    );
  }
  
  if (pct >= 80) {
    return (
      <span className="inline-flex items-center gap-1 rounded-full bg-amber-500/15 px-2 py-0.5 text-[10px] font-medium text-amber-600 dark:text-amber-400">
        <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        {formatCurrency(remaining)} left
      </span>
    );
  }
  
  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-positive/15 px-2 py-0.5 text-[10px] font-medium text-positive">
      <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
      </svg>
      {formatCurrency(remaining)} left
    </span>
  );
}

function EditableBudgetInput({ 
  value, 
  onChange,
  onEditStart,
  onEditEnd,
}: { 
  value: number; 
  onChange: (value: number) => void;
  onEditStart?: () => void;
  onEditEnd?: () => void;
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [inputValue, setInputValue] = useState(value.toString());
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isEditing]);

  const handleStartEdit = () => {
    setInputValue(value.toString());
    setIsEditing(true);
    onEditStart?.();
  };

  const handleSave = () => {
    const numValue = parseFloat(inputValue);
    if (!isNaN(numValue) && numValue >= 0) {
      onChange(numValue);
    } else {
      setInputValue(value.toString());
    }
    setIsEditing(false);
    onEditEnd?.();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSave();
    } else if (e.key === "Escape") {
      setInputValue(value.toString());
      setIsEditing(false);
      onEditEnd?.();
    }
  };

  if (isEditing) {
    return (
      <div className="flex items-center gap-1">
        <span className="text-muted-foreground">$</span>
        <input
          ref={inputRef}
          type="number"
          min="0"
          step="10"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onBlur={handleSave}
          onKeyDown={handleKeyDown}
          className="w-20 rounded border border-foreground/20 bg-background px-2 py-1 font-mono text-sm tabular-nums focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
        />
      </div>
    );
  }

  return (
    <button
      onClick={handleStartEdit}
      className="group flex items-center gap-1.5 rounded px-1.5 py-0.5 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
    >
      <span className="font-mono tabular-nums">{formatCurrency(value)}</span>
      <svg 
        className="h-3 w-3 opacity-0 transition-opacity group-hover:opacity-100" 
        fill="none" 
        viewBox="0 0 24 24" 
        stroke="currentColor" 
        strokeWidth={2}
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
      </svg>
    </button>
  );
}

function CategoryCard({ 
  cat, 
  onBudgetChange 
}: { 
  cat: BudgetCategory; 
  onBudgetChange: (id: string, newBudget: number) => void;
}) {
  const over = cat.spent > cat.budgeted;
  const pct = cat.budgeted > 0 ? Math.min(100, Math.round((cat.spent / cat.budgeted) * 100)) : 0;

  return (
    <div className="border-b border-foreground/5 px-4 py-3.5 last:border-0">
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1">
          <p className="font-medium">{cat.name}</p>
          <BudgetStatusBadge spent={cat.spent} budgeted={cat.budgeted} />
        </div>
        <p
          className={cn(
            "shrink-0 font-mono text-sm tabular-nums",
            over ? "text-negative" : "text-foreground",
          )}
        >
          {formatCurrency(cat.spent)}
        </p>
      </div>
      <div className="mt-2 flex items-center justify-between text-xs">
        <div className="flex items-center gap-1">
          <span className="text-muted-foreground">Budget:</span>
          <EditableBudgetInput
            value={cat.budgeted}
            onChange={(newValue) => onBudgetChange(cat.id, newValue)}
          />
        </div>
        <span className={cn("font-medium", over ? "text-negative" : "text-positive")}>{pct}%</span>
      </div>
      <div className="mt-2 h-2 overflow-hidden rounded-full bg-muted">
        <div
          className={cn(
            "h-full rounded-full transition-all duration-300",
            over ? "bg-negative" : pct >= 80 ? "bg-amber-500" : "bg-positive"
          )}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}

export function BudgetingTab() {
  const [budgetCategories, setBudgetCategories] = useState(initialBudgetCategories);
  
  const handleBudgetChange = (categoryId: string, newBudget: number) => {
    setBudgetCategories(prev => 
      prev.map(cat => 
        cat.id === categoryId ? { ...cat, budgeted: newBudget } : cat
      )
    );
  };

  const totalBudgeted = budgetCategories.reduce((s, c) => s + c.budgeted, 0);
  const totalSpent = budgetCategories.reduce((s, c) => s + c.spent, 0);
  
  // Calculate dynamic insights
  const variableCategories = budgetCategories.filter(c => c.group === "variable");
  const variableBudgeted = variableCategories.reduce((s, c) => s + c.budgeted, 0);
  const variableSpent = variableCategories.reduce((s, c) => s + c.spent, 0);
  const remainingVariable = Math.max(0, variableBudgeted - variableSpent);
  const overBudgetCategories = budgetCategories.filter(c => c.spent > c.budgeted).map(c => c.name);

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
          {remainingVariable > 0 ? (
            <span className="w-fit rounded-full border border-foreground/10 bg-pastel-mint/40 px-2.5 py-1 text-[11px] font-medium text-positive">
              {formatCurrency(remainingVariable)} left in variable
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
                  <CategoryCard key={cat.id} cat={cat} onBudgetChange={handleBudgetChange} />
                ))}
              </div>

              {/* Desktop: table */}
              <div className="hidden overflow-hidden rounded-xl border border-foreground/10 bg-card md:block">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-foreground/10 text-left text-[11px] text-muted-foreground">
                      <th className="px-4 py-2.5 font-medium">Category</th>
                      <th className="px-4 py-2.5 font-medium">Budget</th>
                      <th className="px-4 py-2.5 font-medium text-right">Spent</th>
                      <th className="px-4 py-2.5 font-medium">Progress</th>
                      <th className="px-4 py-2.5 font-medium">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {items.map((cat) => {
                      const over = cat.spent > cat.budgeted;
                      const pct = cat.budgeted > 0 ? Math.min(100, Math.round((cat.spent / cat.budgeted) * 100)) : 0;
                      return (
                        <tr
                          key={cat.id}
                          className="border-b border-foreground/5 last:border-0"
                        >
                          <td className="px-4 py-3 font-medium">{cat.name}</td>
                          <td className="px-4 py-3">
                            <EditableBudgetInput
                              value={cat.budgeted}
                              onChange={(newValue) => handleBudgetChange(cat.id, newValue)}
                            />
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
                              <div className="h-2 w-24 overflow-hidden rounded-full bg-muted">
                                <div
                                  className={cn(
                                    "h-full rounded-full transition-all duration-300",
                                    over ? "bg-negative" : pct >= 80 ? "bg-amber-500" : "bg-positive",
                                  )}
                                  style={{ width: `${pct}%` }}
                                />
                              </div>
                              <span className={cn(
                                "w-10 text-xs font-medium tabular-nums",
                                over ? "text-negative" : pct >= 80 ? "text-amber-600 dark:text-amber-400" : "text-positive"
                              )}>
                                {pct}%
                              </span>
                            </div>
                          </td>
                          <td className="px-4 py-3">
                            <BudgetStatusBadge spent={cat.spent} budgeted={cat.budgeted} />
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

        {overBudgetCategories.length > 0 ? (
          <p className="text-xs text-negative">
            Over budget: {overBudgetCategories.join(", ")}
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
