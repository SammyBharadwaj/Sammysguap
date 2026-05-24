import { AllocationChart } from "@/components/dashboard/allocation-chart";
import { CashFlowChart } from "@/components/dashboard/cash-flow-chart";
import { GoalProgressCard } from "@/components/dashboard/goal-progress-card";
import { InsightCard } from "@/components/dashboard/insight-card";
import { MetricCard } from "@/components/ui/metric-card";
import {
  accountAllocation,
  dashboardMetrics,
  financialGoals,
  monthlyCashFlow,
  smartInsights,
} from "@/data/mock/dashboard";

export function OverviewTab() {
  return (
    <div className="space-y-6 pt-4 sm:space-y-8 sm:pt-6">
      <section>
        <h2 className="text-sm font-semibold text-foreground">At a glance</h2>
        <p className="text-xs text-muted-foreground">Income, spending, and savings</p>
        <div className="mt-3 grid grid-cols-2 gap-2.5 sm:mt-4 sm:gap-3 lg:grid-cols-3">
          {dashboardMetrics.map((metric) => (
            <MetricCard key={metric.id} metric={metric} className="col-span-1 min-w-0" />
          ))}
        </div>
      </section>

      <section className="grid gap-4 lg:grid-cols-2">
        <AllocationChart data={accountAllocation} />
        <CashFlowChart data={monthlyCashFlow} />
      </section>

      <section>
        <h2 className="text-sm font-semibold text-foreground">Goals</h2>
        <div className="mt-3 grid gap-2.5 sm:mt-4 sm:gap-3 md:grid-cols-3">
          {financialGoals.map((goal) => (
            <GoalProgressCard key={goal.id} goal={goal} />
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-sm font-semibold text-foreground">Insights</h2>
        <div className="mt-3 grid gap-2.5 sm:mt-4 sm:gap-3 md:grid-cols-2">
          {smartInsights.map((insight) => (
            <InsightCard key={insight.id} insight={insight} />
          ))}
        </div>
      </section>
    </div>
  );
}
