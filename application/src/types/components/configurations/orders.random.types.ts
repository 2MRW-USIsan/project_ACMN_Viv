import { AddPanelButtonType, LabelType, RandomItemFormType } from "../ui";

export interface SectionType {
  label: LabelType;
  panels: { props: RandomItemFormType; key: string }[];
  add: AddPanelButtonType;
}
