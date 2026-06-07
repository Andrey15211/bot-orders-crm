import { Bot, ChevronLeft } from "lucide-react";
import {getTranslations} from "next-intl/server";
import { MockLoginForm } from "@/components/admin/mock-login-form";
import {LocaleSwitcher} from "@/components/locale-switcher";
import {Link} from "@/i18n/navigation";

export default async function LoginPage({
  params,
}: {
  params: Promise<{locale: string}>;
}) {
  const {locale} = await params;
  const t = await getTranslations({locale, namespace: "Login"});
  return (
    <main className="flex min-h-screen items-center justify-center bg-canvas px-5 py-10">
      <div className="w-full max-w-md">
        <Link
          href="/"
          className="mb-6 inline-flex items-center gap-1 text-sm font-medium text-slate-500 hover:text-slate-900"
        >
          <ChevronLeft className="h-4 w-4" />
          {t("back")}
        </Link>
        <div className="panel p-7 sm:p-9">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary-600 text-white">
            <Bot className="h-6 w-6" aria-hidden="true" />
          </div>
          <h1 className="mt-6 text-2xl font-semibold tracking-tight text-slate-950">
            {t("title")}
          </h1>
          <p className="mt-2 text-sm leading-6 text-slate-500">
            {t("description")}
          </p>
          <MockLoginForm />
          <div className="mt-5 flex justify-center">
            <LocaleSwitcher />
          </div>
        </div>
      </div>
    </main>
  );
}
