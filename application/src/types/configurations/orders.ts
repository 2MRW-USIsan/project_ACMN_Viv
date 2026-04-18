import { AddPanelButtonType } from "@/components/molecules/AddPanelButton";
import { ConfigPanelFormType } from "@/components/molecules/ConfigPanelForm";
import { LabelAtomType } from "../ui";
import { SectionType as ColorsSectionType } from "./colors";
import { SectionType as ComplexSectionType } from "./complex";
import { SectionType as RandomSectionType } from "./random";
import { SectionType as ScriptsSectionType } from "./scripts";
import { SelectorType } from "./types";

export type SectionType = {
  message: LabelAtomType;
  add: AddPanelButtonType;
  panels: GroupListType;
  label: LabelAtomType;
};
export type GroupListType = {
  key: string;
  props: GroupPanelType;
}[];
export type GroupPanelType = {
  panel: ConfigPanelFormType;
  itemSection: ItemSectionType;
};
export type ItemListType = {
  key: string;
  props: ItemPanelType;
}[];
export type ItemPanelType = {
  itemSection: ItemSectionType;
  panel: ConfigPanelFormType;
};
export type ItemSectionType = {
  randomSection: RandomSectionType | undefined;
  complexSection: ComplexSectionType | undefined;
  colorsSection: ColorsSectionType | undefined;
  scriptsSection: ScriptsSectionType | undefined;
  sectionSelector: SelectorType;
  add: AddPanelButtonType;
  panels: ItemListType;
  label: LabelAtomType;
};

export interface SectionProps {
  props: SectionType;
}
export interface GroupPanelProps {
  props: GroupPanelType;
}
export interface ItemSectionProps {
  props: ItemSectionType;
}
export interface ItemPanelProps {
  props: ItemPanelType;
}
