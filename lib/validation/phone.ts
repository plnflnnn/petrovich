export function normalizePhoneDigits(value: string): string {
  const d = value.replace(/\D/g, "");
  if (d.length === 11 && d.startsWith("8")) return `7${d.slice(1)}`;
  if (d.length === 10) return `7${d}`;
  return d;
}

export function isValidRuPhone(value: string): boolean {
  const d = normalizePhoneDigits(value);
  return d.length === 11 && d.startsWith("7");
}

export function normalizePhoneForStorage(phone: string): string {
  const d = normalizePhoneDigits(phone);
  return d.length === 11 ? `+${d}` : phone.trim();
}
