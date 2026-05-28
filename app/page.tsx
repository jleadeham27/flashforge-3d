import { HeroSection } from "@/components/home/HeroSection";
import { FeaturesSection } from "@/components/home/FeaturesSection";
import { FeaturedProducts } from "@/components/home/FeaturedProducts";
import { CTASection } from "@/components/home/CTASection";
import productsData from "@/data/products.json";
import type { Product } from "@/types";

export default function HomePage() {
  const products = productsData as Product[];

  return (
    <>
      <HeroSection />
      <FeaturedProducts products={products} />
      <FeaturesSection />
      <CTASection />
    </>
  );
}
