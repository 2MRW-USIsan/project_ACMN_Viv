import { ForgerSelectGrpPanel } from "@/hooks/promptForger/viewModel/usePromptForgerComposer";
import { DividerAtom } from "../../../atoms/display/DividerAtom";
import { LabelAtom } from "../../../atoms/display/LabelAtom";
import { ButtonAtom } from "../../../atoms/inputs/ButtonAtom";
import { SelectAtom } from "../../../atoms/inputs/SelectAtom";
import { AlignLayout } from "../../../atoms/layout/AlignLayout";
import { GridLayout } from "../../../atoms/layout/GridLayout";

interface PromptForgerSelectItemOrganismProps {
  props: ForgerSelectGrpPanel;
}

export function PromptForgerSelectItemOrganism({
  props,
}: PromptForgerSelectItemOrganismProps) {
  return (
    <AlignLayout column={0.1}>
      <LabelAtom props={props.grpLabel} style={"LABEL"} />
      <DividerAtom />
      <AlignLayout column={0.5}>
        <GridLayout style={{ size: "CONTAINER" }}>
          <GridLayout style={{ size: 6 }}>
            <LabelAtom props={props.shuffleAllLabel} />
          </GridLayout>
          <GridLayout style={{ size: 6 }}>
            <AlignLayout style={"END"}>
              <ButtonAtom props={props.shuffleButton} />
            </AlignLayout>
          </GridLayout>
        </GridLayout>
        {props.selectRows.map((row) => (
          <GridLayout key={row.key} style={{ size: "CONTAINER" }}>
            <GridLayout style={{ size: 2 }}>
              <LabelAtom props={row.label} style={"LABEL"} />
            </GridLayout>
            <GridLayout style={{ size: 8 }}>
              <SelectAtom props={row.select} />
            </GridLayout>
            <GridLayout style={{ size: 2 }}>
              <ButtonAtom props={row.reloadButton} />
            </GridLayout>
          </GridLayout>
        ))}
      </AlignLayout>
    </AlignLayout>
  );
}
