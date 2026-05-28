"use client";

import Link from "next/link";
import { ShoppingCart, Menu, X } from "lucide-react";
import { useCartStore } from "@/store/cart";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

export function Navbar() {
  const { itemCount, toggleCart } = useCartStore();
  const count = itemCount();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, []);

  const links = [
    { href: "/products",  label: "Shop" },
    { href: "/#features", label: "Why PETG" },
    { href: "/#about",    label: "About" },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-paper/95 backdrop-blur-md border-b border-border/60 shadow-sm"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-[1400px] mx-auto px-6 h-14 flex items-center justify-between">

          {/* Logo */}
          <Link href="/" className="group flex items-baseline gap-1">
            <span className="font-display font-800 text-xl tracking-tight text-ink uppercase">
              Flash<span className="text-accent">Forge</span>
            </span>
            <span className="font-mono text-[9px] tracking-[0.35em] text-ink/35 group-hover:text-accent transition-colors duration-200 ml-0.5">
              3D
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="font-mono text-[10px] tracking-[0.25em] uppercase text-ink/50 hover:text-accent transition-colors accent-underline"
              >
                {l.label}
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <button
              onClick={toggleCart}
              className="relative p-2 hover:bg-secondary rounded-sm transition-colors cursor-pointer"
              aria-label="Cart"
            >
              <ShoppingCart className="w-4 h-4 text-ink" strokeWidth={1.5} />
              <AnimatePresence>
                {count > 0 && (
                  <motion.span
                    key="dot"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full bg-accent text-white text-[9px] font-bold flex items-center justify-center font-mono"
                  >
                    {count > 9 ? "9+" : count}
                  </motion.span>
                )}
              </AnimatePresence>
            </button>

            <button
              className="md:hidden p-2 hover:bg-secondary rounded-sm transition-colors cursor-pointer"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Menu"
            >
              {menuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="fixed top-14 left-0 right-0 z-40 bg-paper border-b border-border/60 md:hidden"
          >
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setMenuOpen(false)}
                className="block px-6 py-4 font-mono text-[10px] tracking-[0.3em] uppercase text-ink/60 hover:text-accent hover:bg-secondary transition-colors border-b border-border/40 last:border-0"
              >
                {l.label}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
