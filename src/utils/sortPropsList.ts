import sortById from './sortById';

export default function sortPropsList(props: Props, listName: string, order = 'ascending'): Props {
  const finalProps = props;
  const list = finalProps[listName] as Record<string, unknown>[];

  if (!list) {
    return props;
  }

  finalProps[listName] = sortById(list, order);

  return finalProps;
}
