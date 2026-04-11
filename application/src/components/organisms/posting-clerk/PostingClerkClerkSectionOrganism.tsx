import { DividerAtom } from "@/components/atoms/display/DividerAtom";
import { LabelAtom } from "@/components/atoms/display/LabelAtom";
import { postingClerkTheme } from "@/theme/postingClerk";
import { LabelAtomType } from "@/types/ui";
import { ClerkField, ClerkFieldType } from "./ClerkField";
import { PreviewField, PreviewFieldType } from "./PreviewField";
import { QuotesField, QuotesFieldType } from "./QuotesField";

export interface PostingClerkClerkSectionViewModel {
  label: LabelAtomType;
  clerks: ClerkFieldType;
  previews: PreviewFieldType;
  quotes: QuotesFieldType;
}

interface PostingClerkClerkSectionOrganismProps {
  props: PostingClerkClerkSectionViewModel;
}

export function PostingClerkClerkSectionOrganism({
  props,
}: PostingClerkClerkSectionOrganismProps) {
  return (
    <>
      <LabelAtom props={props.label} style={postingClerkTheme.sectionLabel} />
      <DividerAtom />
      <ClerkField props={props.clerks} />
      <PreviewField props={props.previews} />
      <QuotesField props={props.quotes} />
    </>
  );
}
