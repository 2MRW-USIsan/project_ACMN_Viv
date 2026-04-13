import { ForgerSelectGrpPanel } from "@/hooks/promptForger/viewModel/usePromptForgerComposer";
import { DividerAtom } from "../../../atoms/display/DividerAtom";
import { LabelAtom } from "../../../atoms/display/LabelAtom";
import { ButtonAtom } from "../../../atoms/inputs/ButtonAtom";
import { SelectAtom } from "../../../atoms/inputs/SelectAtom";
import { AlignLayout } from "../../../atoms/layout/AlignLayout";
import { GridLayout } from "../../../atoms/layout/GridLayout";
import { SectionLabel } from "@/components/molecules/SectionLabel";

interface PromptForgerSelectItemOrganismProps {
  props: ForgerSelectGrpPanel;
}

export function PromptForgerSelectItemOrganism({
  props,
}: PromptForgerSelectItemOrganismProps) {
  return (
    <AlignLayout column={0.1}>
      <SectionLabel props={props.grpLabel} style={"LABEL"}></SectionLabel>

      <AlignLayout column={0.5}>
        <GridLayout style={{ size: "CONTAINER" }}>
          <GridLayout style={{ size: 2 }}>
            <LabelAtom props={props.shuffleAllLabel} />
          </GridLayout>
          <GridLayout style={{ size: 1 }}>
            <AlignLayout style={"END"}>
              <ButtonAtom props={props.shuffleButton} />
            </AlignLayout>
          </GridLayout>
        </GridLayout>
        {props.selectRows.map((row) => (
          <GridLayout key={row.key} style={{ size: "CONTAINER" }}>
            <GridLayout style={{ size: 1 }}>
              <LabelAtom props={row.label} style={"LABEL"} />
            </GridLayout>
            <GridLayout style={{ size: 8 }}>
              <SelectAtom props={row.select} />
            </GridLayout>
            <GridLayout style={{ size: 1 }}>
              <ButtonAtom props={row.reloadButton} />
            </GridLayout>
          </GridLayout>
        ))}
      </AlignLayout>
    </AlignLayout>
  );
}
