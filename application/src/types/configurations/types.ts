import { LabelAtomProps } from "@/components/atoms/display/LabelAtom";
import { IconButtonAtomProps } from "@/components/atoms/inputs/IconButtonAtom";
import { AddPanelButtonType } from "@/components/molecules/AddPanelButton";
import { ConfigPanelFormType } from "@/components/molecules/ConfigPanelForm";
import { ChipCheckboxAtomType, LabelAtomType, SwitchAtomType } from "../ui";
import {
  BlocPanelItemType,
  OrdersSectionType,
  SelectSectionType,
  SwitchSectionType,
} from "./orders/blocs";

export interface BodyType {
  add: AddPanelButtonType;
  headerLabel: LabelAtomProps["props"];
  panels: BlocPanelItemType[];
  addRowLabel: LabelAtomProps["props"];
  addButton: IconButtonAtomProps["props"];
}
export interface BodyProps {
  props: BodyType;
}

export type SectionPanelType = {
  bloc: SectionType;
  panel: ConfigPanelFormType;
};
export interface SectionPanelProps {
  props: SectionPanelType;
}

export type SectionType = {
  ordersSection: OrdersSectionType | undefined;
  switchSection: SwitchSectionType | undefined;
  selectSection: SelectSectionType | undefined;
  sectionSelector: SelectorType;
  panel: ConfigPanelFormType;
};
export interface SectionProps {
  props: SectionType;
}

export type SelectorType = {
  randomize: SwitchAtomType;
  shuffle: SwitchAtomType;
  label: {
    sectionSelect: LabelAtomType;
  };
  sectionSelect: { key: string; props: ChipCheckboxAtomType }[];
};
export interface SelectorProps {
  props: SelectorType;
}
