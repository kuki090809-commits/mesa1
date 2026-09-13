import Image from "next/image";
import Link from "next/link";
import Money from "@/components/Money";
import { getCurrentCart, removeCartLineAction, updateCartLineAction } from "@/lib/cart";
import { isShopifyConfigured } from "@/lib/shopify";

export const dynamic = "force-dynamic";

export default async function CartPage() {
  if (!isShopifyConfigured()) {
    return (
      <p className="text-center text-gray-600">
        Configura la conexión con Shopify para usar el carrito. Consulta el README.
      </p>
    );
  }

  const cart = await getCurrentCart();

  if (!cart || cart.lines.length === 0) {
    return (
      <div className="text-center">
        <h1 className="text-2xl font-semibold">Tu carrito está vacío</h1>
        <Link href="/" className="mt-4 inline-block text-sm font-medium text-blue-600 hover:underline">
          Ver catálogo
        </Link>
      </div>
    );
  }

  return (
    <div>
      <h1 className="mb-6 text-2xl font-semibold">Tu carrito</h1>
      <div className="divide-y divide-gray-200 border-y border-gray-200">
        {cart.lines.map((line) => (
          <div key={line.id} className="flex items-center gap-4 py-4">
            <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-md bg-gray-100">
              {line.merchandise.product.featuredImage && (
                <Image
                  src={line.merchandise.product.featuredImage.url}
                  alt={line.merchandise.product.featuredImage.altText ?? line.merchandise.product.title}
                  fill
                  sizes="80px"
                  className="object-cover"
                />
              )}
            </div>

            <div className="flex-1">
              <Link href={`/products/${line.merchandise.product.handle}`} className="font-medium hover:underline">
                {line.merchandise.product.title}
              </Link>
              {line.merchandise.selectedOptions.length > 0 && (
                <p className="text-sm text-gray-500">
                  {line.merchandise.selectedOptions.map((option) => `${option.name}: ${option.value}`).join(" · ")}
                </p>
              )}

              <form action={updateCartLineAction} className="mt-2 flex items-center gap-2">
                <input type="hidden" name="lineId" value={line.id} />
                <label htmlFor={`qty-${line.id}`} className="text-sm text-gray-500">
                  Cantidad
                </label>
                <input
                  id={`qty-${line.id}`}
                  name="quantity"
                  type="number"
                  min={0}
                  defaultValue={line.quantity}
                  className="w-16 rounded-md border border-gray-300 px-2 py-1 text-sm"
                />
                <button type="submit" className="text-sm font-medium text-blue-600 hover:underline">
                  Actualizar
                </button>
              </form>
            </div>

            <div className="text-right">
              <p className="font-medium">
                <Money amount={line.cost.totalAmount.amount} currencyCode={line.cost.totalAmount.currencyCode} />
              </p>
              <form action={removeCartLineAction} className="mt-2">
                <input type="hidden" name="lineId" value={line.id} />
                <button type="submit" className="text-sm text-red-600 hover:underline">
                  Eliminar
                </button>
              </form>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-500">Subtotal</p>
          <p className="text-xl font-semibold">
            <Money amount={cart.cost.subtotalAmount.amount} currencyCode={cart.cost.subtotalAmount.currencyCode} />
          </p>
        </div>
        <a
          href={cart.checkoutUrl}
          className="rounded-md bg-gray-900 px-6 py-3 text-sm font-semibold text-white hover:bg-gray-700"
        >
          Finalizar compra
        </a>
      </div>
    </div>
  );
}
