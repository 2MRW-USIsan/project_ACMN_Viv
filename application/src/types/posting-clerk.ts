import {
  ButtonAtomType,
  IconButtonAtomType,
  LabelAtomType,
  TextAreaAtomType,
  TextFieldAtomType,
} from "./ui";

// Shared panel props
type InputFieldPanelProps = Pick<
  TextFieldAtomType,
  "placeholder" | "value" | "onChange"
>;
type TextAreaPanelProps = Pick<
  TextAreaAtomType,
  "placeholder" | "value" | "onChange"
>;
type ActionButtonPanelProps = Pick<ButtonAtomType, "label" | "onClick">;
type IconActionButtonPanelProps = Pick<IconButtonAtomType, "icon" | "onClick">;

// Domain model: clerk field
export type ClerkFieldType = {
  titleJpLabel: LabelAtomType;
  titleJpField: TextFieldAtomType;
  titleEnLabel: LabelAtomType;
  titleEnField: TextFieldAtomType;
  symbolLabel: LabelAtomType;
  symbolField: TextFieldAtomType;
  picsLabel: LabelAtomType;
  picsField: TextFieldAtomType;
};

// Domain model: preview field
export type UrlItem = {
  key: string;
  nameLabel: LabelAtomType;
  nameField: TextFieldAtomType;
  urlLabel: LabelAtomType;
  urlField: TextFieldAtomType;
  removeButton: IconButtonAtomType;
};
export type CopyFormItemType = {
  titleLabel: LabelAtomType;
  titleCopyButton: ButtonAtomType;
  descLabel: LabelAtomType;
  descCopyButton: ButtonAtomType;
};
export type ReferenceFormItemType = {
  urlsLabel: LabelAtomType;
  urlsAddButton: ButtonAtomType;
  urlItems: UrlItem[];
};
export type PreviewFormItemType = {
  previewLabel: LabelAtomType;
  previewField: TextAreaAtomType;
};
export type PreviewItemType = {
  frame: {
    label: LabelAtomType;
    toggle: IconButtonAtomType;
    isExpanded: boolean;
  };
  copyForm: CopyFormItemType;
  referenceForm: ReferenceFormItemType;
  previewForm: PreviewFormItemType;
  key: string;
};
export type PreviewFieldType = {
  postingPreviewLabel: LabelAtomType;
  platformPreviews: PreviewItemType[];
};

// Domain model: quotes field
export type QuotesItemType = {
  key: string;
  quoteLabel: LabelAtomType;
  quoteField: TextFieldAtomType;
  copyButton: ButtonAtomType;
};
export type QuotesFieldType = {
  quotesSectionLabel: LabelAtomType;
  quoteItems: QuotesItemType[];
};

// Panel model: preview panels
export interface UrlItemPanel {
  key: string;
  nameLabel: LabelAtomType;
  nameField: InputFieldPanelProps;
  urlLabel: LabelAtomType;
  urlField: InputFieldPanelProps;
  removeButton: IconActionButtonPanelProps;
}

export interface PlatformPreviewPanel {
  key: string;
  sectionLabel: LabelAtomType;
  isExpanded: boolean;
  toggleButton: IconActionButtonPanelProps;
  titleLabel: LabelAtomType;
  titleCopyButton: ActionButtonPanelProps;
  descLabel: LabelAtomType;
  descCopyButton: ActionButtonPanelProps;
  urlsLabel: LabelAtomType;
  urlsAddButton: ActionButtonPanelProps;
  urlItems: UrlItemPanel[];
  previewLabel: LabelAtomType;
  previewField: TextAreaPanelProps;
}

// Panel model: quote panel
export interface QuoteItemPanel {
  key: string;
  quoteLabel: LabelAtomType;
  quoteField: InputFieldPanelProps;
  copyButton: ActionButtonPanelProps;
}

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
export interface ClerkSectionType {
  label: LabelAtomType;
  clerks: ClerkFieldType;
  previews: PreviewFieldType;
  quotes: QuotesFieldType;
}

// Screen model: root body props
export interface BodyType {
  informProps: InformSectionType;
  clerkProps: ClerkSectionType;
}
