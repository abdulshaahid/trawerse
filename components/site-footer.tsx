import Link from "next/link";
import Image from "next/image";
import { FOOTER_LINKS, COMPANY } from "@/lib/constants";

export function SiteFooter() {
  return (
    <footer className="relative w-full border-t border-white/5 bg-black px-6 py-16 lg:py-20">
      <div className="absolute inset-0 bg-[radial-gradient(35%_128px_at_50%_0%,theme(backgroundColor.white/5%),transparent)] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto">
        {/* Main Grid */}
        <div className="grid gap-12 lg:grid-cols-5">
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="inline-block">
              <Image
                src="/trawerse.svg"
                alt="Trawerse"
                width={140}
                height={28}
                className="h-6 w-auto"
              />
            </Link>
            <p className="text-muted-foreground text-sm max-w-xs leading-relaxed">
              Premium digital product development studio. We build
              high-performance websites, mobile apps, and SaaS platforms.
            </p>
            <div className="flex items-center gap-2 text-sm text-muted-foreground pt-4 border-t border-white/5">
              <span>Crafted by</span>
              <span className="font-semibold text-white">{COMPANY.founder}</span>
              <Image
                src="/sign.png"
                alt={`${COMPANY.founder} Signature`}
                width={100}
                height={28}
                className="h-7 w-auto ml-1"
              />
            </div>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="text-xs font-medium uppercase tracking-wider text-white mb-4">
              Company
            </h3>
            <ul className="space-y-2.5">
              {FOOTER_LINKS.company.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-white transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services Links */}
          <div>
            <h3 className="text-xs font-medium uppercase tracking-wider text-white mb-4">
              Services
            </h3>
            <ul className="space-y-2.5">
              {FOOTER_LINKS.services.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-white transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources Links */}
          <div>
            <h3 className="text-xs font-medium uppercase tracking-wider text-white mb-4">
              Resources
            </h3>
            <ul className="space-y-2.5">
              {FOOTER_LINKS.resources.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-white transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} {COMPANY.name}. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            {FOOTER_LINKS.social.map((link) => (
              <a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-muted-foreground hover:text-white transition-colors duration-200"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
