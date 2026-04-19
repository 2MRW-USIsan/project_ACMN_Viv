import { DividerLine } from "@/components/atoms/display/DividerLine";
import { Label } from "@/components/atoms/display/Label";
import { Switcher } from "@/components/atoms/inputs/Switcher";
import { AlignLayout } from "@/components/atoms/layout/AlignLayout";
import { GridLayout } from "@/components/atoms/layout/GridLayout";
import { SelectorType } from "@/types/components/configurations/select.group.types";

interface SelectorProps {
  props: SelectorType;
}
export function Selector({ props }: SelectorProps) {
  return (
    <AlignLayout column={0.1}>
      <GridLayout style={"CONTAINER"}>
        <GridLayout style={2}>
          <Label props={props.label} style={"HEADER"} primary />
        </GridLayout>
        <GridLayout style={4}>
          <Switcher props={props.shuffle} />
        </GridLayout>
      </GridLayout>
      <DividerLine />
    </AlignLayout>
  );
}
