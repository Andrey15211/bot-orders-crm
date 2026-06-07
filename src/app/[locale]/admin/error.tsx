"use client";

import { AlertTriangle, RefreshCw } from "lucide-react";
import {useTranslations} from "next-intl";

export default function AdminError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const t = useTranslations("States");
  return (
    <div className="panel flex flex-col items-center px-6 py-16 text-center">
      <span className="flex h-12 w-12 items-center justify-center rounded-full bg-rose-50 text-rose-600">
        <AlertTriangle className="h-6 w-6" />
      </span>
      <h2 className="mt-4 text-xl font-semibold text-slate-950">
        {t("errorTitle")}
      </h2>
      <p className="mt-2 max-w-md text-sm leading-6 text-slate-500">
        {t("errorText")}
      </p>
      <button type="button" className="button-primary mt-6" onClick={reset}>
        <RefreshCw className="h-4 w-4" />
        {t("retry")}
      </button>
    </div>
  );
}
