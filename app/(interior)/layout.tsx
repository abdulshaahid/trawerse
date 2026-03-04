import type React from "react";
import Footer from "@/components/ui/footer-section";
import { InteriorNavbar } from "@/components/interior-navbar";

export default function InteriorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative overflow-x-hidden">
      {/* ==========  AMBIENT LIGHT — TOP-LEFT  ========== */}
      <div
        className="pointer-events-none fixed -top-32 -left-32 z-0"
        aria-hidden="true"
      >
        <div className="h-[800px] w-[800px] rounded-full bg-[#11ae62]/[0.12] blur-[160px] animate-[pulse_4s_ease-in-out_infinite]" />
      </div>

      {/* ==========  AMBIENT LIGHT — BOTTOM-RIGHT  ========== */}
      <div
        className="pointer-events-none fixed -bottom-32 -right-32 z-0"
        aria-hidden="true"
      >
        <div className="h-[800px] w-[800px] rounded-full bg-[#11ae62]/[0.10] blur-[160px] animate-[pulse_5s_ease-in-out_infinite_1s]" />
      </div>

      {/* Navbar */}
      <InteriorNavbar />

      {/* Page content */}
      <main className="relative z-[1] min-h-screen pt-20">{children}</main>

      {/* Main footer */}
      <Footer />
    </div>
  );
}
