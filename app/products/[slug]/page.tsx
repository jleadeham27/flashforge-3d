import { notFound } from "next/navigation";
import productsData from "@/data/products.json";
import type { Product } from "@/types";
import { ProductDetailClient } from "./ProductDetailClient";

const products = productsData as Product[];

export async function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = products.find((p) => p.slug === slug);
  if (!product) return {};
  return {
    title: `${product.name} — The Creator Supply Co.`,
    description: product.tagline,
  };
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = products.find((p) => p.slug === slug);
  if (!product) notFound();

  const related = products.filter((p) => p.slug !== slug).slice(0, 2);

  return <ProductDetailClient product={product} related={related} />;
}
