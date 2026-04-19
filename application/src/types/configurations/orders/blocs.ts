import { LabelProps } from "@/components/atoms/display/Label";
import { IconButtonAtomProps } from "@/components/atoms/inputs/IconButtonAtom";
import { AddPanelButtonType } from "@/components/molecules/AddPanelButton";
import { ConfigPanelFormType } from "@/components/molecules/ConfigPanelForm";
import { SectionType as SelectSectionType_t } from "../select";
import { SectionType as SwitchSectionType_t } from "../switch";
import { SectionType as OrdersSectionType_t } from "./types";
import { SectionType } from "../types";

export interface BodyType {
  add: AddPanelButtonType;
  headerLabel: LabelProps["props"];
  panels: BlocPanelItemType[];
  addRowLabel: LabelProps["props"];
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
export type SwitchSectionType = SwitchSectionType_t;
export type SelectSectionType = SelectSectionType_t;
