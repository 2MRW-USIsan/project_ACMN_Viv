import {
  AddPanelButtonType,
  LabelType,
  SwitcherType,
  SwitchItemFormType,
} from "@/types/components/ui";

export interface SectionType {
  add: AddPanelButtonType;
  panels: { props: SwitchItemFormType; key: string }[];
  selector: SelectorType;
}
export interface SelectorType {
  randomize: SwitcherType;
  label: LabelType;
}
