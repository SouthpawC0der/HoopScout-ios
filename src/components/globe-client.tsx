"use client";

import dynamic from "next/dynamic";

const RotatingEarth = dynamic(
  () => import("@/components/ui/wireframe-dotted-globe"),
  { ssr: false }
);

export default function GlobeClient() {
  return <RotatingEarth width={620} height={620} />;
}
