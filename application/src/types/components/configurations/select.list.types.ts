import {
  AddPanelButtonType,
  ConfigPanelFormType,
  ListItemFormType,
} from "@/types/components/ui";

export interface SectionType {
  add: AddPanelButtonType;
  panels: { props: ListItemFormType; key: string }[];
}
export interface SelectorType {}
export interface PanelType {
  section: SectionType;
  panel: ConfigPanelFormType;
}
