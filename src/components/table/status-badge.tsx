import {useTranslations} from "next-intl";
import type {LeadStatus} from "@/types/lead";

const styles: Record<LeadStatus, string> = {
  new: "bg-blue-50 text-blue-700 ring-blue-600/15",
  contacted: "bg-violet-50 text-violet-700 ring-violet-600/15",
  in_progress: "bg-amber-50 text-amber-700 ring-amber-600/15",
  paid: "bg-cyan-50 text-cyan-700 ring-cyan-600/15",
  completed: "bg-emerald-50 text-emerald-700 ring-emerald-600/15",
  rejected: "bg-slate-100 text-slate-600 ring-slate-500/15",
};

export function StatusBadge({ status }: { status: LeadStatus }) {
  const t = useTranslations("Labels.statuses");
  return (
    <span
      className={`inline-flex whitespace-nowrap rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ring-inset ${styles[status]}`}
    >
      {t(status)}
    </span>
  );
}
