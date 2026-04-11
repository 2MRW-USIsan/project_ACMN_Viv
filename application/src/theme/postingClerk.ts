import { LabelAtomType, ButtonAtomType, IconButtonAtomType } from "@/types/ui";
import { PostingClerkBodyStyle } from "@/components/organisms/posting-clerk/PostingClerkBodyOrganism";
import { PostingClerkInformSectionStyle } from "@/components/organisms/posting-clerk/PostingClerkInformSectionOrganism";

type LabelStyleType = NonNullable<LabelAtomType["style"]>;
type ButtonStyleType = NonNullable<ButtonAtomType["style"]>;
type IconButtonStyleType = NonNullable<IconButtonAtomType["style"]>;

const sectionLabelStyle: LabelStyleType = { size: "LABEL", color: "text.primary" };
const fieldLabelStyle: LabelStyleType = { size: "CAPTION", color: "text.secondary" };
const standardButtonStyle: ButtonStyleType = { shape: "OUTLINED", color: "PRIMARY", size: "NORMAL" };
const smallIconButtonStyle: IconButtonStyleType = { color: "DEFAULT", size: "SMALL" };

const postingClerkInformSectionStyle: PostingClerkInformSectionStyle = {
  infoSectionLabel: sectionLabelStyle,
  idLabel: fieldLabelStyle,
  idValueLabel: fieldLabelStyle,
  titleLabel: fieldLabelStyle,
  statusLabel: fieldLabelStyle,
  statusValueLabel: fieldLabelStyle,
  saveButton: standardButtonStyle,
};

export const postingClerkBodyTheme: PostingClerkBodyStyle = {
  informSection: postingClerkInformSectionStyle,
  clerkingSectionLabel: sectionLabelStyle,
  titleJpLabel: fieldLabelStyle,
  titleEnLabel: fieldLabelStyle,
  symbolLabel: fieldLabelStyle,
  picsLabel: fieldLabelStyle,
  postingPreviewLabel: sectionLabelStyle,
  quotesSectionLabel: sectionLabelStyle,
  platformPreview: {
    sectionLabel: sectionLabelStyle,
    toggleButton: smallIconButtonStyle,
    titleLabel: fieldLabelStyle,
    titleCopyButton: standardButtonStyle,
    descLabel: fieldLabelStyle,
    descCopyButton: standardButtonStyle,
    urlsLabel: fieldLabelStyle,
    urlsAddButton: standardButtonStyle,
    urlItem: {
      nameLabel: fieldLabelStyle,
      urlLabel: fieldLabelStyle,
      removeButton: smallIconButtonStyle,
    },
    previewLabel: fieldLabelStyle,
    previewField: { rows: 8 },
  },
  quoteItem: {
    quoteLabel: fieldLabelStyle,
    copyButton: standardButtonStyle,
  },
};
