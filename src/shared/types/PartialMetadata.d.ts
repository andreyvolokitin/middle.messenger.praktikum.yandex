type PartialMetadata = {
  name: string;
  alias: string;
  params?: Record<string, unknown>;
  children?: hbs.AST.Program;
  iterated?: {
    source: string;
    param: string;
  };
};
