export function formatTRY(amount: number): string {
  return new Intl.NumberFormat("tr-TR", {
    style: "currency",
    currency: "TRY",
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat("tr-TR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(date);
}

export function nights(arrival: Date, departure: Date): number {
  const ms = departure.getTime() - arrival.getTime();
  return Math.max(0, Math.round(ms / (1000 * 60 * 60 * 24)));
}
