"use client";

import {
  Bot,
  FileText,
  LayoutDashboard,
  LogOut,
  RotateCcw,
  Settings,
} from "lucide-react";
import {useTranslations} from "next-intl";
import { useLeads } from "@/components/providers/lead-provider";
import {LocaleSwitcher} from "@/components/locale-switcher";
import {Link, usePathname, useRouter} from "@/i18n/navigation";

export function Sidebar({ onNavigate }: { onNavigate?: () => void }) {
  const t = useTranslations("Navigation");
  const pathname = usePathname();
  const router = useRouter();
  const { resetDemo } = useLeads();
  const navigation = [
    {href: "/admin" as const, label: t("overview"), icon: LayoutDashboard},
    {href: "/admin#leads" as const, label: t("leads"), icon: FileText},
  ];

  function logout() {
    document.cookie =
      "crm_mock_session=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <aside className="sticky top-0 flex h-screen flex-col border-r border-line bg-white p-4">
      <Link
        href="/admin"
        onClick={onNavigate}
        className="flex h-12 items-center gap-3 px-2 font-semibold text-slate-950"
      >
        <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary-600 text-white">
          <Bot className="h-5 w-5" aria-hidden="true" />
        </span>
        <span>
          BotFlow
          <span className="block text-[11px] font-medium uppercase tracking-wider text-slate-400">
            {t("leadManagement")}
          </span>
        </span>
      </Link>

      <nav className="mt-8 space-y-1" aria-label={t("mainNavigation")}>
        {navigation.map((item) => {
          const Icon = item.icon;
          const active =
            item.href === "/admin"
              ? pathname === "/admin" && !item.href.includes("#")
              : false;
          return (
            <Link
              key={item.label}
              href={item.href}
              onClick={onNavigate}
              className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition ${
                active
                  ? "bg-primary-50 text-primary-700"
                  : "text-slate-600 hover:bg-slate-50 hover:text-slate-950"
              }`}
            >
              <Icon className="h-4.5 w-4.5" aria-hidden="true" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="mt-7 border-t border-slate-200 pt-5">
        <p className="px-3 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
          {t("demo")}
        </p>
        <button
          type="button"
          onClick={resetDemo}
          className="mt-2 flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm font-medium text-slate-600 hover:bg-slate-50 hover:text-slate-950"
        >
          <RotateCcw className="h-4.5 w-4.5" aria-hidden="true" />
          {t("resetData")}
        </button>
        <span className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-400">
          <Settings className="h-4.5 w-4.5" aria-hidden="true" />
          {t("settings")}
        </span>
      </div>

      <div className="mt-auto border-t border-slate-200 pt-4">
        <div className="mb-3 px-3">
          <p className="text-sm font-medium text-slate-800">{t("admin")}</p>
          <p className="mt-0.5 text-xs text-slate-400">admin@botflow.demo</p>
        </div>
        <button
          type="button"
          onClick={logout}
          className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-600 hover:bg-rose-50 hover:text-rose-700"
        >
          <LogOut className="h-4.5 w-4.5" aria-hidden="true" />
          {t("logout")}
        </button>
        <div className="mt-3 px-3">
          <LocaleSwitcher />
        </div>
      </div>
    </aside>
  );
}
