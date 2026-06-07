import { ArrowRight, Bot, Check, LayoutDashboard } from "lucide-react";
import {getTranslations} from "next-intl/server";
import { LeadForm } from "@/components/forms/lead-form";
import {LocaleSwitcher} from "@/components/locale-switcher";
import {Link} from "@/i18n/navigation";

export default async function PublicLeadPage({
  params,
}: {
  params: Promise<{locale: string}>;
}) {
  const {locale} = await params;
  const t = await getTranslations({locale, namespace: "Public"});
  const benefits = [t("benefit1"), t("benefit2"), t("benefit3")];

  return (
    <main className="min-h-screen bg-white">
      <header className="border-b border-slate-200">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 sm:px-8">
          <Link href="/" className="flex items-center gap-3 font-semibold text-slate-950">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary-600 text-white">
              <Bot className="h-5 w-5" aria-hidden="true" />
            </span>
            BotFlow
          </Link>
          <div className="flex items-center gap-3">
            <LocaleSwitcher compact />
            <Link
              href="/admin"
              className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-slate-950"
            >
              <LayoutDashboard className="h-4 w-4" aria-hidden="true" />
              <span className="hidden sm:inline">{t("login")}</span>
              <span className="sm:hidden">CRM</span>
            </Link>
          </div>
        </div>
      </header>

      <section className="bg-canvas">
        <div className="mx-auto grid max-w-6xl items-start gap-10 px-5 py-12 sm:px-8 sm:py-16 lg:grid-cols-[0.82fr_1.18fr] lg:gap-16 lg:py-20">
          <div className="lg:sticky lg:top-10 lg:pt-7">
            <p className="text-sm font-semibold text-primary-600">
              {t("service")}
            </p>
            <h1 className="mt-4 max-w-xl text-4xl font-semibold leading-[1.12] tracking-tight text-slate-950 sm:text-5xl">
              {t("title")}
            </h1>
            <p className="mt-6 max-w-lg text-base leading-7 text-slate-600 sm:text-lg">
              {t("description")}
            </p>

            <ul className="mt-8 space-y-4">
              {benefits.map((benefit) => (
                <li
                  key={benefit}
                  className="flex items-start gap-3 text-sm leading-6 text-slate-700"
                >
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary-100 text-primary-700">
                    <Check className="h-3.5 w-3.5" aria-hidden="true" />
                  </span>
                  {benefit}
                </li>
              ))}
            </ul>

            <div className="mt-10 border-t border-slate-200 pt-6">
              <p className="text-sm text-slate-500">{t("responseLabel")}</p>
              <p className="mt-1 font-semibold text-slate-900">
                {t("responseValue")}
              </p>
            </div>
          </div>

          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-panel">
            <LeadForm />
          </div>
        </div>
      </section>

      <footer className="border-t border-slate-200 bg-white">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 px-5 py-6 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <span>{t("footer")}</span>
          <Link
            href="/admin"
            className="inline-flex items-center gap-1.5 font-medium text-primary-600 hover:text-primary-700"
          >
            {t("openDemo")}
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </footer>
    </main>
  );
}
