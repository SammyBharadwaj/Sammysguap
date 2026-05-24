import type { FinancialGoal } from "@/data/mock/dashboard";
import { cn, formatCurrency } from "@/lib/utils";

type GoalProgressCardProps = {
  goal: FinancialGoal;
  className?: string;
};

export function GoalProgressCard({ goal, className }: GoalProgressCardProps) {
  const progress = Math.min(100, Math.round((goal.current / goal.target) * 100));
  const remaining = Math.max(0, goal.target - goal.current);

  return (
    <article
      className={cn(
        "rounded-xl border border-foreground/10 bg-card p-4",
        className,
      )}
    >
      <div className="flex items-start justify-between gap-2">
        <div>
          <p className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
            {goal.category}
          </p>
          <h3 className="mt-0.5 text-sm font-semibold">{goal.name}</h3>
        </div>
        <span className="rounded-md border border-foreground/10 px-2 py-0.5 text-[10px] text-muted-foreground">
          {goal.deadline}
        </span>
      </div>

      <p className="mt-3 font-mono text-lg font-semibold tabular-nums">
        {formatCurrency(goal.current)}
        <span className="text-sm font-normal text-muted-foreground">
          {" "}
          / {formatCurrency(goal.target)}
        </span>
      </p>

      <div className="mt-3 h-2 overflow-hidden rounded-full bg-muted">
        <div
          className="h-full rounded-full bg-foreground"
          style={{ width: `${progress}%` }}
          role="progressbar"
          aria-valuenow={progress}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label={`${goal.name} progress`}
        />
      </div>

      <div className="mt-2 flex justify-between text-[11px] text-muted-foreground">
        <span>{progress}%</span>
        <span>{formatCurrency(remaining)} left</span>
      </div>
    </article>
  );
}
