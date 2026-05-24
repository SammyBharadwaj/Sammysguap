"use client";

import { useState } from "react";

import { BudgetingTab } from "@/components/dashboard/budgeting-tab";
import { DashboardTabs, type DashboardTab } from "@/components/dashboard/dashboard-tabs";
import { MobileTabBar } from "@/components/dashboard/mobile-tab-bar";
import { NetWorthHero } from "@/components/dashboard/net-worth-hero";
import { OverviewTab } from "@/components/dashboard/overview-tab";

export function DashboardView() {
  const [tab, setTab] = useState<DashboardTab>("overview");

  return (
    <>
      <div className="mx-auto max-w-5xl px-4 py-5 pb-28 sm:px-6 sm:py-8 md:pb-10">
        <NetWorthHero />

        <div className="mt-6 md:mt-8">
          <DashboardTabs active={tab} onChange={setTab} />
          <div role="tabpanel" className="min-h-[200px] md:min-h-[320px]">
            {tab === "overview" ? <OverviewTab /> : <BudgetingTab />}
          </div>
        </div>
      </div>
      <MobileTabBar active={tab} onChange={setTab} />
    </>
  );
}
