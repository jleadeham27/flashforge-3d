"use client";

import { useCartStore } from "@/store/cart";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { Minus, Plus, Trash2, ShoppingBag, ArrowUpRight } from "lucide-react";
import { ProductPlaceholder } from "@/components/ProductPlaceholder";
import { motion, AnimatePresence } from "framer-motion";

function formatPrice(cents: number) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(cents / 100);
}

export function CartDrawer() {
  const { isOpen, closeCart, items, removeItem, updateQuantity, total } = useCartStore();

  const handleCheckout = async () => {
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items }),
      });
      const { url } = await res.json();
      if (url) window.location.href = url;
    } catch (err) {
      console.error("Checkout error:", err);
    }
  };

  return (
    <Sheet open={isOpen} onOpenChange={closeCart}>
      {/* Full-width on mobile, 420px on desktop */}
      <SheetContent
        side="right"
        className="w-full sm:max-w-[420px] bg-paper border-l border-border/60 p-0 flex flex-col"
      >
        {/* Header */}
        <SheetHeader className="px-5 py-4 border-b border-border/60">
          <SheetTitle className="font-display font-700 text-lg uppercase tracking-widest text-ink flex items-center justify-between">
            Your Cart
            {items.length > 0 && (
              <span className="font-mono text-[10px] tracking-widest bg-accent text-white px-2 py-0.5 rounded-sm">
                {items.reduce((s, i) => s + i.quantity, 0)} items
              </span>
            )}
          </SheetTitle>
        </SheetHeader>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-5 py-4 space-y-3">
          <AnimatePresence initial={false}>
            {items.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex flex-col items-center justify-center h-64 gap-4"
              >
                <div className="w-16 h-16 border border-border/60 rounded-sm flex items-center justify-center">
                  <ShoppingBag className="w-6 h-6 text-ink/25" strokeWidth={1.5} />
                </div>
                <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-ink/30">
                  Cart is empty
                </p>
              </motion.div>
            ) : (
              items.map(({ product, quantity }) => (
                <motion.div
                  key={product.id}
                  layout
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.22 }}
                  className="flex gap-3 p-3 bg-secondary border border-border/60 rounded-sm"
                >
                  {/* Thumbnail */}
                  <div className="w-16 h-16 flex-shrink-0 rounded-sm overflow-hidden border border-border/40">
                    <ProductPlaceholder category={product.category} size="sm" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <p className="font-display font-700 text-sm uppercase tracking-wide text-ink leading-tight truncate">
                      {product.name}
                    </p>
                    <p className="font-mono text-[10px] text-ink/40 mt-0.5">
                      {formatPrice(product.price)} each
                    </p>

                    {/* Qty controls — large touch targets */}
                    <div className="flex items-center gap-2 mt-2">
                      <button
                        onClick={() => updateQuantity(product.id, quantity - 1)}
                        className="w-8 h-8 border border-border/60 rounded-sm flex items-center justify-center cursor-pointer hover:border-accent hover:text-accent transition-colors"
                        aria-label="Decrease"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="font-mono text-sm w-6 text-center text-ink">{quantity}</span>
                      <button
                        onClick={() => updateQuantity(product.id, quantity + 1)}
                        className="w-8 h-8 border border-border/60 rounded-sm flex items-center justify-center cursor-pointer hover:border-accent hover:text-accent transition-colors"
                        aria-label="Increase"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                      <span className="ml-auto font-display font-700 text-base text-ink">
                        {formatPrice(product.price * quantity)}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => removeItem(product.id)}
                    className="self-start p-1.5 text-ink/25 hover:text-red-500 cursor-pointer transition-colors"
                    aria-label="Remove"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </motion.div>
              ))
            )}
          </AnimatePresence>
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="px-5 py-5 border-t border-border/60 space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm font-sans text-ink/55">
                <span>Subtotal</span>
                <span className="font-mono">{formatPrice(total())}</span>
              </div>
              <div className="flex justify-between text-sm font-sans text-ink/55">
                <span>Shipping</span>
                <span className="font-mono text-accent">At checkout</span>
              </div>
              <Separator className="bg-border/40 my-1" />
              <div className="flex justify-between font-display font-700 text-lg text-ink uppercase">
                <span>Total</span>
                <span>{formatPrice(total())}</span>
              </div>
            </div>

            <motion.button
              whileTap={{ scale: 0.97 }}
              onClick={handleCheckout}
              className="w-full min-h-[52px] bg-ink text-paper font-display font-700 uppercase tracking-widest text-sm rounded-sm hover:bg-accent transition-colors duration-200 cursor-pointer flex items-center justify-center gap-2 group"
            >
              Checkout
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </motion.button>

            <p className="text-[10px] font-mono text-center tracking-widest uppercase text-ink/25">
              Secure · Powered by Stripe
            </p>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
