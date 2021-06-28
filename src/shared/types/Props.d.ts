type Props = {
  [key: string]: unknown;
  events?: Record<string, (e?: Event) => unknown>;
  __parent?: Props;
};
