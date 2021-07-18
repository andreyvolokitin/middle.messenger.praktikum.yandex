export default function isArray(val: unknown): val is [] {
  return Array.isArray(val);
}
