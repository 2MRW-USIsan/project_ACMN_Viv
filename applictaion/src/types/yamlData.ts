// YAML data types matching the structure produced by generateYaml.ts

export type YamlOrdersComplexOption = {
  value: string;
  prompt: string;
  weight: string;
};

export type YamlOrdersOption = {
  value: string;
  prompt: string;
  weight: string;
  complexOptions?: YamlOrdersComplexOption[];
};

export type YamlOrdersField = {
  key: string;
  label: string;
  type: string;
  options?: YamlOrdersOption[];
};

export type YamlOrdersItem = {
  key: string;
  label: string;
  fields: YamlOrdersField[];
};

export type YamlBloc = {
  key: string;
  label: string;
  orders?: YamlOrdersItem[];
};

export type YamlData = {
  blocs: YamlBloc[];
};
