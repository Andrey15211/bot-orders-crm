import {
  Banknote,
  CircleDot,
  ListChecks,
  MessagesSquare,
} from "lucide-react";
import {useTranslations} from "next-intl";
import type { Lead } from "@/types/lead";

export function DashboardStats({ leads }: { leads: Lead[] }) {
  const t = useTranslations("Dashboard");
  const stats = [
    {
      label: t("total"),
      value: leads.length,
      hint: t("totalHint"),
      icon: ListChecks,
      color: "bg-slate-100 text-slate-700",
    },
    {
      label: t("new"),
      value: leads.filter((lead) => lead.status === "new").length,
      hint: t("newHint"),
      icon: CircleDot,
      color: "bg-blue-50 text-blue-700",
    },
    {
      label: t("active"),
      value: leads.filter((lead) =>
        ["contacted", "in_progress"].includes(lead.status),
      ).length,
      hint: t("activeHint"),
      icon: MessagesSquare,
      color: "bg-amber-50 text-amber-700",
    },
    {
      label: t("successful"),
      value: leads.filter((lead) =>
        ["paid", "completed"].includes(lead.status),
      ).length,
      hint: t("successfulHint"),
      icon: Banknote,
      color: "bg-emerald-50 text-emerald-700",
    },
  ];

  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {stats.map((stat) => {
        const Icon = stat.icon;
        return (
          <div key={stat.label} className="panel flex items-start justify-between p-5">
            <div>
              <p className="text-sm font-medium text-slate-500">{stat.label}</p>
              <p className="mt-2 text-3xl font-semibold tracking-tight text-slate-950">
                {stat.value}
              </p>
              <p className="mt-1 text-xs text-slate-400">{stat.hint}</p>
            </div>
            <span
              className={`flex h-10 w-10 items-center justify-center rounded-lg ${stat.color}`}
            >
              <Icon className="h-5 w-5" aria-hidden="true" />
            </span>
          </div>
        );
      })}
    </div>
  );
}
