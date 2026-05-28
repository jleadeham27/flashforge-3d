import type { Metadata } from "next";
import { Barlow_Condensed, JetBrains_Mono, Barlow } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { CartDrawer } from "@/components/CartDrawer";
import { PageTransition } from "@/components/PageTransition";

// Industrial condensed display — bold, structural, unexpected
const barlowCondensed = Barlow_Condensed({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "600", "700", "800", "900"],
});

// Regular body weight
const barlow = Barlow({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

// Technical mono — engineering readout aesthetic
const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
});

export const metadata: Metadata = {
  title: "FlashForge 3D — Precision Creator Gear",
  description:
    "High-temp PETG, engineered precision. Gear built for smartphone creators, vloggers, TikTokers, and drone pilots on the move.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${barlowCondensed.variable} ${barlow.variable} ${jetbrainsMono.variable} h-full`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground antialiased">
        <Navbar />
        <CartDrawer />
        <PageTransition>{children}</PageTransition>

        <footer className="border-t border-border/60 py-12 mt-auto bg-paper">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 grid grid-cols-2 sm:grid-cols-4 gap-8 text-xs">
            <div>
              <p className="font-display font-800 text-base tracking-widest uppercase mb-3">
                FLASH<span className="text-accent">FORGE</span> 3D
              </p>
              <p className="text-ink/50 font-sans leading-relaxed">
                Precision-engineered gear for creators on the move.
              </p>
            </div>
            <div>
              <p className="font-mono uppercase tracking-widest text-ink/40 mb-3">Shop</p>
              <ul className="space-y-2 text-ink/60 font-sans">
                <li><a href="/products" className="hover:text-accent transition-colors">All Products</a></li>
                <li><a href="/products/latching-wireless-mic-case" className="hover:text-accent transition-colors">Mic Cases</a></li>
                <li><a href="/products/rugged-action-camera-case" className="hover:text-accent transition-colors">Camera Cases</a></li>
                <li><a href="/products/modular-desktop-charging-dock" className="hover:text-accent transition-colors">Charging Docks</a></li>
              </ul>
            </div>
            <div>
              <p className="font-mono uppercase tracking-widest text-ink/40 mb-3">Material</p>
              <ul className="space-y-2 text-ink/60 font-sans">
                <li>High-Temp PETG</li>
                <li>IP44 Rated</li>
                <li>1.5m Drop Tested</li>
                <li>Ships Assembled</li>
              </ul>
            </div>
            <div>
              <p className="font-mono uppercase tracking-widest text-ink/40 mb-3">Info</p>
              <ul className="space-y-2 text-ink/60 font-sans">
                <li><a href="/#features" className="hover:text-accent transition-colors">Why PETG?</a></li>
                <li><a href="/#about" className="hover:text-accent transition-colors">Our Story</a></li>
              </ul>
            </div>
          </div>
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 mt-10 pt-6 border-t border-border/40 flex items-center justify-between">
            <span className="font-mono text-[10px] tracking-widest uppercase text-ink/30">
              © {new Date().getFullYear()} FlashForge 3D
            </span>
            <span className="font-mono text-[10px] text-ink/30">
              Built for creators. Engineered to move.
            </span>
          </div>
        </footer>
      </body>
    </html>
  );
}
