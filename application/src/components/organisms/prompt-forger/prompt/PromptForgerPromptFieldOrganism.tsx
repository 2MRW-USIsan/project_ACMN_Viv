import { Label, LabelProps } from "../../../atoms/display/Label";
import { Button, ButtonAtomProps } from "../../../atoms/inputs/Button";
import { TextArea, TextAreaAtomProps } from "../../../atoms/inputs/TextArea";
import { AlignLayout } from "../../../atoms/layout/AlignLayout";
import { GridLayout } from "../../../atoms/layout/GridLayout";

interface PromptForgerPromptFieldOrganismProps {
  props: {
    shuffleButton: ButtonAtomProps["props"];
    copyButton: ButtonAtomProps["props"];
    summaryPromptLabel: LabelProps["props"];
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
          <Button props={props.shuffleButton} />
        </GridLayout>
        <GridLayout style={{ size: 2 }}>
          <Button props={props.copyButton} />
        </GridLayout>
      </GridLayout>
      <Label props={props.summaryPromptLabel} />
      <TextArea props={props.summaryPromptField} />
    </AlignLayout>
  );
}
