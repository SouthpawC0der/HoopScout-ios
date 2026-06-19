import Link from "next/link";
import { LogoWordmark } from "@/components/logo";

const footerLinks = [
  {
    title: "App",
    links: [
      { label: "Download iOS", href: "#download" },
      { label: "Download Android", href: "#download" },
    ],
  },
  {
    title: "Store",
    links: [{ label: "Shop Merch", href: "/shop" }],
  },
  {
    title: "Company",
    links: [
      { label: "Contact", href: "/contact" },
      { label: "Privacy Policy", href: "/privacy" },
    ],
  },
];

export default function Footer() {
  return (
    <footer
      className="border-t border-white/8 mt-auto"
      style={{ backgroundColor: "#080E1E" }}
    >
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <LogoWordmark className="text-2xl mb-4 block" />
            <p className="text-white/50 text-sm leading-relaxed max-w-xs">
              The ultimate basketball scouting app. Find courts, track players, and
              dominate the game.
            </p>
          </div>

          {/* Links */}
          {footerLinks.map((section) => (
            <div key={section.title}>
              <h3 className="text-white font-semibold text-sm mb-4 tracking-wider uppercase opacity-50 font-heading">
                {section.title}
              </h3>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-white/60 hover:text-white text-sm transition-colors duration-200 cursor-pointer"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-8 border-t border-white/8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white/30 text-sm">
            &copy; {new Date().getFullYear()} HoopScout. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link
              href="/privacy"
              className="text-white/30 hover:text-white/60 text-sm transition-colors duration-200 cursor-pointer"
            >
              Privacy Policy
            </Link>
            <Link
              href="/contact"
              className="text-white/30 hover:text-white/60 text-sm transition-colors duration-200 cursor-pointer"
            >
              Contact
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
