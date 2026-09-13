export default function Money({ amount, currencyCode }: { amount: string; currencyCode: string }) {
  const formatted = new Intl.NumberFormat("es-ES", {
    style: "currency",
    currency: currencyCode,
  }).format(Number(amount));

  return <span>{formatted}</span>;
}
