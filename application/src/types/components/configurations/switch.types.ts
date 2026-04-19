import { AddPanelButtonType, LabelType } from "../ui";
import { PanelType } from "./switch.group.types";

export interface SectionType {
  label: LabelType;
  add: AddPanelButtonType;
  panels: { props: PanelType; key: string }[];
}
