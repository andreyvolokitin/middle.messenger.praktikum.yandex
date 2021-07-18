export default function trim(string: string, search?: string): string {
  let regexp = /^\s+|\s+$/g;

  if (search) {
    regexp = new RegExp(`^[${search}]+|[${search}]+$`, 'g');
  }

  return string.replace(regexp, '');
}
