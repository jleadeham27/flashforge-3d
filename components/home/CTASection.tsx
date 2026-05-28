"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

export function CTASection() {
  return (
    <section id="about" className="py-24 px-6 bg-paper">
      <div className="max-w-[1400px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="relative bg-ink rounded-sm overflow-hidden p-12 sm:p-20"
        >
          {/* Graph-paper bg inside the dark block */}
          <div
            className="absolute inset-0 opacity-[0.06]"
            style={{
              backgroundImage:
                "linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)",
              backgroundSize: "24px 24px",
            }}
          />

          {/* Orange accent bar top */}
          <div className="absolute top-0 left-0 right-0 h-[3px] bg-accent" />

          <div className="relative z-10 flex flex-col sm:flex-row sm:items-end justify-between gap-10">
            <div>
              <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-white/30 mb-4">§ 003 — The Mission</p>
              <h2 className="font-display font-800 text-5xl sm:text-7xl uppercase tracking-tight text-white leading-[0.9]">
                Stop Taping<br />
                Your Mic<br />
                <span className="text-accent">Down.</span>
              </h2>
            </div>
            <div className="max-w-xs">
              <p className="font-sans font-light text-white/50 text-base leading-relaxed mb-8">
                Every piece of FlashForge 3D gear is designed around one idea: your setup should
                work as hard as you do.
              </p>
              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                <Link
                  href="/products"
                  className="inline-flex items-center gap-2 bg-accent text-white font-display font-700 uppercase tracking-widest text-sm px-8 py-4 rounded-sm hover:bg-orange-500 transition-colors duration-200 group"
                >
                  Build Your Kit
                  <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </Link>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
