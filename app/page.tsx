import ProductCard from "@/components/ProductCard";
import { getProducts, isShopifyConfigured } from "@/lib/shopify";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  if (!isShopifyConfigured()) {
    return (
      <div className="rounded-lg border border-dashed border-gray-300 p-8 text-center">
        <h1 className="text-xl font-semibold">Conecta tu tienda de Shopify</h1>
        <p className="mt-2 text-sm text-gray-600">
          Configura <code>SHOPIFY_STORE_DOMAIN</code> y <code>SHOPIFY_STOREFRONT_ACCESS_TOKEN</code> en{" "}
          <code>.env.local</code> (mira <code>.env.example</code>) y recarga esta página para ver tu catálogo.
        </p>
      </div>
    );
  }

  const products = await getProducts(24);

  if (products.length === 0) {
    return (
      <p className="text-center text-gray-600">
        No se encontraron productos publicados en el canal de la Storefront API. Revisa que tus productos estén
        publicados en el canal &quot;Headless&quot; (o el que hayas creado) desde el admin de Shopify.
      </p>
    );
  }

  return (
    <div>
      <h1 className="mb-6 text-2xl font-semibold">Catálogo</h1>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
