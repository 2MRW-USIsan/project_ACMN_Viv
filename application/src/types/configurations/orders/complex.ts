import { AddPanelButtonType } from "@/components/molecules/AddPanelButton";
import { LabelAtomType } from "../../ui";
import { ConfigPanelFormType } from "@/components/molecules/ConfigPanelForm";
import { RandomPanelListType } from "./random";

export type SectionType = {
  add: AddPanelButtonType;
  panels: ComplexPanelListType;
  label: LabelAtomType;
};
export interface SectionProps {
  props: SectionType;
}

export type ComplexPanelListType = {
  key: string;
  props: PanelType;
}[];

export type PanelType = {
  itemSection: any;
  panel: ConfigPanelFormType;
  section: SubSectionType;
};
export interface PanelProps {
  props: PanelType;
}

export type SubSectionType = {
  label: LabelAtomType;
  panels: RandomPanelListType;
  add: AddPanelButtonType;
};
export interface SubSectionProps {
  props: SubSectionType;
}
