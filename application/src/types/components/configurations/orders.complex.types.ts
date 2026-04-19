import {
  AddPanelButtonType,
  ConfigPanelFormType,
  LabelType,
  RandomItemFormType,
} from "../ui";

export interface SectionType {
  label: LabelType;
  panels: { props: PanelType; key: string }[];
  add: AddPanelButtonType;
}
export interface PanelType {
  panel: ConfigPanelFormType;
  section: SubSectionType;
}
export interface SubSectionType {
  label: LabelType;
  panels: { props: RandomItemFormType; key: string }[];
  add: AddPanelButtonType;
}
