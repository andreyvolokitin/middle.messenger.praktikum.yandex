export default function sortById(
  arr: Record<string, unknown>[],
  order = 'descending'
): Record<string, unknown>[] {
  return arr.sort((a, b) => {
    if (order === 'descending') {
      return (b.id as number) - (a.id as number);
    }

    return (a.id as number) - (b.id as number);
  });
}
