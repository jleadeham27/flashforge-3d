"use client";

import { motion } from "framer-motion";
import { Thermometer, Zap, Wind, Package, Layers, Shield } from "lucide-react";

const features = [
  { icon: Thermometer, title: "High-Temp PETG", description: "Rated 85°C continuous. Won't warp on a hot dashboard or studio lights — where PLA fails, PETG doesn't flinch." },
  { icon: Wind,        title: "Anti-Vibration",  description: "Foam-lined cradles and snap-lock geometry absorb drone motor vibration so nothing rattles loose mid-flight." },
  { icon: Shield,      title: "IP44 Sealed",     description: "Shell geometry keeps splashes out. Perfect for run-and-gun shoots, beach content, and anything outdoors." },
  { icon: Layers,      title: "0.2mm Precision",  description: "40% infill grid — optimal strength-to-weight ratio. Lighter than you expect, stronger than you need." },
  { icon: Zap,         title: "Real Fit Testing", description: "Every form factor modeled from real hardware. We mount and test before we ship." },
  { icon: Package,     title: "Ships Assembled",  description: "No loose hardware. Every case arrives assembled, foam-lined, and ready to clip onto your rig." },
];

export function FeaturesSection() {
  return (
    <section id="features" className="py-24 px-6 bg-paper">
      <div className="max-w-[1400px] mx-auto">

        {/* Section header — editorial style */}
        <div className="flex items-end justify-between border-b border-border/60 pb-6 mb-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-ink/35 mb-2">§ 002 — Material</p>
            <h2 className="font-display font-800 text-5xl sm:text-6xl uppercase tracking-tight text-ink leading-none">
              Why PETG<span className="text-accent">.</span>
            </h2>
          </motion.div>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="hidden sm:block max-w-xs font-sans font-light text-sm text-ink/50 text-right leading-relaxed"
          >
            Six reasons creators choose high-temp PETG over every alternative on the market.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-border/40">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ delay: i * 0.06, duration: 0.4 }}
              whileHover={{ backgroundColor: "#EDEAE3" }}
              className="group bg-paper p-8 transition-colors duration-200 relative overflow-hidden"
            >
              {/* Index */}
              <span className="font-mono text-[9px] tracking-widest text-ink/20 absolute top-4 right-4">
                {String(i + 1).padStart(2, "0")}
              </span>

              <motion.div
                whileHover={{ rotate: 8, scale: 1.1 }}
                transition={{ type: "spring", stiffness: 300, damping: 15 }}
                className="w-9 h-9 flex items-center justify-center border border-border/80 rounded-sm mb-5 bg-secondary group-hover:border-accent group-hover:bg-accent/5 transition-colors duration-200"
              >
                <f.icon className="w-4 h-4 text-ink/60 group-hover:text-accent transition-colors" strokeWidth={1.5} />
              </motion.div>

              <h3 className="font-display font-700 text-xl uppercase tracking-wide text-ink mb-2">
                {f.title}
              </h3>
              <p className="font-sans font-light text-sm text-ink/55 leading-relaxed">
                {f.description}
              </p>

              {/* Bottom accent line reveal */}
              <motion.div
                initial={{ scaleX: 0 }}
                whileHover={{ scaleX: 1 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="absolute bottom-0 left-0 right-0 h-[2px] bg-accent origin-left"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
