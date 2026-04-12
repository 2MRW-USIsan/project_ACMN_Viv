import { LabelAtomType } from "@/types/ui";
import { SectionLabel } from "../../../molecules/SectionLabel";
import {
  ClerkField,
  ClerkFieldType,
} from "../../../organisms/posting-clerk/field/ClerkField";
import {
  PreviewField,
  PreviewFieldType,
} from "../../../organisms/posting-clerk/field/PreviewField";
import {
  QuotesField,
  QuotesFieldType,
} from "../../../organisms/posting-clerk/field/QuotesField";
import { AlignLayout } from "@/components/atoms/layout/AlignLayout";

export interface ClerkSectionType {
  label: LabelAtomType;
  clerks: ClerkFieldType;
  previews: PreviewFieldType;
  quotes: QuotesFieldType;
}

interface ClerkSectionProps {
  props: ClerkSectionType;
}

export function ClerkSection({ props }: ClerkSectionProps) {
  return (
    <AlignLayout column={0.5}>
      <SectionLabel props={props.label} />
      <ClerkField props={props.clerks} />
      <PreviewField props={props.previews} />
      <QuotesField props={props.quotes} />
    </AlignLayout>
  );
}
