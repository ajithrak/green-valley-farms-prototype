/** Formats a number using the Indian digit-grouping system (e.g. ₹14,52,000). */
export function formatInr(amount: number): string {
  if (isNaN(amount)) return '₹0';
  const isNegative = amount < 0;
  const absAmount = Math.abs(Math.round(amount));
  const s = absAmount.toString();
  if (s.length <= 3) return (isNegative ? '-₹' : '₹') + s;
  const last3 = s.substring(s.length - 3);
  const remaining = s.substring(0, s.length - 3);
  const parts: string[] = [];
  let i = remaining.length;
  while (i > 0) {
    const start = Math.max(0, i - 2);
    parts.unshift(remaining.substring(start, i));
    i -= 2;
  }
  return (isNegative ? '-₹' : '₹') + parts.join(',') + ',' + last3;
}
