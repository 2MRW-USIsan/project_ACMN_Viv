import { SectionLabel } from "@/components/molecules/SectionLabel";
import { ForgerSwitchGrpPanel } from "@/hooks/promptForger/viewModel/usePromptForgerComposer";
import { Label } from "../../../atoms/display/Label";
import { Switcher } from "../../../atoms/inputs/Switcher";
import { AlignLayout } from "../../../atoms/layout/AlignLayout";
import { GridLayout } from "../../../atoms/layout/GridLayout";

interface PromptForgerSwitchItemOrganismProps {
  props: ForgerSwitchGrpPanel;
}

export function PromptForgerSwitchItemOrganism({
  props,
}: PromptForgerSwitchItemOrganismProps) {
  return (
    <AlignLayout column={0.1}>
      <SectionLabel props={props.grpLabel} style={"LABEL"}></SectionLabel>

      <GridLayout style={{ size: "CONTAINER" }}>
        {props.switchItems.map((item) => (
          <GridLayout key={item.key} style={{ size: 6 }}>
            <Label props={item.itemLabel} />
            <Switcher props={item.switchControl} />
          </GridLayout>
        ))}
      </GridLayout>
    </AlignLayout>
  );
}
