"use client";

import {useLocale} from "next-intl";
import {usePathname, useRouter} from "@/i18n/navigation";
import type {AppLocale} from "@/i18n/routing";

export function LocaleSwitcher({compact = false}: {compact?: boolean}) {
  const locale = useLocale() as AppLocale;
  const pathname = usePathname();
  const router = useRouter();

  function changeLocale(nextLocale: AppLocale) {
    router.replace(pathname, {locale: nextLocale});
  }

  return (
    <div
      className="inline-flex rounded-lg border border-slate-200 bg-white p-1"
      aria-label="Language"
    >
      {(["ru", "en"] as const).map((item) => (
        <button
          key={item}
          type="button"
          onClick={() => changeLocale(item)}
          aria-pressed={locale === item}
          className={`rounded-md px-2 py-1 text-xs font-semibold uppercase transition ${
            locale === item
              ? "bg-primary-600 text-white"
              : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
          } ${compact ? "min-w-8" : "min-w-9"}`}
        >
          {item}
        </button>
      ))}
    </div>
  );
}
