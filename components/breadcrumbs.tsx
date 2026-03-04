import Link from "next/link";
import { JsonLd, breadcrumbSchema } from "@/lib/seo";

interface BreadcrumbItem {
  label: string;
  href: string;
}

export function Breadcrumbs({ items }: { items: BreadcrumbItem[] }) {
  const allItems = [{ label: "Home", href: "/" }, ...items];

  return (
    <>
      <JsonLd
        data={breadcrumbSchema(
          allItems.map((item) => ({ name: item.label, href: item.href }))
        )}
      />
      <nav aria-label="Breadcrumb" className="mb-6">
        <ol className="flex flex-wrap items-center gap-1.5 text-sm text-muted-foreground">
          {allItems.map((item, index) => (
            <li key={item.href} className="flex items-center gap-1.5">
              {index > 0 && (
                <span className="text-white/20" aria-hidden="true">
                  /
                </span>
              )}
              {index === allItems.length - 1 ? (
                <span className="text-white/70 font-medium" aria-current="page">
                  {item.label}
                </span>
              ) : (
                <Link
                  href={item.href}
                  className="hover:text-white transition-colors duration-200"
                >
                  {item.label}
                </Link>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </>
  );
}
