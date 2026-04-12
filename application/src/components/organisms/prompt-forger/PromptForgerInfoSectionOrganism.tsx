import { PromptForgerInfoSectionViewModel } from "@/hooks/promptForger/viewModel/usePromptForgerComposer";
import { LabelAtom } from "../../atoms/display/LabelAtom";
import { ButtonAtom } from "../../atoms/inputs/ButtonAtom";
import { TextFieldAtom } from "../../atoms/inputs/TextFieldAtom";
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
            <LabelAtom props={props.idLabel} style={"LABEL"} />
          </GridLayout>
          <GridLayout style={{ size: 10 }}>
            <AlignLayout style={"START"}>
              <LabelAtom props={props.idValueLabel} style={"BODY"} />
            </AlignLayout>
          </GridLayout>
        </GridLayout>
        <GridLayout style={{ size: 12 }}>
          <GridLayout style={{ size: 2 }}>
            <LabelAtom props={props.titleLabel} style={"LABEL"} />
          </GridLayout>
          <GridLayout style={{ size: 10 }}>
            <AlignLayout style={"END"}>
              <TextFieldAtom props={props.titleField} />
            </AlignLayout>
          </GridLayout>
        </GridLayout>
        <GridLayout style={{ size: 12 }}>
          <GridLayout style={{ size: 2 }}>
            <LabelAtom props={props.statusLabel} style={"LABEL"} />
          </GridLayout>
          <GridLayout style={{ size: 8 }}>
            <AlignLayout style={"END"}>
              <LabelAtom props={props.statusValueLabel} style={"CAPTION"} />
            </AlignLayout>
          </GridLayout>
          <GridLayout style={{ size: 2 }}>
            <AlignLayout style={"END"}>
              <ButtonAtom props={props.saveButton} />
            </AlignLayout>
          </GridLayout>
        </GridLayout>
      </GridLayout>
    </AlignLayout>
  );
}
