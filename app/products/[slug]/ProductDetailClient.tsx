"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Separator } from "@/components/ui/separator";
import { ProductCard } from "@/components/ProductCard";
import { useCartStore } from "@/store/cart";
import type { Product } from "@/types";
import { Check, Package, Ruler, Weight, Layers, ChevronRight, ArrowUpRight } from "lucide-react";
import { ProductPlaceholder } from "@/components/ProductPlaceholder";

function formatPrice(cents: number) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(cents / 100);
}

export function ProductDetailClient({ product, related }: { product: Product; related: Product[] }) {
  const { addItem } = useCartStore();
  const [added, setAdded] = useState(false);
  const [activeImage, setActiveImage] = useState(0);

  const handleAdd = () => {
    addItem(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 2200);
  };

  const panels = ["Front", "Side", "Detail"];

  return (
    <div className="pt-16 pb-20 min-h-screen bg-paper">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6">

        {/* Breadcrumb */}
        <motion.nav
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="flex items-center gap-2 py-5 text-[10px] font-mono tracking-widest uppercase text-ink/35 overflow-x-auto whitespace-nowrap"
          aria-label="Breadcrumb"
        >
          <Link href="/" className="hover:text-accent transition-colors">Home</Link>
          <ChevronRight className="w-3 h-3 flex-shrink-0" />
          <Link href="/products" className="hover:text-accent transition-colors">Shop</Link>
          <ChevronRight className="w-3 h-3 flex-shrink-0" />
          <span className="text-ink/60 truncate">{product.name}</span>
        </motion.nav>

        {/* Main layout — stacked on mobile, side-by-side on lg */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">

          {/* ── Image gallery ── */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="space-y-3"
          >
            {/* Main image */}
            <div className="relative aspect-square bg-secondary border border-border/60 rounded-sm overflow-hidden">
              <motion.div
                key={activeImage}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                className="w-full h-full"
              >
                <ProductPlaceholder category={product.category} />
              </motion.div>

              {product.badge && (
                <span className="absolute top-4 left-4 font-mono text-[9px] tracking-[0.2em] uppercase bg-accent text-white px-2 py-1 rounded-sm">
                  {product.badge}
                </span>
              )}
              <span className="absolute bottom-4 left-1/2 -translate-x-1/2 font-mono text-[9px] tracking-widest uppercase text-ink/30 bg-paper/70 backdrop-blur-sm px-3 py-1 rounded-full border border-border/40">
                {panels[activeImage]} view · Replace with real photo
              </span>
            </div>

            {/* Thumbnails */}
            <div className="grid grid-cols-3 gap-2">
              {panels.map((label, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImage(i)}
                  className={`aspect-square rounded-sm border transition-all duration-200 cursor-pointer overflow-hidden min-h-[72px] ${
                    activeImage === i ? "border-accent" : "border-border/60 hover:border-ink/30"
                  }`}
                  aria-label={`View ${label}`}
                >
                  <ProductPlaceholder category={product.category} size="sm" />
                </button>
              ))}
            </div>
          </motion.div>

          {/* ── Product info ── */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="space-y-6"
          >
            <div>
              <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-ink/35 mb-2">
                {product.category}
              </p>
              <h1 className="font-display font-800 text-3xl sm:text-4xl uppercase tracking-tight text-ink leading-tight">
                {product.name}
              </h1>
              <p className="font-sans font-light text-ink/55 mt-2 text-base leading-relaxed">
                {product.tagline}
              </p>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-3">
              <span className="font-display font-800 text-4xl text-ink">
                {formatPrice(product.price)}
              </span>
              <span className="font-mono text-[10px] tracking-widest uppercase text-ink/35">
                Free ship $75+
              </span>
            </div>

            {/* Add to cart — large touch target */}
            <motion.button
              whileTap={{ scale: 0.97 }}
              onClick={handleAdd}
              className={`w-full min-h-[56px] font-display font-700 uppercase tracking-widest text-base rounded-sm transition-colors duration-300 cursor-pointer flex items-center justify-center gap-3 ${
                added
                  ? "bg-green-600 text-white"
                  : "bg-ink text-paper hover:bg-accent"
              }`}
            >
              <motion.span
                key={added ? "added" : "add"}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-2"
              >
                {added ? (
                  <><Check className="w-5 h-5" /> Added to Cart</>
                ) : (
                  <><ArrowUpRight className="w-5 h-5" /> Add to Cart</>
                )}
              </motion.span>
            </motion.button>

            <Separator className="bg-border/40" />

            {/* Description */}
            <p className="font-sans font-light text-sm text-ink/60 leading-relaxed">
              {product.description}
            </p>

            {/* Specs grid */}
            <div className="grid grid-cols-3 gap-2">
              {[
                { icon: Layers, label: "Material", value: product.material },
                { icon: Weight, label: "Weight",   value: product.weight },
                { icon: Ruler,  label: "Size",     value: product.dimensions },
              ].map((s) => (
                <div key={s.label} className="p-3 bg-secondary border border-border/60 rounded-sm text-center">
                  <s.icon className="w-4 h-4 text-ink/40 mx-auto mb-1.5" strokeWidth={1.5} />
                  <p className="font-mono text-[8px] uppercase tracking-widest text-ink/35 mb-0.5">{s.label}</p>
                  <p className="font-mono text-[10px] font-bold text-ink leading-tight">{s.value}</p>
                </div>
              ))}
            </div>

            {/* Features */}
            <div>
              <p className="font-mono text-[10px] tracking-[0.25em] uppercase text-ink/35 mb-3">Features</p>
              <ul className="space-y-2.5">
                {product.features.map((f) => (
                  <li key={f} className="flex items-start gap-3 text-sm">
                    <span className="w-4 h-4 rounded-sm bg-accent/10 border border-accent/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="w-2.5 h-2.5 text-accent" />
                    </span>
                    <span className="font-sans font-light text-ink/65">{f}</span>
                  </li>
                ))}
              </ul>
            </div>

            <Separator className="bg-border/40" />

            {/* What's in the box */}
            <div>
              <p className="font-mono text-[10px] tracking-[0.25em] uppercase text-ink/35 mb-3 flex items-center gap-2">
                <Package className="w-3.5 h-3.5" strokeWidth={1.5} />
                In the Box
              </p>
              <ul className="space-y-2">
                {product.whatsInTheBox.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm font-sans font-light text-ink/55">
                    <span className="w-1 h-1 rounded-full bg-accent mt-2 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>

        {/* Related products */}
        {related.length > 0 && (
          <div className="mt-20 pt-10 border-t border-border/50">
            <div className="flex items-end justify-between mb-8">
              <div>
                <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-ink/35 mb-1">You might need</p>
                <h2 className="font-display font-800 text-3xl uppercase tracking-tight text-ink">
                  Related Gear
                </h2>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {related.map((p, i) => (
                <ProductCard key={p.id} product={p} index={i} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
