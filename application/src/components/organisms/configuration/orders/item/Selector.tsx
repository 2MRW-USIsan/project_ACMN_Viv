import { DividerAtom } from "@/components/atoms/display/DividerLine";
import { Label } from "@/components/atoms/display/Label";
import { ChipRadioAtom } from "@/components/atoms/inputs/ChipRadio";
import { AlignLayout } from "@/components/atoms/layout/AlignLayout";
import { GridLayout } from "@/components/atoms/layout/GridLayout";
import { SelectorProps } from "@/types/configurations/types";

export function Selector({ props }: SelectorProps) {
  return (
    <AlignLayout column={0.1}>
      <GridLayout style={{ size: "CONTAINER" }}>
        <GridLayout style={{ size: 2 }}>
          <Label props={props.label.sectionSelect} style={"HEADER"} primary />
        </GridLayout>
        <GridLayout style={{ size: 4 }}>
          {props.sectionSelect.map((section) => (
            <ChipRadioAtom props={section.props} key={section.key} />
          ))}
        </GridLayout>
      </GridLayout>
      <DividerAtom />
    </AlignLayout>
  );
}
