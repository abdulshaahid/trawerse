import Link from "next/link";
import Image from "next/image";
import { NAV_LINKS } from "@/lib/constants";

export function SiteHeader() {
  return (
    <header className="fixed top-0 w-full z-[100] py-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="flex items-center justify-between bg-[#0a0a0a]/80 backdrop-blur-2xl border border-white/5 rounded-full px-4 py-2.5">
          {/* Logo */}
          <Link href="/" className="flex items-center hover:opacity-80 transition-opacity">
            <Image
              src="/trawerse.svg"
              alt="Trawerse"
              width={120}
              height={24}
              className="h-5 w-auto"
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-3 py-1.5 text-sm text-muted-foreground hover:text-white transition-colors duration-200 rounded-full hover:bg-white/5"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* CTA Button */}
          <Link
            href="/contact"
            className="px-4 py-2 rounded-full bg-accent text-black text-sm font-semibold hover:shadow-lg transition-all hover:scale-[1.02] active:scale-95"
          >
            Start Project
          </Link>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-muted-foreground hover:text-white transition-colors"
            aria-label="Open menu"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          </button>
        </nav>
      </div>
    </header>
  );
}
