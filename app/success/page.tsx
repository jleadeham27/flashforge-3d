"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { CheckCircle, ArrowRight, Zap } from "lucide-react";
import { useCartStore } from "@/store/cart";
import { useEffect } from "react";

export default function SuccessPage() {
  const { clearCart } = useCartStore();

  useEffect(() => {
    clearCart();
  }, [clearCart]);

  return (
    <div className="min-h-screen flex items-center justify-center px-6 pt-16">
      <motion.div
        initial={{ opacity: 0, scale: 0.92, y: 24 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="max-w-lg w-full text-center space-y-8"
      >
        {/* Icon */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200, damping: 16 }}
          className="w-24 h-24 rounded-full bg-primary/10 border-2 border-primary glow-neon mx-auto flex items-center justify-center"
        >
          <CheckCircle className="w-12 h-12 text-primary" />
        </motion.div>

        <div className="space-y-3">
          <p className="text-xs font-mono tracking-widest uppercase text-primary">
            Order Confirmed
          </p>
          <h1 className="text-4xl font-bold tracking-tight">
            You&apos;re all set.
          </h1>
          <p className="text-muted-foreground text-base leading-relaxed">
            Your Creator Supply Co. gear is being packed and will be on its way
            shortly. Check your email for shipping confirmation.
          </p>
        </div>

        <div className="p-5 rounded-xl bg-card border border-border space-y-3">
          <div className="flex items-center gap-2 justify-center">
            <Zap className="w-4 h-4 text-primary" fill="currentColor" />
            <span className="text-sm font-mono tracking-wide uppercase text-muted-foreground">
              What&apos;s Next
            </span>
          </div>
          <ul className="text-sm text-muted-foreground space-y-2 text-left">
            <li className="flex items-start gap-2">
              <span className="text-primary mt-0.5">01.</span>
              Check your email for your order receipt from Stripe.
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary mt-0.5">02.</span>
              Your order ships within 2–3 business days.
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary mt-0.5">03.</span>
              Tag us on TikTok when your gear arrives — we love seeing it in the
              wild.
            </li>
          </ul>
        </div>

        <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} className="inline-block w-full">
          <Link
            href="/products"
            className={cn(
              buttonVariants({ size: "lg" }),
              "w-full glow-neon font-mono uppercase tracking-widest text-sm h-12 px-8 cursor-pointer inline-flex items-center justify-center gap-2"
            )}
          >
            Shop More Gear
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
}
