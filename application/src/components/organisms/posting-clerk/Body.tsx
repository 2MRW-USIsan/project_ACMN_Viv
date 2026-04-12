import { AlignLayout } from "@/components/atoms/layout/AlignLayout";
import {
  ButtonAtomType,
  IconButtonAtomType,
  LabelAtomType,
  TextAreaAtomType,
  TextFieldAtomType,
} from "@/types/ui";
import { BodyFrame } from "../../atoms/layout/BodyFrame";
import {
  ClerkSection,
  ClerkSectionType,
} from "../../organisms/posting-clerk/section/ClerkSection";
import {
  InformSection,
  InformSectionType,
} from "../../organisms/posting-clerk/section/InformSection";

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
      <AlignLayout column={1}>
        <InformSection props={props.informProps} />
        <ClerkSection props={props.clerkProps} />
      </AlignLayout>
    </BodyFrame>
  );
}
