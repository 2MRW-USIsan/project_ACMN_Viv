export interface SwitchItem {
  id: string;
  label: string;
  value: string;
  alt: string;
}

export interface SwitchGrp {
  id: string;
  key: string;
  label: string;
  isExpanded: boolean;
  isRandomize: boolean;
  items: SwitchItem[];
}
