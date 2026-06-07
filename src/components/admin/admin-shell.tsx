"use client";

import { Menu, X } from "lucide-react";
import {useTranslations} from "next-intl";
import { useState } from "react";
import { Sidebar } from "@/components/admin/sidebar";
import {usePathname} from "@/i18n/navigation";

export function AdminShell({ children }: { children: React.ReactNode }) {
  const t = useTranslations("Navigation");
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  if (pathname === "/admin/login") {
    return children;
  }

  return (
    <div className="min-h-screen bg-canvas lg:grid lg:grid-cols-[248px_1fr]">
      <div className="hidden lg:block">
        <Sidebar />
      </div>

      {isOpen ? (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button
            type="button"
            aria-label={t("closeMenu")}
            className="absolute inset-0 bg-slate-950/35"
            onClick={() => setIsOpen(false)}
          />
          <div className="relative h-full w-[280px] bg-white shadow-2xl">
            <button
              type="button"
              aria-label={t("closeMenu")}
              className="absolute right-3 top-3 z-10 rounded-lg p-2 text-slate-500 hover:bg-slate-100"
              onClick={() => setIsOpen(false)}
            >
              <X className="h-5 w-5" />
            </button>
            <Sidebar onNavigate={() => setIsOpen(false)} />
          </div>
        </div>
      ) : null}

      <div className="min-w-0">
        <header className="sticky top-0 z-30 flex h-16 items-center border-b border-line bg-white/95 px-4 backdrop-blur lg:hidden">
          <button
            type="button"
            aria-label={t("openMenu")}
            className="rounded-lg p-2 text-slate-600 hover:bg-slate-100"
            onClick={() => setIsOpen(true)}
          >
            <Menu className="h-5 w-5" />
          </button>
          <span className="ml-3 text-sm font-semibold text-slate-950">
            BotFlow CRM
          </span>
        </header>
        <main className="mx-auto max-w-[1500px] p-4 sm:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
