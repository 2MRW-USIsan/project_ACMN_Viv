import { AddPanelButtonType } from "@/components/molecules/AddPanelButton";
import { LabelAtomType } from "../ui";
import { ConfigPanelFormType } from "@/components/molecules/ConfigPanelForm";

export type SectionType = {
  add: AddPanelButtonType;
  panels: any[];
  label: LabelAtomType;
};
export interface SectionProps {
  props: SectionType;
}

export type PanelType = {
  panel: ConfigPanelFormType;
  section: any;
};
export interface PanelProps {
  props: PanelType;
}

export type SubSectionType = {
  label: LabelAtomType;
  panels: any[];
  add: AddPanelButtonType;
};
export interface SubSectionProps {
  props: SubSectionType;
}