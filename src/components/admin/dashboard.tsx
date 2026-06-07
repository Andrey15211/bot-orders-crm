"use client";

import {useFormatter, useTranslations} from "next-intl";
import { DashboardStats } from "@/components/admin/dashboard-stats";
import { useLeads } from "@/components/providers/lead-provider";
import { LeadsTable } from "@/components/table/leads-table";

export function Dashboard() {
  const t = useTranslations("Dashboard");
  const format = useFormatter();
  const { leads, isLoading } = useLeads();
  const today = format.dateTime(new Date(), {dateStyle: "long"});

  if (isLoading) {
    return <DashboardSkeleton />;
  }

  return (
    <div>
      <div className="mb-7">
        <p className="text-sm font-medium text-primary-600">{today}</p>
        <h1 className="mt-1 text-2xl font-semibold tracking-tight text-slate-950 sm:text-3xl">
          {t("title")}
        </h1>
        <p className="mt-2 text-sm text-slate-500">
          {t("description")}
        </p>
      </div>

      <DashboardStats leads={leads} />
      <div className="mt-6">
        <LeadsTable leads={leads} />
      </div>
    </div>
  );
}

function DashboardSkeleton() {
  const common = useTranslations("Common");
  return (
    <div className="animate-pulse" aria-label={common("loading")}>
      <div className="h-8 w-52 rounded bg-slate-200" />
      <div className="mt-3 h-4 w-80 max-w-full rounded bg-slate-200" />
      <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <div key={index} className="h-32 rounded-xl bg-slate-200" />
        ))}
      </div>
      <div className="mt-6 h-[460px] rounded-xl bg-slate-200" />
    </div>
  );
}
