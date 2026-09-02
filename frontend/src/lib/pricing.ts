/**
 * Single source of truth for a stay's price breakdown. Both the room detail
 * page and the booking summary use this so the tax-inclusive total never
 * disagrees between the two screens.
 */
export interface StayPricing {
  nights: number;
  roomTotal: number;
  taxAmount: number;
  total: number;
  /** 0..100 — the tax's share of the total, for a stacked bar. */
  taxShare: number;
}

export function priceStay(
  nightlyRate: number,
  taxRate: number,
  nightCount = 1,
): StayPricing {
  const nights = Math.max(1, nightCount);
  const roomTotal = nightlyRate * nights;
  const taxAmount = Math.round((roomTotal * taxRate) / 100);
  const total = roomTotal + taxAmount;
  return {
    nights,
    roomTotal,
    taxAmount,
    total,
    taxShare: (taxAmount / total) * 100,
  };
}
