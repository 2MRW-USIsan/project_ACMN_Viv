import { LabelAtom, LabelAtomProps } from "../../../atoms/display/LabelAtom";
import { ButtonAtom, ButtonAtomProps } from "../../../atoms/inputs/ButtonAtom";
import {
  TextAreaAtom,
  TextAreaAtomProps,
} from "../../../atoms/inputs/TextAreaAtom";
import { AlignLayout } from "../../../atoms/layout/AlignLayout";
import { GridLayout } from "../../../atoms/layout/GridLayout";

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
    <AlignLayout column={1}>
      <GridLayout style={{ size: "CONTAINER" }}>
        <GridLayout style={{ size: 2 }}>
          <ButtonAtom props={props.shuffleButton} />
        </GridLayout>
        <GridLayout style={{ size: 2 }}>
          <ButtonAtom props={props.copyButton} />
        </GridLayout>
      </GridLayout>
      <LabelAtom props={props.summaryPromptLabel} />
      <TextAreaAtom props={props.summaryPromptField} />
    </AlignLayout>
  );
}
