import Link from "next/link";
import { getCurrentCart } from "@/lib/cart";
import { isShopifyConfigured } from "@/lib/shopify";

export default async function Header() {
  const cart = isShopifyConfigured() ? await getCurrentCart().catch(() => null) : null;
  const itemCount = cart?.totalQuantity ?? 0;

  return (
    <header className="border-b border-gray-200">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-4">
        <Link href="/" className="text-lg font-semibold tracking-tight text-gray-900">
          FlexiDesk
        </Link>
        <Link
          href="/cart"
          className="relative inline-flex items-center gap-2 rounded-full border border-gray-300 px-4 py-2 text-sm font-medium text-gray-900 hover:border-gray-400"
        >
          Carrito
          {itemCount > 0 && (
            <span className="inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-gray-900 px-1.5 text-xs font-semibold text-white">
              {itemCount}
            </span>
          )}
        </Link>
      </div>
    </header>
  );
}
