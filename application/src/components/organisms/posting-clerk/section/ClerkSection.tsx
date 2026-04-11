import { SectionLabel } from "@/components/molecules/SectionLabel";
import {
  ClerkField,
  ClerkFieldType,
} from "@/components/organisms/posting-clerk/field/ClerkField";
import {
  PreviewField,
  PreviewFieldType,
} from "@/components/organisms/posting-clerk/field/PreviewField";
import {
  QuotesField,
  QuotesFieldType,
} from "@/components/organisms/posting-clerk/field/QuotesField";
import { LabelAtomType } from "@/types/ui";

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
    <>
      <SectionLabel props={props.label} />
      <ClerkField props={props.clerks} />
      <PreviewField props={props.previews} />
      <QuotesField props={props.quotes} />
    </>
  );
}
