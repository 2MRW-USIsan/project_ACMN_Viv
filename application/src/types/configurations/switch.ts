import { LabelProps } from "@/components/atoms/display/Label";
import { IconButtonAtomProps } from "@/components/atoms/inputs/IconButtonAtom";
import { SwitchAtomProps } from "@/components/atoms/inputs/Switcher";
import { TextFieldAtomProps } from "@/components/atoms/inputs/TextField";
import { AddPanelButtonType } from "@/components/molecules/AddPanelButton";

export type SwitchItemPanelType = {
  key: string;
  labelLabel: LabelProps["props"];
  labelField: TextFieldAtomProps["props"];
  valueLabel: LabelProps["props"];
  valueField: TextFieldAtomProps["props"];
  altLabel: LabelProps["props"];
  altField: TextFieldAtomProps["props"];
  removeButton: IconButtonAtomProps["props"];
};

export type SwitchItemSectionType = {
  randomizeLabel: LabelProps["props"];
  randomizeSwitch: SwitchAtomProps["props"];
  switchItemPanels: SwitchItemPanelType[];
  addSwitchRowLabel: LabelProps["props"];
  addSwitchButton: IconButtonAtomProps["props"];
};

export type SwitchGroupPanelType = {
  key: string;
  panelLabel: LabelProps["props"];
  keyLabel: LabelProps["props"];
  keyField: TextFieldAtomProps["props"];
  labelLabel: LabelProps["props"];
  labelField: TextFieldAtomProps["props"];
  removeButton: IconButtonAtomProps["props"];
  toggleButton: IconButtonAtomProps["props"];
  isExpanded: boolean;
  switchItemsLabel: LabelProps["props"];
  switchItemSection: SwitchItemSectionType;
};

export type SectionType = {
  add: AddPanelButtonType;
  panels: any[];
  titleLabel: LabelProps["props"];
  switchGrpPanels?: SwitchGroupPanelType[];
  addSwitchGrpRowLabel?: LabelProps["props"];
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
