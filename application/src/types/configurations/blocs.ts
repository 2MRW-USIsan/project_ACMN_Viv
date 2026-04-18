import { LabelAtomProps } from "@/components/atoms/display/LabelAtom";
import { IconButtonAtomProps } from "@/components/atoms/inputs/IconButtonAtom";
import { AddPanelButtonType } from "@/components/molecules/AddPanelButton";
import { ConfigPanelFormType } from "@/components/molecules/ConfigPanelForm";
import { SectionType as OrdersSectionType_t } from "./orders";
import { SectionType } from "./types";

export interface BodyType {
  add: AddPanelButtonType;
  headerLabel: LabelAtomProps["props"];
  panels: BlocPanelItemType[];
  addRowLabel: LabelAtomProps["props"];
  addButton: IconButtonAtomProps["props"];
}
export type BlocPanelItemType = {
  key: string;
  panel: ConfigPanelFormType;
  bloc: SectionType;
};

export interface BlocPanelItemProps {
  props: BlocPanelItemType;
}

export interface BodyProps {
  props: BodyType;
}

export type OrdersSectionType = OrdersSectionType_t;
export type SwitchSectionType = {};
export type SelectSectionType = {};
