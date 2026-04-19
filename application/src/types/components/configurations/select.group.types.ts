import {
  AddPanelButtonType,
  ConfigPanelFormType,
  LabelType,
  SwitcherType,
} from "@/types/components/ui";
import { PanelType as ListPanelType } from "./select.list.types";

export interface SectionType {
  add: AddPanelButtonType;
  panels: { props: ListPanelType; key: string }[];
  selector: SelectorType;
}
export interface SelectorType {
  shuffle: SwitcherType;
  label: LabelType;
}
export interface PanelType {
  section: SectionType;
  panel: ConfigPanelFormType;
}
