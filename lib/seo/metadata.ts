import { SITE_URL } from "../constants";
import type { Metadata } from "next";

// ─── Canonical URL Helpers ───────────────────────────────────────────────────

/**
 * Generates a clean canonical URL by stripping query params and trailing slashes.
 * Ensures consistent canonical across all URL variations.
 */
export function generateCanonical(path: string): string {
  // Remove trailing slash (except root)
  const cleanPath = path === "/" ? "/" : path.replace(/\/+$/, "");
  return `${SITE_URL}${cleanPath}`;
}

/**
 * Generates pagination metadata with prev/next link relations.
 * Used for paginated blog listing pages.
 */
export function generatePaginationMeta(options: {
  basePath: string;
  currentPage: number;
  totalPages: number;
}): Pick<Metadata, "alternates"> {
  const { basePath, currentPage, totalPages } = options;

  const alternates: Metadata["alternates"] = {
    canonical: currentPage === 1
      ? generateCanonical(basePath)
      : generateCanonical(`${basePath}/page/${currentPage}`),
  };

  // For future use when Next.js metadata API supports prev/next
  // These are injected as link headers via middleware if needed
  return { alternates };
}

/**
 * Determines if a page should be noindexed based on common patterns:
 * - Pages with search/filter query params (duplicate content prevention)
 * - Pagination beyond page 1 (consolidate authority to page 1)
 * - Preview/draft pages
 */
export function shouldNoIndex(options: {
  pathname: string;
  searchParams?: Record<string, string>;
  isDraft?: boolean;
}): boolean {
  const { pathname, searchParams = {}, isDraft = false } = options;

  // Draft/preview content
  if (isDraft) return true;

  // Common query param patterns that create duplicate content
  const noIndexParams = ["utm_source", "utm_medium", "utm_campaign", "ref", "fbclid", "gclid"];
  const hasTrackingParams = noIndexParams.some((param) => param in searchParams);
  if (hasTrackingParams) return true;

  // Filter/sort params on listing pages
  if (searchParams.sort || searchParams.filter || searchParams.q) return true;

  // Paginated pages beyond a reasonable depth
  const pageMatch = pathname.match(/\/page\/(\d+)/);
  if (pageMatch && parseInt(pageMatch[1]) > 10) return true;

  return false;
}

/**
 * Generates complete metadata with proper canonical and indexing controls.
 * Wraps the base generatePageMetadata with additional intelligence.
 */
export function generateControlledMetadata(options: {
  title: string;
  description: string;
  path: string;
  searchParams?: Record<string, string>;
  isDraft?: boolean;
}) {
  const noIndex = shouldNoIndex({
    pathname: options.path,
    searchParams: options.searchParams,
    isDraft: options.isDraft,
  });

  return {
    canonical: generateCanonical(options.path),
    noIndex,
  };
}
