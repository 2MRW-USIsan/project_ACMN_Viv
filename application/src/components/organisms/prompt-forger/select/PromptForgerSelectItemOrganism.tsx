import { ForgerSelectGrpPanel } from "@/hooks/promptForger/viewModel/usePromptForgerComposer";
import { DividerAtom } from "../../../atoms/display/DividerLine";
import { Label } from "../../../atoms/display/Label";
import { Button } from "../../../atoms/inputs/Button";
import { SelectAtom } from "../../../atoms/inputs/Select";
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
            <Label props={props.shuffleAllLabel} />
          </GridLayout>
          <GridLayout style={{ size: 1 }}>
            <AlignLayout style={"END"}>
              <Button props={props.shuffleButton} />
            </AlignLayout>
          </GridLayout>
        </GridLayout>
        {props.selectRows.map((row) => (
          <GridLayout key={row.key} style={{ size: "CONTAINER" }}>
            <GridLayout style={{ size: 1 }}>
              <Label props={row.label} style={"LABEL"} />
            </GridLayout>
            <GridLayout style={{ size: 8 }}>
              <SelectAtom props={row.select} />
            </GridLayout>
            <GridLayout style={{ size: 1 }}>
              <Button props={row.reloadButton} />
            </GridLayout>
          </GridLayout>
        ))}
      </AlignLayout>
    </AlignLayout>
  );
}
