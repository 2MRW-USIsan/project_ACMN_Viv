import { LabelAtom } from "@/components/atoms/display/LabelAtom";
import { ButtonAtom } from "@/components/atoms/inputs/ButtonAtom";
import { TextFieldAtom } from "@/components/atoms/inputs/TextFieldAtom";
import { GridLayout } from "@/components/atoms/layout/GridLayout";
import { SectionLabel } from "@/components/molecules/SectionLabel";
import { postingClerkTheme } from "@/theme/postingClerk";
import { ButtonAtomType, LabelAtomType, TextFieldAtomType } from "@/types/ui";

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
interface QuotesFieldProps {
  props: QuotesFieldType;
}
export function QuotesField({ props }: QuotesFieldProps) {
  return (
    <>
      <SectionLabel props={props.quotesSectionLabel} />
      <GridLayout style={{ size: "CONTAINER" }}>
        {props.quoteItems.map((quoteItem) => (
          <GridLayout style={{ size: "CONTAINER" }} key={quoteItem.key}>
            <GridLayout style={{ size: 1 }}>
              <LabelAtom
                props={quoteItem.quoteLabel}
                style={postingClerkTheme.fieldLabel}
              />
            </GridLayout>
            <GridLayout style={{ size: 10 }}>
              <TextFieldAtom props={quoteItem.quoteField} />
            </GridLayout>
            <GridLayout style={{ size: 1 }}>
              <ButtonAtom
                props={quoteItem.copyButton}
                style={postingClerkTheme.standardButton}
              />
            </GridLayout>
          </GridLayout>
        ))}
      </GridLayout>
    </>
  );
}
