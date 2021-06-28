export default function kebabToCamel(str: string): string {
  return str.replace(/-(\w)/g, (_match, g1) => g1.toUpperCase());
}
