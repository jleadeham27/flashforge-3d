export interface Product {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  price: number; // in cents
  category: string;
  badge?: string;
  description: string;
  material: string;
  weight: string;
  dimensions: string;
  images: string[];
  features: string[];
  whatsInTheBox: string[];
  stripeProductId: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}
