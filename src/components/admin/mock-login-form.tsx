"use client";

import { Loader2, LogIn } from "lucide-react";
import {useTranslations} from "next-intl";
import { useState } from "react";
import {useRouter} from "@/i18n/navigation";

export function MockLoginForm() {
  const t = useTranslations("Login");
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function login(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    await new Promise((resolve) => window.setTimeout(resolve, 450));
    document.cookie = "crm_mock_session=1; path=/; max-age=86400; samesite=lax";
    router.push("/admin");
    router.refresh();
  }

  return (
    <form onSubmit={login} className="mt-8 space-y-5">
      <label className="block">
        <span className="field-label">{t("email")}</span>
        <input
          className="field"
          type="email"
          defaultValue="admin@botflow.demo"
          autoComplete="email"
          required
        />
      </label>
      <label className="block">
        <span className="field-label">{t("password")}</span>
        <input
          className="field"
          type="password"
          defaultValue="demo1234"
          autoComplete="current-password"
          required
        />
      </label>
      <button className="button-primary w-full" type="submit" disabled={loading}>
        {loading ? (
          <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
        ) : (
          <LogIn className="h-4 w-4" aria-hidden="true" />
        )}
        {loading ? t("submitting") : t("submit")}
      </button>
      <p className="text-center text-xs leading-5 text-slate-400">
        {t("hint")}
      </p>
    </form>
  );
}
