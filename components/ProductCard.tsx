"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useCartStore } from "@/store/cart";
import { ProductPlaceholder } from "@/components/ProductPlaceholder";
import type { Product } from "@/types";

function formatPrice(cents: number) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(cents / 100);
}

export function ProductCard({ product, index = 0 }: { product: Product; index?: number }) {
  const { addItem } = useCartStore();

  return (
    <motion.article
      initial={{ opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.55, delay: index * 0.09, ease: [0.22, 1, 0.36, 1] }}
      className="group card-lift cursor-pointer"
    >
      {/* Image */}
      <Link href={`/products/${product.slug}`} aria-label={product.name}>
        <div className="relative aspect-[4/3] bg-secondary border border-border/60 rounded-sm overflow-hidden mb-0">
          <motion.div
            className="w-full h-full"
            whileHover={{ scale: 1.04 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <ProductPlaceholder category={product.category} />
          </motion.div>

          {/* Index number overlay */}
          <span className="absolute top-3 left-3 font-mono text-[10px] tracking-widest text-ink/30">
            {String(index + 1).padStart(2, "0")}
          </span>

          {/* Arrow reveal on hover */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileHover={{ opacity: 1, scale: 1 }}
            className="absolute bottom-3 right-3 w-8 h-8 rounded-full bg-ink flex items-center justify-center"
          >
            <ArrowUpRight className="w-4 h-4 text-paper" />
          </motion.div>

          {product.badge && (
            <span className="absolute top-3 right-3 font-mono text-[9px] tracking-[0.2em] uppercase bg-accent text-white px-2 py-0.5 rounded-sm">
              {product.badge}
            </span>
          )}
        </div>
      </Link>

      {/* Info row */}
      <div className="border border-t-0 border-border/60 rounded-b-sm px-4 py-4 bg-card flex items-start justify-between gap-3">
        <div className="min-w-0">
          <Link href={`/products/${product.slug}`}>
            <h3 className="font-display font-700 text-base uppercase tracking-wide text-ink leading-tight group-hover:text-accent transition-colors duration-200 truncate">
              {product.name}
            </h3>
          </Link>
          <p className="font-mono text-[10px] tracking-widest uppercase text-ink/40 mt-0.5">
            {product.category}
          </p>
        </div>

        <div className="flex-shrink-0 flex flex-col items-end gap-2">
          <span className="font-display font-700 text-lg text-ink">
            {formatPrice(product.price)}
          </span>
          <motion.button
            whileTap={{ scale: 0.93 }}
            onClick={() => addItem(product)}
            className="font-mono text-[10px] tracking-widest uppercase bg-ink text-paper px-3 py-1.5 rounded-sm hover:bg-accent transition-colors duration-200 cursor-pointer"
            aria-label={`Add ${product.name} to cart`}
          >
            + Cart
          </motion.button>
        </div>
      </div>
    </motion.article>
  );
}
