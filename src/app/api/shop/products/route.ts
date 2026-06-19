import { NextResponse } from "next/server";

export const revalidate = 3600;

async function getStoreId(apiKey: string): Promise<string | null> {
  // Use env var if already set
  if (process.env.PRINTFUL_STORE_ID) return process.env.PRINTFUL_STORE_ID;

  // Auto-discover from /stores endpoint
  const res = await fetch("https://api.printful.com/stores", {
    headers: { Authorization: `Bearer ${apiKey}` },
  });
  if (!res.ok) return null;
  const { result } = await res.json();
  return result?.[0]?.id?.toString() ?? null;
}

export async function GET() {
  const apiKey = process.env.PRINTFUL_API_KEY;

  if (!apiKey) {
    return NextResponse.json(
      { error: "Printful API key not configured", products: [] },
      { status: 200 }
    );
  }

  try {
    const storeId = await getStoreId(apiKey);
    if (!storeId) {
      return NextResponse.json(
        { error: "Could not resolve Printful store ID", products: [] },
        { status: 200 }
      );
    }

    const headers: Record<string, string> = {
      Authorization: `Bearer ${apiKey}`,
      "X-PF-Store-Id": storeId,
      "Content-Type": "application/json",
    };

    const listRes = await fetch("https://api.printful.com/store/products", {
      headers,
      next: { revalidate: 3600 },
    });

    if (!listRes.ok) {
      const err = await listRes.text();
      console.error("Printful API error:", err);
      return NextResponse.json(
        { error: "Failed to fetch from Printful", products: [] },
        { status: 200 }
      );
    }

    const { result } = await listRes.json();

    if (!result || result.length === 0) {
      return NextResponse.json({ products: [] });
    }

    // Fetch each product's details for pricing
    const products = await Promise.all(
      result.slice(0, 20).map(
        async (item: { id: number; name: string; thumbnail_url: string }) => {
          try {
            const detailRes = await fetch(
              `https://api.printful.com/store/products/${item.id}`,
              {
                headers: { Authorization: `Bearer ${apiKey}`, "X-PF-Store-Id": storeId },
                next: { revalidate: 3600 },
              }
            );
            if (!detailRes.ok) return null;
            const { result: detail } = await detailRes.json();
            const firstVariant = detail.sync_variants?.[0];
            return {
              id: item.id,
              name: item.name,
              thumbnail_url: item.thumbnail_url,
              price: firstVariant?.retail_price ?? "—",
              currency: firstVariant?.currency ?? "USD",
            };
          } catch {
            return null;
          }
        }
      )
    );

    return NextResponse.json({ products: products.filter(Boolean) });
  } catch (err) {
    console.error("Printful fetch error:", err);
    return NextResponse.json(
      { error: "Internal server error", products: [] },
      { status: 500 }
    );
  }
}
