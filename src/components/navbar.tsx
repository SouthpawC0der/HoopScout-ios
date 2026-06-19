"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import Logo, { LogoWordmark } from "@/components/logo";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/shop", label: "Shop" },
  { href: "/contact", label: "Contact" },
  { href: "/privacy", label: "Privacy" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <div className="mx-4 mt-4">
        <nav
          className="max-w-6xl mx-auto flex items-center justify-between px-6 py-3 rounded-2xl border border-white/10 backdrop-blur-xl"
          style={{ backgroundColor: "rgba(12, 20, 40, 0.88)" }}
        >
          {/* Logo */}
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-3 cursor-pointer">
              <div className="relative w-16 h-16 flex items-center justify-center">
                <Logo variant="white" size="md" className="w-16 h-16" />
              </div>
              <LogoWordmark className="text-xl hidden sm:block" />
            </Link>
          </div>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "px-4 py-2 rounded-xl text-sm font-medium transition-colors duration-200 cursor-pointer",
                  pathname === link.href
                    ? "text-[#94A3B8] bg-white/8"
                    : "text-white/70 hover:text-white hover:bg-white/8"
                )}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-3">
            <Button
              asChild
              className="font-semibold hover:opacity-90 transition-opacity duration-200 rounded-xl cursor-pointer text-[#0C1428]" style={{ background: "linear-gradient(135deg, #E2E8F0, #94A3B8)" }}
            >
              <Link href="/shop">Shop Now</Link>
            </Button>
          </div>

          {/* Mobile menu */}
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger
              className="md:hidden inline-flex items-center justify-center w-9 h-9 rounded-lg text-white hover:bg-white/10 transition-colors duration-200 cursor-pointer"
              aria-label="Open menu"
            >
              <Menu className="w-5 h-5" aria-hidden="true" />
            </SheetTrigger>
            <SheetContent
              side="right"
              className="w-72 border-white/10 flex flex-col gap-0 pt-16"
              style={{ backgroundColor: "#0C1428" }}
            >
              <button
                onClick={() => setOpen(false)}
                className="absolute top-4 right-4 p-2 text-white/60 hover:text-white cursor-pointer"
                aria-label="Close menu"
              >
                <X className="w-5 h-5" />
              </button>
              <div className="flex flex-col gap-1 px-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className={cn(
                      "px-4 py-3 rounded-xl text-base font-medium transition-colors duration-200 cursor-pointer",
                      pathname === link.href
                        ? "text-[#94A3B8] bg-white/8"
                        : "text-white/70 hover:text-white hover:bg-white/8"
                    )}
                  >
                    {link.label}
                  </Link>
                ))}
                <Button
                  asChild
                  className="mt-4 font-semibold hover:opacity-90 transition-opacity rounded-xl cursor-pointer text-[#0C1428]" style={{ background: "linear-gradient(135deg, #E2E8F0, #94A3B8)" }}
                >
                  <Link href="/shop" onClick={() => setOpen(false)}>
                    Shop Now
                  </Link>
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </nav>
      </div>
    </header>
  );
}
