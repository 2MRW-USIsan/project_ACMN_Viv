import { AddPanelButtonType, ConfigPanelFormType, LabelType } from "../ui";
import { PanelType as ItemPanelType } from "./orders.item.types";

export interface PanelType {
  section: SectionType;
  panel: ConfigPanelFormType;
}
export interface SectionType {
  label: LabelType;
  add: AddPanelButtonType;
  panels: { props: ItemPanelType; key: string }[];
}
