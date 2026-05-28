"use client";

import { motion } from "framer-motion";

const icons: Record<string, React.FC<{ size: number }>> = {
  Audio: ({ size }) => (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" aria-hidden>
      <rect x="18" y="4" width="12" height="22" rx="6" stroke="currentColor" strokeWidth="1.8" />
      <path d="M10 24c0 7.732 6.268 14 14 14s14-6.268 14-14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <line x1="24" y1="38" x2="24" y2="44" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <line x1="18" y1="44" x2="30" y2="44" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  ),
  Camera: ({ size }) => (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" aria-hidden>
      <rect x="4" y="14" width="40" height="28" rx="3" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="24" cy="28" r="8" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="24" cy="28" r="3" fill="currentColor" opacity="0.2" />
      <path d="M16 14l3-6h10l3 6" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
      <rect x="32" y="19" width="6" height="4" rx="1" fill="currentColor" opacity="0.3" />
    </svg>
  ),
  Desk: ({ size }) => (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" aria-hidden>
      <rect x="4" y="28" width="40" height="8" rx="2" stroke="currentColor" strokeWidth="1.8" />
      <rect x="10" y="12" width="8" height="16" rx="2" stroke="currentColor" strokeWidth="1.6" opacity="0.5" />
      <rect x="20" y="8" width="8" height="20" rx="2" stroke="currentColor" strokeWidth="1.8" />
      <rect x="30" y="15" width="8" height="13" rx="2" stroke="currentColor" strokeWidth="1.6" opacity="0.5" />
      <line x1="14" y1="36" x2="14" y2="44" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" opacity="0.4" />
      <line x1="24" y1="36" x2="24" y2="44" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" opacity="0.4" />
      <line x1="34" y1="36" x2="34" y2="44" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" opacity="0.4" />
    </svg>
  ),
};

export function ProductPlaceholder({ category, size = "lg" }: { category: string; size?: "sm" | "lg" }) {
  const Icon = icons[category] ?? icons["Camera"];
  const iconSize = size === "lg" ? 40 : 20;

  if (size === "sm") {
    return (
      <div className="w-full h-full flex items-center justify-center bg-secondary text-ink/30">
        <Icon size={iconSize} />
      </div>
    );
  }

  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-5 bg-secondary text-ink/25 select-none">
      {/* Engineering diagram rings */}
      <div className="relative flex items-center justify-center">
        {/* Crosshair lines */}
        <div className="absolute w-32 h-[1px] bg-ink/10" />
        <div className="absolute w-[1px] h-32 bg-ink/10" />
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
          className="absolute w-28 h-28 rounded-full border border-dashed border-ink/12"
        />
        <div className="absolute w-20 h-20 rounded-full border border-ink/15" />
        <div className="w-12 h-12 rounded-full bg-paper border border-ink/20 flex items-center justify-center text-ink/40">
          <Icon size={iconSize} />
        </div>
      </div>
      <span className="font-mono text-[9px] tracking-[0.35em] uppercase text-ink/25">
        {category} · Add Photo
      </span>
    </div>
  );
}
