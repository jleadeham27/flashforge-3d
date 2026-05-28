"use client";

import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { ArrowUpRight } from "lucide-react";

/* ── Ticker ─────────────────────────────────────────── */
const ITEMS = [
  "HIGH-TEMP PETG", "DROP TESTED · 1.5M", "ZERO RATTLE", "IP44 RATED",
  "ANTI-VIBRATION", "SHIPS ASSEMBLED", "CREATOR APPROVED", "0.2MM PRECISION",
];

function Ticker() {
  const doubled = [...ITEMS, ...ITEMS];
  return (
    <div className="overflow-hidden border-t border-b border-border/60 py-2.5 bg-paper">
      <div className="flex animate-marquee whitespace-nowrap">
        {doubled.map((item, i) => (
          <span key={i} className="flex items-center gap-5 px-5">
            <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-ink/40">
              {item}
            </span>
            <span className="w-[3px] h-[3px] rounded-full bg-accent flex-shrink-0" />
          </span>
        ))}
      </div>
    </div>
  );
}

/* ── Animated counter ───────────────────────────────── */
function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const [val, setVal] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setStarted(true); }, { threshold: 0.5 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!started) return;
    let frame: number;
    const dur = 900;
    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min((now - start) / dur, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setVal(Math.round(eased * to));
      if (p < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [started, to]);

  return <span ref={ref}>{val}{suffix}</span>;
}

/* ── Clip-path word reveal ──────────────────────────── */
function RevealWord({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  return (
    <span className="inline-block overflow-hidden">
      <motion.span
        initial={{ y: "105%" }}
        animate={{ y: "0%" }}
        transition={{ delay, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className={`inline-block ${className}`}
      >
        {children}
      </motion.span>
    </span>
  );
}

/* ── Main ───────────────────────────────────────────── */
export function HeroSection() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const bgY    = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const fadeOut = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <>
      <section ref={ref} className="relative overflow-hidden bg-paper min-h-[95vh] flex flex-col justify-center pt-16">

        {/* Engineering graph-paper grid */}
        <motion.div
          style={{ y: bgY }}
          className="absolute inset-0 pointer-events-none"
        >
          {/* Fine grid */}
          <div
            className="absolute inset-0 opacity-[0.18]"
            style={{
              backgroundImage:
                "linear-gradient(#0F0E0C 1px, transparent 1px), linear-gradient(90deg, #0F0E0C 1px, transparent 1px)",
              backgroundSize: "20px 20px",
            }}
          />
          {/* Major grid */}
          <div
            className="absolute inset-0 opacity-[0.08]"
            style={{
              backgroundImage:
                "linear-gradient(#0F0E0C 1px, transparent 1px), linear-gradient(90deg, #0F0E0C 1px, transparent 1px)",
              backgroundSize: "100px 100px",
            }}
          />
        </motion.div>

        {/* Top-left corner crosshair */}
        <div className="absolute top-20 left-6 pointer-events-none opacity-30">
          <div className="w-8 h-[1px] bg-ink" />
          <div className="w-[1px] h-8 bg-ink -mt-8 ml-[14px]" />
        </div>
        {/* Bottom-right crosshair */}
        <div className="absolute bottom-16 right-6 pointer-events-none opacity-30">
          <div className="w-8 h-[1px] bg-ink" />
          <div className="w-[1px] h-8 bg-ink -mt-8 ml-[14px]" />
        </div>

        {/* ── Content ── */}
        <motion.div style={{ opacity: fadeOut }} className="relative z-10 max-w-[1400px] mx-auto px-6 w-full">

          {/* Index label */}
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="flex items-center gap-3 mb-6"
          >
            <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-ink/35">§ 001</span>
            <span className="h-[1px] w-16 bg-ink/20" />
            <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-accent">3D-Printed Creator Gear</span>
          </motion.div>

          {/* MASSIVE headline — scales from mobile to desktop */}
          <h1 className="font-display font-900 leading-[0.85] tracking-tight">
            {/* Line 1 */}
            <div className="text-[clamp(3rem,11vw,13rem)] text-ink overflow-hidden">
              <RevealWord delay={0.12}>ENGINEERED</RevealWord>
            </div>

            {/* Line 2 — offset right on desktop only */}
            <div className="text-[clamp(3rem,11vw,13rem)] overflow-hidden flex items-baseline gap-3 sm:gap-6 sm:pl-[8vw]">
              <RevealWord delay={0.24} className="text-ink">FOR</RevealWord>
              <RevealWord delay={0.32} className="text-accent">THE</RevealWord>
            </div>

            {/* Line 3 */}
            <div className="text-[clamp(3rem,11vw,13rem)] overflow-hidden">
              <RevealWord delay={0.44} className="text-ink">FIELD.</RevealWord>
            </div>
          </h1>

          {/* Bottom row: sub copy + CTA split */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.72, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="mt-8 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between border-t border-border/50 pt-8"
          >
            <p className="max-w-xs font-sans font-light text-ink/55 text-sm sm:text-base leading-relaxed">
              Precision-built gear for TikTokers, vloggers, and drone pilots.
              High-temp PETG. Zero rattle.
            </p>

            <div className="flex items-center gap-4">
              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                <Link
                  href="/products"
                  className="group inline-flex items-center gap-2 bg-ink text-paper font-display font-700 uppercase tracking-widest text-sm px-6 py-3.5 min-h-[48px] rounded-sm hover:bg-accent transition-colors duration-200"
                >
                  Shop Gear
                  <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </Link>
              </motion.div>
              <Link
                href="/#features"
                className="font-mono text-[11px] tracking-widest uppercase text-ink/50 hover:text-accent transition-colors accent-underline min-h-[48px] flex items-center"
              >
                Why PETG?
              </Link>
            </div>
          </motion.div>
        </motion.div>

        {/* Stats strip — pinned to bottom */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1, duration: 0.6 }}
          className="relative z-10 mt-16 border-t border-border/50"
        >
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 grid grid-cols-3 divide-x divide-border/50">
            {[
              { value: 300, suffix: "°C+", label: "PETG Rated" },
              { value: 15,  suffix: "dm",  label: "Drop Tested" },
              { value: 3,   suffix: "",    label: "Products" },
            ].map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2 + i * 0.1 }}
                className="px-6 py-5 first:pl-0"
              >
                <p className="font-display font-800 text-4xl text-ink tabular-nums">
                  <Counter to={s.value} suffix={s.suffix} />
                </p>
                <p className="font-mono text-[10px] tracking-[0.25em] uppercase text-ink/40 mt-1">
                  {s.label}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      <Ticker />
    </>
  );
}
