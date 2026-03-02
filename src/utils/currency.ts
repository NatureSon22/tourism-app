export default function formatCurrency(
  amount: number,
  currency: string = "PHP",
) {
  return new Intl.NumberFormat("en-PH", {
    style: "currency",
    currency,
    minimumFractionDigits: 2,
  }).format(amount);
}
