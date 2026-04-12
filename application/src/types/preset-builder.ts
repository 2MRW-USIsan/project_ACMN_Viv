import {
  ButtonAtomType,
  LabelAtomType,
  TextAreaAtomType,
  TextFieldAtomType,
} from "./ui";

// Shared panel props
type TextAreaPanelProps = Pick<
  TextAreaAtomType,
  "placeholder" | "value" | "onChange"
>;

// Screen model: section props
export interface InformSectionType {
  infoSectionLabel: LabelAtomType;
  idLabel: LabelAtomType;
  idValueLabel: LabelAtomType;
  titleLabel: LabelAtomType;
  titleField: Pick<
    TextFieldAtomType,
    "placeholder" | "value" | "onChange" | "label"
  >;
  statusLabel: LabelAtomType;
  statusValueLabel: LabelAtomType;
  saveButton: Pick<
    ButtonAtomType,
    "label" | "onClick" | "disabled" | "isLoading"
  >;
}

export interface BuildersSectionType {
  label: LabelAtomType;
  shuffleButton: Pick<ButtonAtomType, "label" | "onClick">;
  copyButton: Pick<ButtonAtomType, "label" | "onClick">;
  pasteButton: Pick<ButtonAtomType, "label" | "onClick">;
  resetButton: Pick<ButtonAtomType, "label" | "onClick">;
  clearButton: Pick<ButtonAtomType, "label" | "onClick">;
  presetsTemplateLabel: LabelAtomType;
  presetsTemplateField: TextAreaPanelProps;
  orderPresetsLabel: LabelAtomType;
  orderPresetsField: TextAreaPanelProps;
}

// Screen model: root body props
export interface BodyType {
  informProps: InformSectionType;
  builderProps: BuildersSectionType;
}
