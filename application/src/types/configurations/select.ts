import { LabelAtomProps } from "@/components/atoms/display/LabelAtom";
import { IconButtonAtomProps } from "@/components/atoms/inputs/IconButtonAtom";
import { SwitchAtomProps } from "@/components/atoms/inputs/SwitchAtom";
import { TextFieldAtomProps } from "@/components/atoms/inputs/TextFieldAtom";
import { AddPanelButtonType } from "@/components/molecules/AddPanelButton";
import { LabelAtomType } from "../ui";
import { SelectorType } from "./types";

export type ListItemPanelType = {
  key: string;
  valueLabel: LabelAtomProps["props"];
  valueField: TextFieldAtomProps["props"];
  promptLabel: LabelAtomProps["props"];
  promptField: TextFieldAtomProps["props"];
  removeButton: IconButtonAtomProps["props"];
};

export type SelectorPanelType = {
  key: string;
  panelLabel: LabelAtomProps["props"];
  keyLabel: LabelAtomProps["props"];
  keyField: TextFieldAtomProps["props"];
  labelLabel: LabelAtomProps["props"];
  labelField: TextFieldAtomProps["props"];
  removeButton: IconButtonAtomProps["props"];
  toggleButton: IconButtonAtomProps["props"];
  isExpanded: boolean;
  listItemsLabel: LabelAtomProps["props"];
  listItemPanels: ListItemPanelType[];
  addListItemRowLabel: LabelAtomProps["props"];
  addListItemButton: IconButtonAtomProps["props"];
};

export type SelectItemSectionType = {
  shuffleLabel: LabelAtomProps["props"];
  shuffleSwitch: SwitchAtomProps["props"];
  selectorsLabel: LabelAtomProps["props"];
  selectorPanels: SelectorPanelType[];
  addSelectorRowLabel: LabelAtomProps["props"];
  addSelectorButton: IconButtonAtomProps["props"];
};

export type SelectGroupPanelType = {
  key: string;
  panelLabel: LabelAtomProps["props"];
  keyLabel: LabelAtomProps["props"];
  keyField: TextFieldAtomProps["props"];
  labelLabel: LabelAtomProps["props"];
  labelField: TextFieldAtomProps["props"];
  removeButton: IconButtonAtomProps["props"];
  toggleButton: IconButtonAtomProps["props"];
  isExpanded: boolean;
  selectItemsLabel: LabelAtomProps["props"];
  selectItemSection: SelectItemSectionType;
};

export type SectionType = {
  selector: SelectorType;
  panels: any[];
  add: AddPanelButtonType;
  label: LabelAtomType;
};

export interface SectionProps {
  props: SectionType;
}

export interface ConfigurationSelectSectionOrganismProps {
  props: SectionType;
}

export interface SelectItemSectionOrganismProps {
  props: SelectItemSectionType;
}
