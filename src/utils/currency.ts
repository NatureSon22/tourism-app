export default function formatCurrency(
  amount: number,
  currency: string = "PHP",
) {
  return new Intl.NumberFormat("en-PH", {
    style: "currency",
    currency,
    minimumFractionDigits: 0, 
    maximumFractionDigits: 2, 
  }).format(amount);
}