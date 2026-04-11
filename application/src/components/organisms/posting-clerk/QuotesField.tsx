import { DividerAtom } from "@/components/atoms/display/DividerAtom";
import { LabelAtom } from "@/components/atoms/display/LabelAtom";
import { ButtonAtom } from "@/components/atoms/inputs/ButtonAtom";
import { TextFieldAtom } from "@/components/atoms/inputs/TextFieldAtom";
import { postingClerkTheme } from "@/theme/postingClerk";
import { LabelAtomType, TextFieldAtomType, ButtonAtomType } from "@/types/ui";
import { Stack, Box } from "@mui/material";

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
      {/* Quotes Field */}
      <LabelAtom
        props={props.quotesSectionLabel}
        style={postingClerkTheme.sectionLabel}
      />
      <DividerAtom />

      <Stack spacing={0.5} pl={2}>
        {props.quoteItems.map((quoteItem) => (
          <Stack
            key={quoteItem.key}
            direction="row"
            alignItems="center"
            spacing={1}
          >
            <LabelAtom
              props={quoteItem.quoteLabel}
              style={postingClerkTheme.fieldLabel}
            />
            <Box sx={{ flex: 1, maxWidth: 400 }}>
              <TextFieldAtom props={quoteItem.quoteField} />
            </Box>
            <ButtonAtom
              props={quoteItem.copyButton}
              style={postingClerkTheme.standardButton}
            />
          </Stack>
        ))}
      </Stack>
    </>
  );
}
