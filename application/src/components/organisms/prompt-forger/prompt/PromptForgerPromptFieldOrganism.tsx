import { ButtonAtom, ButtonAtomProps } from "@/components/atoms/ButtonAtom";
import { LabelAtom, LabelAtomProps } from "@/components/atoms/LabelAtom";
import { TextAreaAtom, TextAreaAtomProps } from "@/components/atoms/TextAreaAtom";
import { Stack } from "@mui/material";

interface PromptForgerPromptFieldOrganismProps {
  props: {
    shuffleButton: ButtonAtomProps["props"];
    copyButton: ButtonAtomProps["props"];
    summaryPromptLabel: LabelAtomProps["props"];
    summaryPromptField: TextAreaAtomProps["props"];
  };
}

export function PromptForgerPromptFieldOrganism({
  props,
}: PromptForgerPromptFieldOrganismProps) {
  return (
    <Stack spacing={1} pl={2} pt={1}>
      <Stack direction="row" spacing={1}>
        <ButtonAtom props={props.shuffleButton} />
        <ButtonAtom props={props.copyButton} />
      </Stack>
      <LabelAtom props={props.summaryPromptLabel} />
      <TextAreaAtom props={props.summaryPromptField} />
    </Stack>
  );
}
