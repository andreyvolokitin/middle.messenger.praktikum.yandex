type Component = import('./../../modules/block').default;

interface ComponentConstructor {
  new (props: Props, children?: Children): Component;
}
