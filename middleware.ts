import createMiddleware from "next-intl/middleware";
import {NextResponse, type NextRequest} from "next/server";
import {routing} from "@/i18n/routing";

export function middleware(request: NextRequest) {
  const [, locale, ...segments] = request.nextUrl.pathname.split("/");
  const internalPath = `/${segments.join("/")}`;
  const isAdminRoute = internalPath === "/admin" || internalPath.startsWith("/admin/");
  const isLoginRoute = internalPath === "/admin/login";
  const hasMockSession = request.cookies.get("crm_mock_session")?.value === "1";

  if (isAdminRoute && !hasMockSession && !isLoginRoute) {
    return NextResponse.redirect(new URL(`/${locale}/admin/login`, request.url));
  }

  if (isAdminRoute && hasMockSession && isLoginRoute) {
    return NextResponse.redirect(new URL(`/${locale}/admin`, request.url));
  }

  return createMiddleware(routing)(request);
}

export const config = {
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
