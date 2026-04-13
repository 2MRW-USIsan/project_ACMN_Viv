import { SectionLabel } from "@/components/molecules/SectionLabel";
import { ForgerOrdersGrpPanel } from "@/hooks/promptForger/viewModel/usePromptForgerComposer";
import { LabelAtom } from "../../../atoms/display/LabelAtom";
import { ButtonAtom } from "../../../atoms/inputs/ButtonAtom";
import { TextFieldAtom } from "../../../atoms/inputs/TextFieldAtom";
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
          <LabelAtom key={i} props={line} />
        ))}
        <LabelAtom props={props.scriptsLabel} />
      </AlignLayout>

      {/* Prompt Field */}
      <GridLayout style={{ size: "CONTAINER" }}>
        <GridLayout style={{ size: 1 }}>
          <LabelAtom props={props.promptLabel} style={"LABEL"} />
        </GridLayout>
        <GridLayout style={{ size: 8 }}>
          <TextFieldAtom props={props.promptField} />
        </GridLayout>
        <GridLayout style={{ size: 1 }}>
          <ButtonAtom props={props.resetButton} />
        </GridLayout>
        <GridLayout style={{ size: 1 }}>
          <ButtonAtom props={props.clearButton} />
        </GridLayout>
      </GridLayout>
    </AlignLayout>
  );
}
