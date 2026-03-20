export const SUB_PANEL_TYPES = ["orders", "switch", "select"] as const;
export type SubPanelType = (typeof SUB_PANEL_TYPES)[number];

export const SUB_PANEL_CONTENT_FIELD_KEYS = {
  orders: "ordersText",
  switch: "switchText",
} as const;

export type SubPanelContentFieldKey =
  (typeof SUB_PANEL_CONTENT_FIELD_KEYS)[Exclude<SubPanelType, "select">];

export interface SelectItemPanel {
  id: string;
  panelKey: string;
  panelLabel: string;
  expanded: boolean;
  labelText: string;
  promptText: string;
}

export interface SubPanelItem {
  id: string;
  panelKey: string;
  panelLabel: string;
  expanded: boolean;
  ordersText: string;
  switchText: string;
  selectItems: SelectItemPanel[];
}
