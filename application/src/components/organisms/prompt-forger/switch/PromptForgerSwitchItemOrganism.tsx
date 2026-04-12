import { ForgerSwitchGrpPanel } from "@/hooks/promptForger/viewModel/usePromptForgerComposer";
import { DividerAtom } from "../../../atoms/display/DividerAtom";
import { LabelAtom } from "../../../atoms/display/LabelAtom";
import { SwitchAtom } from "../../../atoms/inputs/SwitchAtom";
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
      <LabelAtom props={props.grpLabel} style={"LABEL"} />
      <DividerAtom />
      <GridLayout style={{ size: "CONTAINER" }}>
        {props.switchItems.map((item) => (
          <GridLayout key={item.key} style={{ size: 6 }}>
            <LabelAtom props={item.itemLabel} />
            <SwitchAtom props={item.switchControl} />
          </GridLayout>
        ))}
      </GridLayout>
    </AlignLayout>
  );
}
