import {
  AppBarType,
  ButtonAtomType,
  ChipRadioAtomType,
  DrawerType,
  LabelAtomType,
  SelectAtomType,
  TextFieldAtomType,
} from "./ui";

export type ConfigSelectFieldType = {
  label: Record<string, LabelAtomType>;
  button: Record<string, ButtonAtomType>;
  configSelect: SelectAtomType;
  nameField: TextFieldAtomType;
};

export type DataSelectFieldType = {
  label: Record<string, LabelAtomType>;
  button: Record<string, ButtonAtomType>;
  groupSelect: SelectAtomType;
  nameField: TextFieldAtomType;
  radioGroup: {
    radio: ChipRadioAtomType;
    key: string;
  }[];
};

export type NavigationLabelType = {
  isCurrent: boolean;
  title: LabelAtomType;
};

export type NavigationItemType = {
  key: string;
  navigation: NavigationLabelType;
  configSelect: ConfigSelectFieldType | undefined;
  dataSelect: DataSelectFieldType | undefined;
};

export type NavigationListType = {
  navItemList: NavigationItemType[];
};

export type LegacyLinkType = {
  label: string;
  onClick: () => void;
};

export type LegacyConfigurationsType = {
  setLabel: LabelAtomType;
  select: SelectAtomType;
  loadButton: ButtonAtomType;
  newButton: ButtonAtomType;
  nameLabel: LabelAtomType;
  editField: TextFieldAtomType;
  saveButton?: ButtonAtomType;
  changeButton?: ButtonAtomType;
  deleteButton: ButtonAtomType;
};

export type LegacyPresetItemPanelType = {
  key: string;
  radio: ChipRadioAtomType;
  label: LabelAtomType;
};

export type LegacyPresetsType = {
  groupLabel: LabelAtomType;
  groupSelect: SelectAtomType;
  loadButton: ButtonAtomType;
  newButton: ButtonAtomType;
  nameLabel: LabelAtomType;
  nameField: TextFieldAtomType;
  saveButton?: ButtonAtomType;
  changeButton?: ButtonAtomType;
  deleteButton: ButtonAtomType;
  presetItemPanels: LegacyPresetItemPanelType[];
};

export type LegacyNavigationType = {
  linksAbove: LegacyLinkType[];
  label: LabelAtomType | undefined;
  links: LegacyLinkType[];
  configurations?: LegacyConfigurationsType;
  presets?: LegacyPresetsType;
};

export type NavigationType = NavigationListType | LegacyNavigationType;

export interface NavigationLayoutType {
  appBar: AppBarType;
  drawer: DrawerType;
  title: LabelAtomType;
  navigation: NavigationType;
}
