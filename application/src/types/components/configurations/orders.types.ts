import { AddPanelButtonType, LabelType } from "../ui";
import { PanelType } from "./orders.group.types";

export interface SectionType {
  add: AddPanelButtonType;
  panels: { props: PanelType; key: string }[];
  label: LabelType;
}
