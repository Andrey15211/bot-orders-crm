"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2, Loader2, Send } from "lucide-react";
import {useTranslations} from "next-intl";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {botFeatures, botTypes, businessTypes, type Lead} from "@/types/lead";

type LeadFormValues = Omit<Lead, "id" | "status" | "createdAt" | "notes" | "estimatedPrice">;

const customLeadsKey = "bot-orders-crm:custom-leads";

export function LeadForm() {
  const t = useTranslations("Form");
  const labels = useTranslations("Labels");
  const leadSchema = z.object({
    name: z.string().min(2, t("validation.name")),
    contact: z
      .string()
      .min(5, t("validation.contact"))
      .refine(
        (value) => value.startsWith("@") || /[\d+() -]{7,}/.test(value),
        t("validation.contactFormat"),
      ),
    businessType: z.enum(businessTypes, {required_error: t("validation.business")}),
    botType: z.enum(botTypes, {required_error: t("validation.botType")}),
    budgetRange: z.enum(
      ["under_50000", "50000_100000", "100000_200000", "over_200000"],
      {required_error: t("validation.budget")},
    ),
    deadline: z.string().min(1, t("validation.deadline")),
    features: z.array(z.enum(botFeatures)).default([]),
    comment: z
      .string()
      .min(10, t("validation.commentMin"))
      .max(1000, t("validation.commentMax")),
  });
  const [submittedName, setSubmittedName] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<LeadFormValues>({
    resolver: zodResolver(leadSchema),
    defaultValues: { features: [] },
  });

  async function onSubmit(values: LeadFormValues) {
    await new Promise((resolve) => window.setTimeout(resolve, 500));

    const lead: Lead = {
      id: `lead-${crypto.randomUUID()}`,
      ...values,
      status: "new",
      createdAt: new Date().toISOString(),
      notes: [],
    };

    const existing = JSON.parse(
      window.localStorage.getItem(customLeadsKey) ?? "[]",
    ) as Lead[];
    window.localStorage.setItem(
      customLeadsKey,
      JSON.stringify([lead, ...existing]),
    );

    setSubmittedName(values.name);
    reset();
  }

  if (submittedName) {
    return (
      <div
        className="flex min-h-[520px] flex-col items-center justify-center px-8 text-center"
        role="status"
      >
        <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
          <CheckCircle2 className="h-7 w-7" aria-hidden="true" />
        </div>
        <h2 className="text-2xl font-semibold text-slate-950">
          {t("successTitle")}
        </h2>
        <p className="mt-3 max-w-sm text-sm leading-6 text-slate-600">
          {t("successText", {name: submittedName})}
        </p>
        <button
          type="button"
          className="button-secondary mt-7"
          onClick={() => setSubmittedName(null)}
        >
          {t("submitAnother")}
        </button>
      </div>
    );
  }

  return (
    <form
      className="p-6 sm:p-8"
      onSubmit={handleSubmit(onSubmit)}
      noValidate
    >
      <div className="mb-7">
        <h2 className="text-xl font-semibold text-slate-950">{t("title")}</h2>
        <p className="mt-1.5 text-sm text-slate-500">
          {t("requiredHint")}
        </p>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <FormField label={t("name")} error={errors.name?.message}>
          <input
            className="field"
            placeholder={t("namePlaceholder")}
            {...register("name")}
          />
        </FormField>

        <FormField
          label={t("contact")}
          error={errors.contact?.message}
        >
          <input
            className="field"
            placeholder={t("contactPlaceholder")}
            {...register("contact")}
          />
        </FormField>

        <FormField label={t("business")} error={errors.businessType?.message}>
          <select className="field" defaultValue="" {...register("businessType")}>
            <option value="" disabled>
              {t("selectBusiness")}
            </option>
            {businessTypes.map((type) => (
              <option key={type} value={type}>
                {labels(`businessTypes.${type}`)}
              </option>
            ))}
          </select>
        </FormField>

        <FormField label={t("botType")} error={errors.botType?.message}>
          <select className="field" defaultValue="" {...register("botType")}>
            <option value="" disabled>
              {t("selectBot")}
            </option>
            {botTypes.map((type) => (
              <option key={type} value={type}>
                {labels(`botTypes.${type}`)}
              </option>
            ))}
          </select>
        </FormField>

        <FormField label={t("budget")} error={errors.budgetRange?.message}>
          <select className="field" defaultValue="" {...register("budgetRange")}>
            <option value="" disabled>
              {t("selectBudget")}
            </option>
            {(["under_50000", "50000_100000", "100000_200000", "over_200000"] as const).map((value) => (
              <option key={value} value={value}>
                {labels(`budgets.${value}`)}
              </option>
            ))}
          </select>
        </FormField>

        <FormField label={t("deadline")} error={errors.deadline?.message}>
          <input
            className="field"
            type="date"
            min={new Date().toISOString().slice(0, 10)}
            {...register("deadline")}
          />
        </FormField>
      </div>

      <fieldset className="mt-6">
        <legend className="field-label">{t("features")}</legend>
        <div className="grid gap-2.5 sm:grid-cols-2">
          {botFeatures.map((feature) => (
            <label
              key={feature}
              className="flex cursor-pointer items-center gap-3 rounded-lg border border-slate-200 px-3.5 py-3 text-sm text-slate-700 transition hover:border-primary-300 hover:bg-primary-50/40"
            >
              <input
                type="checkbox"
                value={feature}
                className="h-4 w-4 rounded border-slate-300 text-primary-600 focus:ring-primary-500"
                {...register("features")}
              />
              {labels(`features.${feature}`)}
            </label>
          ))}
        </div>
      </fieldset>

      <div className="mt-6">
        <FormField label={t("comment")} error={errors.comment?.message}>
          <textarea
            className="field min-h-28 resize-y"
            placeholder={t("commentPlaceholder")}
            {...register("comment")}
          />
        </FormField>
      </div>

      <button
        type="submit"
        className="button-primary mt-6 w-full"
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
        ) : (
          <Send className="h-4 w-4" aria-hidden="true" />
        )}
        {isSubmitting ? t("submitting") : t("submit")}
      </button>
      <p className="mt-3 text-center text-xs leading-5 text-slate-400">
        {t("demoNotice")}
      </p>
    </form>
  );
}

function FormField({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="field-label">{label}</span>
      {children}
      {error ? (
        <span className="mt-1.5 block text-xs font-medium text-rose-600">
          {error}
        </span>
      ) : null}
    </label>
  );
}
