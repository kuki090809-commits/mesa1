import Image from "next/image";
import Link from "next/link";
import Money from "./Money";
import type { Product } from "@/lib/types";

export default function ProductCard({ product }: { product: Product }) {
  const image = product.featuredImage;
  const price = product.priceRange.minVariantPrice;

  return (
    <Link
      href={`/products/${product.handle}`}
      className="group block overflow-hidden rounded-lg border border-gray-200 transition hover:shadow-md"
    >
      <div className="relative aspect-square w-full bg-gray-100">
        {image ? (
          <Image
            src={image.url}
            alt={image.altText ?? product.title}
            fill
            sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
            className="object-cover transition group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-sm text-gray-400">Sin imagen</div>
        )}
      </div>
      <div className="space-y-1 p-4">
        <h3 className="text-sm font-medium text-gray-900">{product.title}</h3>
        <p className="text-sm text-gray-500">
          <Money amount={price.amount} currencyCode={price.currencyCode} />
        </p>
      </div>
    </Link>
  );
}
