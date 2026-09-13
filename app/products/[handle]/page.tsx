import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import AddToCartForm from "@/components/AddToCartForm";
import Money from "@/components/Money";
import { getProductByHandle, isShopifyConfigured } from "@/lib/shopify";

export const dynamic = "force-dynamic";

export default async function ProductPage({ params }: { params: Promise<{ handle: string }> }) {
  const { handle } = await params;

  if (!isShopifyConfigured()) {
    return (
      <div className="rounded-lg border border-dashed border-gray-300 p-8 text-center">
        <h1 className="text-xl font-semibold">Conecta tu tienda de Shopify</h1>
        <p className="mt-2 text-sm text-gray-600">
          Configura <code>SHOPIFY_STORE_DOMAIN</code> y <code>SHOPIFY_STOREFRONT_ACCESS_TOKEN</code> en{" "}
          <code>.env.local</code> (mira <code>.env.example</code>) para ver este producto.
        </p>
        <Link href="/" className="mt-4 inline-block text-sm font-medium text-blue-600 hover:underline">
          Volver al catálogo
        </Link>
      </div>
    );
  }

  const product = await getProductByHandle(handle);

  if (!product) {
    notFound();
  }

  const price = product.priceRange.minVariantPrice;
  const images = product.images.length > 0 ? product.images : product.featuredImage ? [product.featuredImage] : [];

  return (
    <div className="grid gap-10 md:grid-cols-2">
      <div className="space-y-4">
        {images.length > 0 ? (
          images.map((image, index) => (
            <div key={image.url} className="relative aspect-square w-full overflow-hidden rounded-lg bg-gray-100">
              <Image
                src={image.url}
                alt={image.altText ?? product.title}
                fill
                sizes="(min-width: 768px) 50vw, 100vw"
                className="object-cover"
                priority={index === 0}
              />
            </div>
          ))
        ) : (
          <div className="flex aspect-square items-center justify-center rounded-lg bg-gray-100 text-sm text-gray-400">
            Sin imagen
          </div>
        )}
      </div>

      <div>
        <h1 className="text-2xl font-semibold text-gray-900">{product.title}</h1>
        <p className="mt-2 text-lg text-gray-700">
          <Money amount={price.amount} currencyCode={price.currencyCode} />
        </p>

        {product.description && (
          <p className="mt-4 text-sm leading-relaxed text-gray-600">{product.description}</p>
        )}

        <div className="mt-6">
          <AddToCartForm product={product} />
        </div>
      </div>
    </div>
  );
}
