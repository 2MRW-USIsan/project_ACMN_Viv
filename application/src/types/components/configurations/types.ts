import { SectionType as OrdersSectionType } from "./orders.types";
import { SectionType as SelectSectionType } from "./select.types";
import { SectionType as SwitchSectionType } from "./switch.types";
import {
  AddPanelButtonType,
  ChipCheckType,
  ConfigPanelFormType,
  LabelType,
} from "../ui";

// ==========
// Organisms
// ==========
export interface BodyType {
  add: AddPanelButtonType;
  label: LabelType;
  panels: PanelType[];
}
export interface PanelType {
  key: string;
  panel: ConfigPanelFormType;
  section: SectionType;
}
export interface SectionType {
  selector: SelectorType;
  ordersSection: OrdersSectionType | undefined;
  switchSection: SwitchSectionType | undefined;
  selectSection: SelectSectionType | undefined;
}
export interface SelectorType {
  label: LabelType;
  sections: { props: ChipCheckType; key: string }[];
}
