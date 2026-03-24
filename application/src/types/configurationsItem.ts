export interface BlocItemData {
  id: string;
  shortLabel: string;
  longLabel: string;
  isExpanded: boolean;
}

export interface BlocItem {
  id: string;
  blocItem: {
    blocItem: BlocItemData;
    handlers: {
      onRemoveItem: (id: string) => void;
      onToggleExpand: (id: string) => void;
      onItemShortLabelChange: (id: string, value: string) => void;
      onItemLongLabelChange: (id: string, value: string) => void;
    };
  };
}
