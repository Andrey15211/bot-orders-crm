"use client";

import {
  ArrowLeft,
  CalendarDays,
  Check,
  Clock3,
  MessageCircle,
  Plus,
  Save,
  UserRound,
} from "lucide-react";
import {useFormatter, useLocale, useTranslations} from "next-intl";
import { useMemo, useState } from "react";
import { useLeads } from "@/components/providers/lead-provider";
import { StatusBadge } from "@/components/table/status-badge";
import {Link} from "@/i18n/navigation";
import {
  botFeatures,
  leadStatuses,
  type BotFeature,
  type LeadStatus,
} from "@/types/lead";
import {
  basePrices,
  calculateEstimatedPrice,
  featurePrices,
  formatCurrency,
} from "@/utils/pricing";

export function LeadDetail({ leadId }: { leadId: string }) {
  const t = useTranslations("LeadDetail");
  const labels = useTranslations("Labels");
  const common = useTranslations("Common");
  const locale = useLocale();
  const format = useFormatter();
  const { leads, isLoading, setStatus, addNote, updateLead } = useLeads();
  const lead = leads.find((item) => item.id === leadId);
  const [note, setNote] = useState("");
  const [selectedFeatures, setSelectedFeatures] = useState<BotFeature[] | null>(
    null,
  );
  const features = useMemo(
    () => selectedFeatures ?? lead?.features ?? [],
    [lead?.features, selectedFeatures],
  );
  const estimatedPrice = useMemo(
    () => (lead ? calculateEstimatedPrice(lead.botType, features) : 0),
    [features, lead],
  );

  if (isLoading) {
    return <div className="h-[620px] animate-pulse rounded-xl bg-slate-200" aria-label={common("loading")} />;
  }

  if (!lead) {
    return (
      <div className="panel px-6 py-16 text-center">
        <h1 className="text-xl font-semibold text-slate-950">
          {t("notFoundTitle")}
        </h1>
        <p className="mt-2 text-sm text-slate-500">
          {t("notFoundText")}
        </p>
        <Link href="/admin" className="button-primary mt-6">
          {t("backToList")}
        </Link>
      </div>
    );
  }

  const currentLeadId = lead.id;
  const currentLeadFeatures = lead.features;

  function submitNote(event: React.FormEvent) {
    event.preventDefault();
    const trimmed = note.trim();
    if (!trimmed) return;
    addNote(currentLeadId, trimmed);
    setNote("");
  }

  function toggleFeature(feature: BotFeature) {
    setSelectedFeatures((current) => {
      const active = current ?? currentLeadFeatures;
      return active.includes(feature)
        ? active.filter((item) => item !== feature)
        : [...active, feature];
    });
  }

  return (
    <div>
      <Link
        href="/admin"
        className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-slate-900"
      >
        <ArrowLeft className="h-4 w-4" />
        {t("allLeads")}
      </Link>

      <div className="mt-5 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <div className="flex flex-wrap items-center gap-3">
            <h1 className="text-2xl font-semibold tracking-tight text-slate-950 sm:text-3xl">
              {lead.name}
            </h1>
            <StatusBadge status={lead.status} />
          </div>
          <p className="mt-2 text-sm text-slate-500">
            {t("createdAt", {
              date: format.dateTime(new Date(lead.createdAt), {
                dateStyle: "long",
                timeStyle: "short",
              }),
            })}
          </p>
        </div>
        <label className="block w-full sm:w-52">
          <span className="field-label">{t("changeStatus")}</span>
          <select
            className="field"
            value={lead.status}
            onChange={(event) =>
              setStatus(currentLeadId, event.target.value as LeadStatus)
            }
          >
            {leadStatuses.map((status) => (
              <option key={status} value={status}>
                {labels(`statuses.${status}`)}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="mt-7 grid items-start gap-6 xl:grid-cols-[minmax(0,1.15fr)_minmax(340px,0.85fr)]">
        <div className="space-y-6">
          <section className="panel p-5 sm:p-6">
            <h2 className="text-base font-semibold text-slate-950">
              {t("info")}
            </h2>
            <dl className="mt-5 grid gap-x-8 gap-y-5 sm:grid-cols-2">
              <DetailItem
                icon={UserRound}
                label={t("contact")}
                value={lead.contact}
              />
              <DetailItem
                icon={MessageCircle}
                label={t("business")}
                value={labels(`businessTypes.${lead.businessType}`)}
              />
              <DetailItem
                icon={Check}
                label={t("solution")}
                value={labels(`botTypes.${lead.botType}`)}
              />
              <DetailItem
                icon={CalendarDays}
                label={t("deadline")}
                value={format.dateTime(new Date(`${lead.deadline}T00:00:00`), {
                  dateStyle: "long",
                })}
              />
              <DetailItem
                icon={Clock3}
                label={t("budget")}
                value={labels(`budgets.${lead.budgetRange}`)}
              />
            </dl>

            <div className="mt-6 border-t border-line pt-5">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                {t("description")}
              </p>
              <p className="mt-2 text-sm leading-6 text-slate-700">
                {lead.comment}
              </p>
            </div>

            <div className="mt-6 border-t border-line pt-5">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                {t("features")}
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {lead.features.length ? (
                  lead.features.map((feature) => (
                    <span
                      key={feature}
                      className="rounded-md bg-slate-100 px-2.5 py-1.5 text-xs font-medium text-slate-700"
                    >
                      {labels(`features.${feature}`)}
                    </span>
                  ))
                ) : (
                  <span className="text-sm text-slate-400">{t("none")}</span>
                )}
              </div>
            </div>
          </section>

          <section className="panel p-5 sm:p-6">
            <div>
              <h2 className="text-base font-semibold text-slate-950">
                {t("notes")}
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                {t("notesDescription")}
              </p>
            </div>

            <form onSubmit={submitNote} className="mt-5">
              <label>
                <span className="sr-only">{t("newNote")}</span>
                <textarea
                  className="field min-h-24 resize-y"
                  placeholder={t("notePlaceholder")}
                  value={note}
                  onChange={(event) => setNote(event.target.value)}
                />
              </label>
              <button
                type="submit"
                className="button-primary mt-3"
                disabled={!note.trim()}
              >
                <Plus className="h-4 w-4" />
                {t("addNote")}
              </button>
            </form>

            <div className="mt-6 space-y-3">
              {lead.notes.length ? (
                lead.notes.map((item) => (
                  <article
                    key={item.id}
                    className="rounded-lg border border-line bg-slate-50 px-4 py-3.5"
                  >
                    <p className="text-sm leading-6 text-slate-700">{item.text}</p>
                    <time className="mt-2 block text-xs text-slate-400">
                      {format.dateTime(new Date(item.createdAt), {
                        dateStyle: "long",
                        timeStyle: "short",
                      })}
                    </time>
                  </article>
                ))
              ) : (
                <p className="rounded-lg border border-dashed border-slate-300 px-4 py-6 text-center text-sm text-slate-400">
                  {t("noNotes")}
                </p>
              )}
            </div>
          </section>
        </div>

        <aside className="panel p-5 sm:p-6 xl:sticky xl:top-8">
          <h2 className="text-base font-semibold text-slate-950">
            {t("estimate")}
          </h2>
          <p className="mt-1 text-sm leading-6 text-slate-500">
            {t("estimateDescription")}
          </p>

          <div className="mt-5 rounded-lg bg-primary-50 p-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-primary-700">
              {t("currentEstimate")}
            </p>
            <p className="mt-1 text-3xl font-semibold tracking-tight text-slate-950">
              {formatCurrency(estimatedPrice, locale)}
            </p>
            {lead.estimatedPrice ? (
              <p className="mt-1 text-xs text-slate-500">
                {t("savedEstimate", {
                  price: formatCurrency(lead.estimatedPrice, locale),
                })}
              </p>
            ) : null}
          </div>

          <div className="mt-5 flex items-center justify-between border-b border-line pb-4 text-sm">
            <span className="text-slate-600">{labels(`botTypes.${lead.botType}`)}</span>
            <span className="font-semibold text-slate-900">
              {formatCurrency(basePrices[lead.botType], locale)}
            </span>
          </div>

          <div className="mt-4 space-y-2.5">
            {botFeatures.map((feature) => {
              const checked = features.includes(feature);
              return (
                <label
                  key={feature}
                  className="flex cursor-pointer items-center justify-between gap-4 rounded-lg px-2 py-2 text-sm hover:bg-slate-50"
                >
                  <span className="flex items-center gap-3 text-slate-700">
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={() => toggleFeature(feature)}
                      className="h-4 w-4 rounded border-slate-300 text-primary-600 focus:ring-primary-500"
                    />
                    {labels(`features.${feature}`)}
                  </span>
                  <span className="whitespace-nowrap text-xs font-medium text-slate-400">
                    +{formatCurrency(featurePrices[feature], locale)}
                  </span>
                </label>
              );
            })}
          </div>

          <button
            type="button"
            className="button-primary mt-5 w-full"
            onClick={() => {
              updateLead(currentLeadId, {
                features,
                estimatedPrice,
              });
              setSelectedFeatures(null);
            }}
          >
            <Save className="h-4 w-4" />
            {t("saveEstimate")}
          </button>
          <p className="mt-3 text-xs leading-5 text-slate-400">
            {t("estimateNotice")}
          </p>
        </aside>
      </div>
    </div>
  );
}

function DetailItem({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof UserRound;
  label: string;
  value: string;
}) {
  return (
    <div className="flex gap-3">
      <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-slate-500">
        <Icon className="h-4 w-4" aria-hidden="true" />
      </span>
      <div>
        <dt className="text-xs text-slate-400">{label}</dt>
        <dd className="mt-1 text-sm font-medium text-slate-800">{value}</dd>
      </div>
    </div>
  );
}
