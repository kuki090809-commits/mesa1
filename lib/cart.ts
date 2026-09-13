"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { addCartLines, createCart, getCart, removeCartLines, updateCartLines } from "./shopify";
import type { Cart } from "./types";

const CART_COOKIE = "cartId";

async function getOrCreateCartId(): Promise<string> {
  const cookieStore = await cookies();
  const existing = cookieStore.get(CART_COOKIE)?.value;
  if (existing) {
    const cart = await getCart(existing);
    if (cart) {
      return existing;
    }
  }
  const cart = await createCart();
  return cart.id;
}

async function persistCartId(cartId: string) {
  const cookieStore = await cookies();
  cookieStore.set(CART_COOKIE, cartId, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
  });
}

export async function getCurrentCart(): Promise<Cart | null> {
  const cookieStore = await cookies();
  const cartId = cookieStore.get(CART_COOKIE)?.value;
  if (!cartId) {
    return null;
  }
  return getCart(cartId);
}

export async function addToCartAction(formData: FormData): Promise<void> {
  const merchandiseId = formData.get("merchandiseId");
  const quantityRaw = formData.get("quantity");

  if (typeof merchandiseId !== "string" || !merchandiseId) {
    throw new Error("Falta seleccionar una variante disponible.");
  }
  const quantity = Math.max(1, Number(quantityRaw) || 1);

  const cartId = await getOrCreateCartId();
  await persistCartId(cartId);
  await addCartLines(cartId, [{ merchandiseId, quantity }]);

  revalidatePath("/", "layout");
  redirect("/cart");
}

export async function updateCartLineAction(formData: FormData): Promise<void> {
  const lineId = formData.get("lineId");
  const quantityRaw = formData.get("quantity");

  if (typeof lineId !== "string" || !lineId) {
    throw new Error("Falta el identificador de la línea del carrito.");
  }

  const cookieStore = await cookies();
  const cartId = cookieStore.get(CART_COOKIE)?.value;
  if (!cartId) {
    throw new Error("No hay un carrito activo.");
  }

  const quantity = Number(quantityRaw);
  if (quantity <= 0) {
    await removeCartLines(cartId, [lineId]);
  } else {
    await updateCartLines(cartId, [{ id: lineId, quantity }]);
  }

  revalidatePath("/", "layout");
}

export async function removeCartLineAction(formData: FormData): Promise<void> {
  const lineId = formData.get("lineId");

  if (typeof lineId !== "string" || !lineId) {
    throw new Error("Falta el identificador de la línea del carrito.");
  }

  const cookieStore = await cookies();
  const cartId = cookieStore.get(CART_COOKIE)?.value;
  if (!cartId) {
    throw new Error("No hay un carrito activo.");
  }

  await removeCartLines(cartId, [lineId]);
  revalidatePath("/", "layout");
}
