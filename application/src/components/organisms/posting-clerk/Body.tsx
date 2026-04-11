

import { BodyFrame } from "@/components/atoms/layout/BodyFrame";
import {
  ClerkSection,
  ClerkSectionType,
} from "@/components/organisms/posting-clerk/section/ClerkSection";
import {
  InformSection,
  InformSectionType,
} from "@/components/organisms/posting-clerk/section/InformSection";
import {
  ButtonAtomType,
  IconButtonAtomType,
  LabelAtomType,
  TextAreaAtomType,
  TextFieldAtomType,
} from "@/types/ui";

export interface UrlItemPanel {
  key: string;
  nameLabel: LabelAtomType;
  nameField: Pick<TextFieldAtomType, "placeholder" | "value" | "onChange">;
  urlLabel: LabelAtomType;
  urlField: Pick<TextFieldAtomType, "placeholder" | "value" | "onChange">;
  removeButton: Pick<IconButtonAtomType, "icon" | "onClick">;
}

export interface PlatformPreviewPanel {
  key: string;
  sectionLabel: LabelAtomType;
  isExpanded: boolean;
  toggleButton: Pick<IconButtonAtomType, "icon" | "onClick">;
  titleLabel: LabelAtomType;
  titleCopyButton: Pick<ButtonAtomType, "label" | "onClick">;
  descLabel: LabelAtomType;
  descCopyButton: Pick<ButtonAtomType, "label" | "onClick">;
  urlsLabel: LabelAtomType;
  urlsAddButton: Pick<ButtonAtomType, "label" | "onClick">;
  urlItems: UrlItemPanel[];
  previewLabel: LabelAtomType;
  previewField: Pick<TextAreaAtomType, "placeholder" | "value" | "onChange">;
}

export interface QuoteItemPanel {
  key: string;
  quoteLabel: LabelAtomType;
  quoteField: Pick<TextFieldAtomType, "placeholder" | "value" | "onChange">;
  copyButton: Pick<ButtonAtomType, "label" | "onClick">;
}

export interface BodyType {
  informProps: InformSectionType;
  clerkProps: ClerkSectionType;
}

interface BodyProps {
  props: BodyType;
}

export function Body({ props }: BodyProps) {
  return (
    <BodyFrame>
      <InformSection props={props.informProps} />
      <ClerkSection props={props.clerkProps} />
    </BodyFrame>
  );
}
