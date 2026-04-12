import { AlignLayout } from "@/components/atoms/layout/AlignLayout";
import { ClerkSectionType } from "@/types/posting-clerk";
import { SectionLabel } from "../../../molecules/SectionLabel";
import { ClerkField } from "../../../organisms/posting-clerk/field/ClerkField";
import { PreviewField } from "../../../organisms/posting-clerk/field/PreviewField";
import { QuotesField } from "../../../organisms/posting-clerk/field/QuotesField";

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
