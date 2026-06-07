import {getTranslations} from "next-intl/server";
import {Link} from "@/i18n/navigation";

export default async function NotFound() {
  const t = await getTranslations("States");
  return (
    <main className="flex min-h-screen items-center justify-center bg-canvas px-5">
      <div className="panel max-w-md px-8 py-14 text-center">
        <p className="text-sm font-semibold text-primary-600">404</p>
        <h1 className="mt-2 text-2xl font-semibold text-slate-950">
          {t("notFoundTitle")}
        </h1>
        <p className="mt-3 text-sm leading-6 text-slate-500">
          {t("notFoundText")}
        </p>
        <Link href="/" className="button-primary mt-6">
          {t("home")}
        </Link>
      </div>
    </main>
  );
}
