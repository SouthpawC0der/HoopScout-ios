import type { Metadata } from "next";
import { Barlow, Barlow_Condensed } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import "./globals.css";

const barlow = Barlow({
  variable: "--font-barlow",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const barlowCondensed = Barlow_Condensed({
  variable: "--font-barlow-condensed",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: {
    default: "HoopScout — Scout Smarter. Play Harder.",
    template: "%s | HoopScout",
  },
  description:
    "HoopScout is the ultimate basketball scouting app. Find courts, track players, and dominate the game.",
  keywords: ["basketball", "scouting", "hoops", "player tracking", "basketball app"],
  openGraph: {
    title: "HoopScout — Scout Smarter. Play Harder.",
    description:
      "The ultimate basketball scouting app. Find courts, track players, and dominate the game.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${barlow.variable} ${barlowCondensed.variable} h-full`}
    >
      <body className="min-h-full flex flex-col antialiased">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <Toaster richColors theme="dark" />
      </body>
    </html>
  );
}
