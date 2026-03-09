// TODO: Expand Order fields as requirements are clarified
export type Order = {
  id: string;
  [key: string]: unknown;
};

export type YamlData = {
  orders: Order[];
  // TODO: Add other top-level YAML properties as requirements are clarified
};
