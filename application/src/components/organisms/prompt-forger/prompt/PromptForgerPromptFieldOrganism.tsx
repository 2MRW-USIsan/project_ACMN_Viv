import { Stack } from "@mui/material";
import { LabelAtom, LabelAtomProps } from "../../../atoms/display/LabelAtom";
import { ButtonAtom, ButtonAtomProps } from "../../../atoms/inputs/ButtonAtom";
import {
  TextAreaAtom,
  TextAreaAtomProps,
} from "../../../atoms/inputs/TextAreaAtom";

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
