import { AlignLayout } from "@/components/atoms/layout/AlignLayout";
import { postingClerkTheme } from "@/theme/postingClerk";
import { ButtonAtomType, LabelAtomType, TextFieldAtomType } from "@/types/ui";
import { LabelAtom } from "../../../atoms/display/LabelAtom";
import { ButtonAtom } from "../../../atoms/inputs/ButtonAtom";
import { TextFieldAtom } from "../../../atoms/inputs/TextFieldAtom";
import { GridLayout } from "../../../atoms/layout/GridLayout";
import { SectionLabel } from "../../../molecules/SectionLabel";

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
    <AlignLayout column={0.5}>
      <SectionLabel props={props.quotesSectionLabel} />
      <AlignLayout column={0.1}>
        {props.quoteItems.map((quoteItem) => (
          <GridLayout style={{ size: "CONTAINER" }} key={quoteItem.key}>
            <GridLayout style={{ size: 2 }}>
              <LabelAtom props={quoteItem.quoteLabel} style={"LABEL"} />
            </GridLayout>
            <GridLayout style={{ size: 8 }}>
              <TextFieldAtom props={quoteItem.quoteField} />
            </GridLayout>
            <GridLayout style={{ size: 2 }}>
              <ButtonAtom
                props={quoteItem.copyButton}
                style={postingClerkTheme.standardButton}
              />
            </GridLayout>
          </GridLayout>
        ))}
      </AlignLayout>
    </AlignLayout>
  );
}
