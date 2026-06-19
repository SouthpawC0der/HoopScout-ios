import Link from "next/link";
import { ChevronRight } from "lucide-react";
import GlobeClient from "@/components/globe-client";

export default function HomePage() {
  return (
    <section className="relative min-h-screen flex flex-col lg:flex-row items-center justify-center overflow-hidden pt-20" style={{ backgroundColor: "#0C1428" }}>

      {/* Left — text */}
      <div className="relative z-10 flex flex-col justify-center px-8 md:px-16 py-16 lg:py-0 lg:w-1/2 max-w-xl mx-auto lg:mx-0">

        <h1
          className="font-black leading-none text-white mb-5"
          style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: "clamp(3rem, 8vw, 6rem)" }}
        >
          SCOUT<br />
          <span style={{ color: "#94A3B8" }}>SMARTER.</span><br />
          PLAY<br />
          <span style={{ color: "#94A3B8" }}>HARDER.</span>
        </h1>

        <p className="text-white/50 text-lg mb-8 max-w-sm leading-relaxed">
          Find courts, rate players, and dominate every game — all from your phone.
        </p>

        <div className="flex flex-col sm:flex-row gap-4">
          <Link
            href="#"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl font-bold text-[#0C1428] text-base hover:opacity-90 transition-opacity duration-200"
            style={{ background: "linear-gradient(135deg, #E2E8F0, #94A3B8)" }}
          >
            Download Free
            <ChevronRight className="w-5 h-5" aria-hidden="true" />
          </Link>
          <Link
            href="/shop"
            className="inline-flex items-center justify-center px-8 py-4 rounded-2xl text-white font-semibold text-base border border-white/20 bg-white/5 hover:bg-white/10 transition-colors duration-200"
          >
            Shop Merch
          </Link>
        </div>

        <p className="mt-8 text-white/25 text-sm">
          10,000+ Players &nbsp;·&nbsp; 500+ Courts &nbsp;·&nbsp; 4.9 ★ App Store
        </p>
      </div>

      {/* Right — globe (client-only, no SSR) */}
      <div className="relative z-10 flex items-center justify-center lg:w-1/2 w-full px-4 pb-8 lg:pb-0">
        <GlobeClient />
      </div>

      {/* Subtle orange glow */}
      <div
        className="absolute left-0 top-1/2 -translate-y-1/2 w-[500px] h-[500px] pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(249,115,22,0.12) 0%, transparent 70%)" }}
        aria-hidden="true"
      />
    </section>
  );
}
