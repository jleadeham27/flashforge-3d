"use client";

import { motion } from "framer-motion";
import { ProductCard } from "@/components/ProductCard";
import productsData from "@/data/products.json";
import type { Product } from "@/types";

const products = productsData as Product[];

export default function ProductsPage() {
  return (
    <div className="pt-20 pb-20 min-h-screen bg-paper">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6">

        {/* Page header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-10 border-b border-border/60 pb-8 pt-4"
        >
          <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-ink/35 mb-2">
            § Full Catalog
          </p>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
            <h1 className="font-display font-800 text-5xl sm:text-6xl uppercase tracking-tight text-ink leading-none">
              All Gear<span className="text-accent">.</span>
            </h1>
            <span className="font-mono text-[10px] tracking-widest uppercase text-ink/35">
              {products.length} Products
            </span>
          </div>
        </motion.div>

        {/* Category filter chips */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.15 }}
          className="flex flex-wrap gap-2 mb-10"
        >
          {["All", ...Array.from(new Set(products.map((p) => p.category)))].map((cat, i) => (
            <button
              key={cat}
              className={`font-mono text-[10px] tracking-[0.25em] uppercase px-4 py-2 min-h-[40px] rounded-sm border transition-colors duration-200 cursor-pointer ${
                i === 0
                  ? "bg-ink text-paper border-ink"
                  : "border-border/60 text-ink/50 hover:border-ink/40 hover:text-ink bg-paper"
              }`}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {/* Products grid — 1 col mobile, 2 col tablet, 3 col desktop */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {products.map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} />
          ))}
        </div>

        {/* Coming soon strip */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-12 py-8 border-t border-border/40 flex items-center justify-center gap-4"
        >
          <span className="h-[1px] w-8 bg-border/60" />
          <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-ink/30">
            More drops coming soon
          </p>
          <span className="h-[1px] w-8 bg-border/60" />
        </motion.div>
      </div>
    </div>
  );
}
