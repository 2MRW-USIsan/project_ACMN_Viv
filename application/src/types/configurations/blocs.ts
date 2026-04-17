import { LabelAtomProps } from "@/components/atoms/display/LabelAtom";
import { IconButtonAtomProps } from "@/components/atoms/inputs/IconButtonAtom";
import { AddPanelButtonType } from "@/components/molecules/AddPanelButton";
import { ConfigPanelFormType } from "@/components/molecules/ConfigPanelForm";
import { ChipCheckboxAtomType, LabelAtomType } from "../ui";
import { SectionType as OrdersSectionType_t } from "./orders";

export interface BodyType {
  add: AddPanelButtonType;
  headerLabel: LabelAtomProps["props"];
  blocPanels: BlocPanelItemType[];
  addRowLabel: LabelAtomProps["props"];
  addButton: IconButtonAtomProps["props"];
}
export type BlocPanelItemType = {
  key: string;
  panel: ConfigPanelFormType;
  bloc: InformType;
};
export type SectionSelectorType = {
  label: {
    sectionSelect: LabelAtomType;
  };
  sectionSelect: { key: string; props: ChipCheckboxAtomType }[];
};
export type InformType = {
  ordersSection: OrdersSectionType | undefined;
  switchSection: SwitchSectionType | undefined;
  selectSection: SelectSectionType | undefined;
  sectionSelector: SectionSelectorType;
  panel: ConfigPanelFormType;
};

export interface BlocPanelItemProps {
  props: BlocPanelItemType;
}
export interface SectionSelectorProps {
  props: SectionSelectorType;
}

export interface BodyProps {
  props: BodyType;
}
export interface InformProps {
  props: InformType;
}

export type OrdersSectionType = OrdersSectionType_t;
export type SwitchSectionType = {};
export type SelectSectionType = {};
