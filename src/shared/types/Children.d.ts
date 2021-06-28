type Children = {
  ast: hbs.AST.Program;
  dependencies: Record<string, import('./../../modules/block').default>;
};
