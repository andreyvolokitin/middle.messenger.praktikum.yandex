type Case = 'kebab' | 'snake' | 'camel';

export default function toCase(
  str: string,
  sourceCase: Case = 'kebab',
  targetCase: Case = 'camel'
): string {
  let regexp;
  let replacer;

  if (sourceCase === targetCase) {
    return str;
  }

  switch (sourceCase) {
    case 'kebab':
      regexp = /-([a-zA-Z0-9])/g;

      if (targetCase === 'snake') {
        replacer = (_match: string, g1: string) => `_${g1}`;
      }

      if (targetCase === 'camel') {
        replacer = (_match: string, g1: string) => g1.toUpperCase();
      }

      break;
    case 'snake':
      regexp = /_([a-zA-Z0-9])/g;

      if (targetCase === 'kebab') {
        replacer = (_match: string, g1: string) => `-${g1}`;
      }

      if (targetCase === 'camel') {
        replacer = (_match: string, g1: string) => g1.toUpperCase();
      }

      break;
    case 'camel':
      regexp = /([a-z0-9])([A-Z])/g;

      if (targetCase === 'kebab') {
        replacer = (_match: string, g1: string, g2: string) => `${g1}-${g2.toLowerCase()}`;
      }

      if (targetCase === 'snake') {
        replacer = (_match: string, g1: string, g2: string) => `${g1}_${g2.toLowerCase()}`;
      }

      break;
    default:
      return str;
  }

  return str.replace(regexp, replacer as () => string);
}
