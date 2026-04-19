import { SectionLabel } from "@/components/molecules/SectionLabel";
import { ForgerOrdersGrpPanel } from "@/hooks/promptForger/viewModel/usePromptForgerComposer";
import { Label } from "../../../atoms/display/Label";
import { Button } from "../../../atoms/inputs/Button";
import { TextField } from "../../../atoms/inputs/TextField";
import { AlignLayout } from "../../../atoms/layout/AlignLayout";
import { GridLayout } from "../../../atoms/layout/GridLayout";

interface PromptForgerOrdersItemOrganismProps {
  props: ForgerOrdersGrpPanel;
}

export function PromptForgerOrdersItemOrganism({
  props,
}: PromptForgerOrdersItemOrganismProps) {
  return (
    <AlignLayout column={0.5}>
      <SectionLabel props={props.grpLabel} style={"LABEL"}></SectionLabel>

      {/* Orders Field */}
      <AlignLayout column={0.5}>
        {props.displayLines.map((line, i) => (
          <Label key={i} props={line} />
        ))}
        <Label props={props.scriptsLabel} />
      </AlignLayout>

      {/* Prompt Field */}
      <GridLayout style={{ size: "CONTAINER" }}>
        <GridLayout style={{ size: 1 }}>
          <Label props={props.promptLabel} style={"LABEL"} />
        </GridLayout>
        <GridLayout style={{ size: 8 }}>
          <TextField props={props.promptField} />
        </GridLayout>
        <GridLayout style={{ size: 1 }}>
          <Button props={props.resetButton} />
        </GridLayout>
        <GridLayout style={{ size: 1 }}>
          <Button props={props.clearButton} />
        </GridLayout>
      </GridLayout>
    </AlignLayout>
  );
}
