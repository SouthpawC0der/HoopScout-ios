import Image from "next/image";

interface LogoProps {
  variant?: "white" | "dark";
  size?: "sm" | "md" | "lg";
  className?: string;
}

const sizes = {
  sm: { width: 80,  height: 32 },
  md: { width: 120, height: 48 },
  lg: { width: 160, height: 64 },
};

export default function Logo({ variant: _variant = "white", size = "md", className = "" }: LogoProps) {
  const { width, height } = sizes[size];
  // SVG logos work as placeholders; drop your actual PNGs at the same paths to override
  const src = "/images/Logo3-removebg-preview.png";

  return (
    <Image
      src={src}
      alt="HoopScout"
      width={width}
      height={height}
      className={`object-contain ${className}`}
      priority
    />
  );
}

export function LogoWordmark({ className = "" }: { className?: string }) {
  return (
    <span
      className={`font-heading font-black tracking-tight text-white ${className}`}
      style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
    >
      HOOP<span style={{ color: "#94A3B8" }}>SCOUT</span>
    </span>
  );
}
