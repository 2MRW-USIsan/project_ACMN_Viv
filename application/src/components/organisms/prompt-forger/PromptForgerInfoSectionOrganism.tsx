import { PromptForgerInfoSectionViewModel } from "@/hooks/promptForger/viewModel/usePromptForgerComposer";
import { Label } from "../../atoms/display/Label";
import { Button } from "../../atoms/inputs/Button";
import { TextField } from "../../atoms/inputs/TextField";
import { AlignLayout } from "../../atoms/layout/AlignLayout";
import { GridLayout } from "../../atoms/layout/GridLayout";
import { SectionLabel } from "../../molecules/SectionLabel";

interface PromptForgerInfoSectionOrganismProps {
  props: PromptForgerInfoSectionViewModel;
}

export function PromptForgerInfoSectionOrganism({
  props,
}: PromptForgerInfoSectionOrganismProps) {
  return (
    <AlignLayout column={0.5}>
      <SectionLabel props={props.infoSectionLabel} />
      <GridLayout style={{ size: "CONTAINER" }}>
        <GridLayout style={{ size: 12 }}>
          <GridLayout style={{ size: 2 }}>
            <Label props={props.idLabel} style={"LABEL"} />
          </GridLayout>
          <GridLayout style={{ size: 10 }}>
            <AlignLayout style={"START"}>
              <Label props={props.idValueLabel} style={"BODY"} />
            </AlignLayout>
          </GridLayout>
        </GridLayout>
        <GridLayout style={{ size: 12 }}>
          <GridLayout style={{ size: 2 }}>
            <Label props={props.titleLabel} style={"LABEL"} />
          </GridLayout>
          <GridLayout style={{ size: 10 }}>
            <AlignLayout style={"END"}>
              <TextField props={props.titleField} />
            </AlignLayout>
          </GridLayout>
        </GridLayout>
        <GridLayout style={{ size: 12 }}>
          <GridLayout style={{ size: 2 }}>
            <Label props={props.statusLabel} style={"LABEL"} />
          </GridLayout>
          <GridLayout style={{ size: 8 }}>
            <AlignLayout style={"END"}>
              <Label props={props.statusValueLabel} style={"CAPTION"} />
            </AlignLayout>
          </GridLayout>
          <GridLayout style={{ size: 2 }}>
            <AlignLayout style={"END"}>
              <Button props={props.saveButton} />
            </AlignLayout>
          </GridLayout>
        </GridLayout>
      </GridLayout>
    </AlignLayout>
  );
}
