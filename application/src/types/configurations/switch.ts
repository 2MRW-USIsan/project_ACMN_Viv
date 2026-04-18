import { LabelAtomProps } from "@/components/atoms/display/LabelAtom";
import { IconButtonAtomProps } from "@/components/atoms/inputs/IconButtonAtom";
import { SwitchAtomProps } from "@/components/atoms/inputs/SwitchAtom";
import { TextFieldAtomProps } from "@/components/atoms/inputs/TextFieldAtom";
import { AddPanelButtonType } from "@/components/molecules/AddPanelButton";

export type SwitchItemPanelType = {
  key: string;
  labelLabel: LabelAtomProps["props"];
  labelField: TextFieldAtomProps["props"];
  valueLabel: LabelAtomProps["props"];
  valueField: TextFieldAtomProps["props"];
  altLabel: LabelAtomProps["props"];
  altField: TextFieldAtomProps["props"];
  removeButton: IconButtonAtomProps["props"];
};

export type SwitchItemSectionType = {
  randomizeLabel: LabelAtomProps["props"];
  randomizeSwitch: SwitchAtomProps["props"];
  switchItemPanels: SwitchItemPanelType[];
  addSwitchRowLabel: LabelAtomProps["props"];
  addSwitchButton: IconButtonAtomProps["props"];
};

export type SwitchGroupPanelType = {
  key: string;
  panelLabel: LabelAtomProps["props"];
  keyLabel: LabelAtomProps["props"];
  keyField: TextFieldAtomProps["props"];
  labelLabel: LabelAtomProps["props"];
  labelField: TextFieldAtomProps["props"];
  removeButton: IconButtonAtomProps["props"];
  toggleButton: IconButtonAtomProps["props"];
  isExpanded: boolean;
  switchItemsLabel: LabelAtomProps["props"];
  switchItemSection: SwitchItemSectionType;
};

export type SectionType = {
  add: AddPanelButtonType;
  panels: any[];
  titleLabel: LabelAtomProps["props"];
  switchGrpPanels?: SwitchGroupPanelType[];
  addSwitchGrpRowLabel?: LabelAtomProps["props"];
  addSwitchGrpButton?: IconButtonAtomProps["props"];
};

export interface SectionProps {
  props: SectionType;
}

export interface ConfigurationSwitchSectionOrganismProps {
  props: SectionType;
}

export interface SwitchItemSectionOrganismProps {
  props: SwitchItemSectionType;
}
