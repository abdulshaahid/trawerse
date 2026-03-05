import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * SEO & Security Middleware
 * ─────────────────────────
 * - Injects hreflang x-default header for future i18n readiness
 * - Adds performance timing headers
 * - Strips trailing slashes for canonical consistency
 */
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const response = NextResponse.next();

  // ── Trailing slash normalization (canonical consistency) ──
  if (pathname !== "/" && pathname.endsWith("/")) {
    const url = request.nextUrl.clone();
    url.pathname = pathname.slice(0, -1);
    return NextResponse.redirect(url, 308);
  }

  // ── hreflang x-default (future international SEO readiness) ──
  const canonicalUrl = `https://trawerse.com${pathname}`;
  response.headers.set(
    "Link",
    `<${canonicalUrl}>; rel="alternate"; hreflang="x-default", <${canonicalUrl}>; rel="alternate"; hreflang="en"`
  );

  // ── Performance timing ──
  response.headers.set("X-Response-Time", Date.now().toString());
  response.headers.set("Server-Timing", 'edge;desc="Edge Processing"');

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - api routes
     * - _next/static (static files)
     * - _next/image (image optimization)
     * - favicon.ico, sitemap.xml, robots.txt
     * - public files (svg, png, jpg, etc.)
     */
    "/((?!api|_next/static|_next/image|favicon\\.ico|sitemap\\.xml|robots\\.txt|.*\\.(?:svg|png|jpg|jpeg|gif|webp|avif|ico)$).*)",
  ],
};
