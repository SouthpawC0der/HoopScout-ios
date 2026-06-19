"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { ShoppingBag, ExternalLink, AlertCircle } from "lucide-react";

interface Product {
  id: number;
  name: string;
  thumbnail_url: string;
  price: string;
  currency: string;
}

function ProductSkeleton() {
  return (
    <div className="rounded-2xl border border-white/8 bg-surface-elevated overflow-hidden animate-pulse">
      <div className="aspect-square bg-white/5" />
      <div className="p-5 space-y-3">
        <div className="h-4 bg-white/10 rounded w-3/4" />
        <div className="h-4 bg-white/10 rounded w-1/3" />
        <div className="h-9 bg-white/10 rounded-xl" />
      </div>
    </div>
  );
}

function NotConfiguredState() {
  return (
    <div className="col-span-full flex flex-col items-center justify-center py-24 text-center">
      <div
        className="w-20 h-20 rounded-2xl flex items-center justify-center mb-6"
        style={{ backgroundColor: "oklch(0.65 0.22 45 / 12%)" }}
      >
        <ShoppingBag className="w-10 h-10 text-[#F97316]" aria-hidden="true" />
      </div>
      <h3 className="font-heading font-bold text-white text-3xl mb-2">
        Store Coming Soon
      </h3>
      <p className="text-white/40 text-sm max-w-sm">
        Add your{" "}
        <code className="text-[#F97316] bg-[#F97316]/10 px-1 py-0.5 rounded text-xs">
          PRINTFUL_API_KEY
        </code>{" "}
        to your environment variables to display products here.
      </p>
      <p className="text-white/30 text-xs mt-4 max-w-sm">
        Get your API key from Printful → Store → Settings → API
      </p>
    </div>
  );
}

function EmptyState() {
  return (
    <div className="col-span-full flex flex-col items-center justify-center py-24 text-center">
      <div
        className="w-20 h-20 rounded-2xl flex items-center justify-center mb-6"
        style={{ backgroundColor: "oklch(0.65 0.22 45 / 12%)" }}
      >
        <ShoppingBag className="w-10 h-10 text-[#F97316]" aria-hidden="true" />
      </div>
      <h3 className="font-heading font-bold text-white text-3xl mb-2">
        Dropping Soon
      </h3>
      <p className="text-white/40 text-sm max-w-sm">
        New HoopScout merch is on the way. Check back soon.
      </p>
    </div>
  );
}

function ErrorState() {
  return (
    <div className="col-span-full flex flex-col items-center justify-center py-24 text-center">
      <div
        className="w-20 h-20 rounded-2xl flex items-center justify-center mb-6"
        style={{ backgroundColor: "oklch(0.577 0.245 27 / 12%)" }}
      >
        <AlertCircle className="w-10 h-10 text-destructive" aria-hidden="true" />
      </div>
      <h3 className="font-heading font-bold text-white text-3xl mb-2">
        Failed to Load Products
      </h3>
      <p className="text-white/40 text-sm">
        Could not connect to Printful. Check your API key and try again.
      </p>
    </div>
  );
}

export default function ShopPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [notConfigured, setNotConfigured] = useState(false);

  useEffect(() => {
    fetch("/api/shop/products")
      .then((r) => r.json())
      .then((data) => {
        if (data.error === "Printful API key not configured") {
          setNotConfigured(true);
        } else if (data.error) {
          setError(true);
        } else {
          setProducts(data.products ?? []);
        }
      })
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      {/* Hero */}
      <section className="relative pt-36 pb-16 px-6 overflow-hidden">
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[300px] pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse, oklch(0.65 0.22 45 / 12%) 0%, transparent 70%)",
          }}
          aria-hidden="true"
        />
        <div className="relative max-w-6xl mx-auto">
          <Badge
            className="mb-6 px-4 py-1.5 text-sm font-medium border border-[#F97316]/30 text-[#F97316]"
            style={{ backgroundColor: "oklch(0.65 0.22 45 / 12%)" }}
          >
            Official Merch
          </Badge>
          <h1 className="font-heading font-black text-white text-6xl sm:text-8xl leading-none mb-4">
            HOOP<span className="text-gradient-orange">SCOUT</span>
            <br />
            STORE
          </h1>
          <p className="text-white/50 text-lg max-w-xl">
            Rep the brand. Shop official HoopScout gear — tees, hoodies, hats and more,
            all printed on demand via Printful.
          </p>
        </div>
      </section>

      {/* Product grid */}
      <section className="pb-24 px-6">
        <div className="max-w-6xl mx-auto">
          {/* Filter bar placeholder */}
          <div className="flex items-center justify-between mb-8 pb-6 border-b border-white/8">
            <p className="text-white/40 text-sm">
              {!loading && !error && !notConfigured && (
                <>
                  <span className="text-white font-medium">{products.length}</span>{" "}
                  products
                </>
              )}
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {loading ? (
              Array.from({ length: 8 }).map((_, i) => <ProductSkeleton key={i} />)
            ) : error ? (
              <ErrorState />
            ) : notConfigured ? (
              <NotConfiguredState />
            ) : products.length === 0 ? (
              <EmptyState />
            ) : (
              products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))
            )}
          </div>
        </div>
      </section>
    </>
  );
}

function ProductCard({ product }: { product: Product }) {
  const formattedPrice =
    product.price && product.price !== "—"
      ? new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: product.currency ?? "USD",
        }).format(parseFloat(product.price))
      : product.price;

  return (
    <article className="rounded-2xl border border-white/8 bg-surface-elevated overflow-hidden product-card-hover group">
      <div className="aspect-square relative bg-white/5 overflow-hidden">
        {product.thumbnail_url ? (
          <Image
            src={product.thumbnail_url}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <ShoppingBag className="w-12 h-12 text-white/20" aria-hidden="true" />
          </div>
        )}
      </div>
      <div className="p-5">
        <h3 className="font-heading font-bold text-white text-lg leading-tight mb-1 line-clamp-2">
          {product.name}
        </h3>
        <p className="text-[#F59E0B] font-semibold text-base mb-4">{formattedPrice}</p>
        <a
          href={`https://www.printful.com/dashboard/default/sync-products/${product.id}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-xl bg-gradient-brand text-black font-semibold text-sm hover:opacity-90 transition-opacity duration-200 cursor-pointer"
          aria-label={`Buy ${product.name}`}
        >
          Buy Now
          <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
        </a>
      </div>
    </article>
  );
}
