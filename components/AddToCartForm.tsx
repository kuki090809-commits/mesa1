"use client";

import { useMemo, useState } from "react";
import { useFormStatus } from "react-dom";
import { addToCartAction } from "@/lib/cart";
import type { Product, ProductVariant } from "@/lib/types";

function findVariant(
  variants: ProductVariant[],
  selected: Record<string, string>
): ProductVariant | undefined {
  return variants.find((variant) =>
    variant.selectedOptions.every((option) => selected[option.name] === option.value)
  );
}

function SubmitButton({ variant }: { variant: ProductVariant | undefined }) {
  const { pending } = useFormStatus();
  const disabled = !variant || !variant.availableForSale || pending;

  let label = "Añadir al carrito";
  if (!variant) label = "Selecciona una opción";
  else if (!variant.availableForSale) label = "Agotado";
  else if (pending) label = "Añadiendo…";

  return (
    <button
      type="submit"
      disabled={disabled}
      className="w-full rounded-md bg-gray-900 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-gray-700 disabled:cursor-not-allowed disabled:opacity-50"
    >
      {label}
    </button>
  );
}

export default function AddToCartForm({ product }: { product: Product }) {
  const [selected, setSelected] = useState<Record<string, string>>(() => {
    const initial: Record<string, string> = {};
    for (const option of product.options) {
      initial[option.name] = option.values[0];
    }
    return initial;
  });

  const variant = useMemo(() => findVariant(product.variants, selected), [product.variants, selected]);

  const hasChoices = product.options.length > 1 || (product.options[0]?.values.length ?? 0) > 1;

  return (
    <form action={addToCartAction} className="space-y-4">
      {hasChoices &&
        product.options.map((option) => (
          <div key={option.id}>
            <span className="mb-1 block text-sm font-medium text-gray-700">{option.name}</span>
            <div className="flex flex-wrap gap-2">
              {option.values.map((value) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => setSelected((prev) => ({ ...prev, [option.name]: value }))}
                  className={`rounded-md border px-3 py-1.5 text-sm ${
                    selected[option.name] === value
                      ? "border-gray-900 bg-gray-900 text-white"
                      : "border-gray-300 text-gray-700 hover:border-gray-400"
                  }`}
                >
                  {value}
                </button>
              ))}
            </div>
          </div>
        ))}

      <div className="flex items-center gap-3">
        <label htmlFor="quantity" className="text-sm font-medium text-gray-700">
          Cantidad
        </label>
        <input
          id="quantity"
          name="quantity"
          type="number"
          min={1}
          defaultValue={1}
          className="w-20 rounded-md border border-gray-300 px-2 py-1.5 text-sm"
        />
      </div>

      <input type="hidden" name="merchandiseId" value={variant?.id ?? ""} />

      <SubmitButton variant={variant} />
    </form>
  );
}
