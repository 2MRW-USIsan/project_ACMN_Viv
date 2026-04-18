import { DividerAtom } from "@/components/atoms/display/DividerAtom";
import { LabelAtom } from "@/components/atoms/display/LabelAtom";
import { SwitchAtom } from "@/components/atoms/inputs/SwitchAtom";
import { AlignLayout } from "@/components/atoms/layout/AlignLayout";
import { GridLayout } from "@/components/atoms/layout/GridLayout";
import { SelectorProps } from "@/types/configurations/types";

export function Selector({ props }: SelectorProps) {
  return (
    <AlignLayout column={0.1}>
      <GridLayout style={{ size: "CONTAINER" }}>
        <GridLayout style={{ size: 2 }}>
          <LabelAtom
            props={props.label.sectionSelect}
            style={"HEADER"}
            primary
          />
        </GridLayout>
        <GridLayout style={{ size: 4 }}>
          <SwitchAtom props={props.randomize} />
        </GridLayout>
      </GridLayout>
      <DividerAtom />
    </AlignLayout>
  );
}
