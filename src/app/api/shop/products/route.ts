import { NextResponse } from "next/server";

export const revalidate = 3600;

const SHOP_DOMAIN = "hoopscout-store.myshopify.com";

interface ShopifyVariant {
  price: string;
}

interface ShopifyImage {
  src: string;
}

interface ShopifyProduct {
  id: number;
  title: string;
  handle: string;
  images: ShopifyImage[];
  variants: ShopifyVariant[];
}

export async function GET() {
  try {
    const res = await fetch(
      `https://${SHOP_DOMAIN}/products.json?limit=50`,
      { next: { revalidate: 3600 } }
    );

    if (!res.ok) {
      return NextResponse.json(
        { error: "Failed to fetch from Shopify", products: [] },
        { status: 200 }
      );
    }

    const { products: raw }: { products: ShopifyProduct[] } = await res.json();

    const products = raw.map((p) => ({
      id: p.id,
      name: p.title,
      handle: p.handle,
      thumbnail_url: p.images[0]?.src ?? null,
      price: p.variants[0]?.price ?? "—",
      currency: "USD",
      url: `https://${SHOP_DOMAIN}/products/${p.handle}`,
    }));

    return NextResponse.json({ products });
  } catch {
    return NextResponse.json(
      { error: "Internal server error", products: [] },
      { status: 500 }
    );
  }
}
