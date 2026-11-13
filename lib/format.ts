export function formatUSD(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatINR(amountInUSD: number, rate: number = 88): string {
  const inr = Math.round(amountInUSD * rate);
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(inr);
}

export function formatPriceRange(
  min: number,
  max: number,
  rate: number = 88
): { usd: string; inr: string; usdCompact: string; inrCompact: string } {
  if (min === max) {
    return {
      usd: formatUSD(min),
      inr: formatINR(min, rate),
      usdCompact: formatUSD(min),
      inrCompact: formatINR(min, rate),
    };
  }

  const usd = `${formatUSD(min)} – ${formatUSD(max)}`;
  const inr = `${formatINR(min, rate)} – ${formatINR(max, rate)}`;
  const usdCompact = `$${min.toLocaleString()}–$${max.toLocaleString()}`;
  const inrCompact = `₹${Math.round((min * rate) / 1000)}k–₹${Math.round((max * rate) / 1000)}k`;

  return { usd, inr, usdCompact, inrCompact };
}
