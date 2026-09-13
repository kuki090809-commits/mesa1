import "server-only";
import type { Cart, CartLine, Product, ProductImage, ProductVariant, UserError } from "./types";
import {
  CART_CREATE_MUTATION,
  CART_LINES_ADD_MUTATION,
  CART_LINES_REMOVE_MUTATION,
  CART_LINES_UPDATE_MUTATION,
  GET_CART_QUERY,
  GET_PRODUCTS_QUERY,
  GET_PRODUCT_BY_HANDLE_QUERY,
} from "./shopify-queries";

const domain = process.env.SHOPIFY_STORE_DOMAIN;
const storefrontAccessToken = process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN;
const apiVersion = process.env.SHOPIFY_STOREFRONT_API_VERSION || "2024-10";

const endpoint = domain ? `https://${domain}/api/${apiVersion}/graphql.json` : undefined;

export class ShopifyConfigError extends Error {}

export function isShopifyConfigured(): boolean {
  return Boolean(domain && storefrontAccessToken);
}

type GraphQLResponse<T> = {
  data?: T;
  errors?: { message: string }[];
};

async function shopifyFetch<T>(query: string, variables?: Record<string, unknown>): Promise<T> {
  if (!endpoint || !storefrontAccessToken) {
    throw new ShopifyConfigError(
      "Faltan SHOPIFY_STORE_DOMAIN o SHOPIFY_STOREFRONT_ACCESS_TOKEN. Copia .env.example a .env.local y añade tus credenciales de la Storefront API."
    );
  }

  const res = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Storefront-Access-Token": storefrontAccessToken,
    },
    body: JSON.stringify({ query, variables }),
    cache: "no-store",
  });

  const json = (await res.json()) as GraphQLResponse<T>;

  if (!res.ok || json.errors) {
    const message = json.errors?.map((error) => error.message).join("; ") || res.statusText;
    throw new Error(`Error de la Storefront API de Shopify: ${message}`);
  }

  if (!json.data) {
    throw new Error("La Storefront API de Shopify no devolvió datos.");
  }

  return json.data;
}

function assertNoUserErrors(userErrors: UserError[], action: string) {
  if (userErrors && userErrors.length > 0) {
    throw new Error(`No se pudo ${action}: ${userErrors.map((error) => error.message).join("; ")}`);
  }
}

type RawProduct = Omit<Product, "images" | "variants"> & {
  images: { nodes: ProductImage[] };
  variants: { nodes: ProductVariant[] };
};

function reshapeProduct(product: RawProduct): Product {
  return {
    ...product,
    images: product.images.nodes,
    variants: product.variants.nodes,
  };
}

type RawCart = Omit<Cart, "lines"> & { lines: { nodes: CartLine[] } };

function reshapeCart(cart: RawCart): Cart {
  return {
    ...cart,
    lines: cart.lines.nodes,
  };
}

export async function getProducts(first = 24): Promise<Product[]> {
  const data = await shopifyFetch<{ products: { nodes: RawProduct[] } }>(GET_PRODUCTS_QUERY, { first });
  return data.products.nodes.map(reshapeProduct);
}

export async function getProductByHandle(handle: string): Promise<Product | null> {
  const data = await shopifyFetch<{ product: RawProduct | null }>(GET_PRODUCT_BY_HANDLE_QUERY, { handle });
  return data.product ? reshapeProduct(data.product) : null;
}

export async function getCart(cartId: string): Promise<Cart | null> {
  const data = await shopifyFetch<{ cart: RawCart | null }>(GET_CART_QUERY, { cartId });
  return data.cart ? reshapeCart(data.cart) : null;
}

export async function createCart(
  lines: { merchandiseId: string; quantity: number }[] = []
): Promise<Cart> {
  const data = await shopifyFetch<{
    cartCreate: { cart: RawCart; userErrors: UserError[] };
  }>(CART_CREATE_MUTATION, { lines });
  assertNoUserErrors(data.cartCreate.userErrors, "crear el carrito");
  return reshapeCart(data.cartCreate.cart);
}

export async function addCartLines(
  cartId: string,
  lines: { merchandiseId: string; quantity: number }[]
): Promise<Cart> {
  const data = await shopifyFetch<{
    cartLinesAdd: { cart: RawCart; userErrors: UserError[] };
  }>(CART_LINES_ADD_MUTATION, { cartId, lines });
  assertNoUserErrors(data.cartLinesAdd.userErrors, "añadir el producto al carrito");
  return reshapeCart(data.cartLinesAdd.cart);
}

export async function updateCartLines(
  cartId: string,
  lines: { id: string; quantity: number }[]
): Promise<Cart> {
  const data = await shopifyFetch<{
    cartLinesUpdate: { cart: RawCart; userErrors: UserError[] };
  }>(CART_LINES_UPDATE_MUTATION, { cartId, lines });
  assertNoUserErrors(data.cartLinesUpdate.userErrors, "actualizar el carrito");
  return reshapeCart(data.cartLinesUpdate.cart);
}

export async function removeCartLines(cartId: string, lineIds: string[]): Promise<Cart> {
  const data = await shopifyFetch<{
    cartLinesRemove: { cart: RawCart; userErrors: UserError[] };
  }>(CART_LINES_REMOVE_MUTATION, { cartId, lineIds });
  assertNoUserErrors(data.cartLinesRemove.userErrors, "eliminar el producto del carrito");
  return reshapeCart(data.cartLinesRemove.cart);
}
