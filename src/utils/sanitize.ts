export default function sanitize(string: string): string {
  const chars = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#x27;',
    '/': '&#x2F;',
  } as Record<string, string>;

  return string.replace(/[&<>"'/]/g, (match) => chars[match]);
}
