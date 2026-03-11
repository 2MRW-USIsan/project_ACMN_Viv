export type OrderItemType = 'Random' | 'Complex' | 'Scripts' | 'Color';

export type OrderItem = {
  readonly label: string;
  readonly weight?: number;
  readonly subitems?: readonly OrderItem[];
};

export type Order = {
  readonly property: string;
  readonly type: OrderItemType;
  readonly items: readonly OrderItem[];
};

export type YamlData = {
  readonly title: string;
  readonly Orders: readonly Order[];
};
