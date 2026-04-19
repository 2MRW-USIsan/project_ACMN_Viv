import { ExpandFrameType } from "@/types/components/ui";
import { DividerLine } from "../atoms/display/DividerLine";
import { ExpandMark } from "../atoms/display/ExpandMark";
import { Label } from "../atoms/display/Label";
import { AlignLayout } from "../atoms/layout/AlignLayout";
import { CollapseContainer } from "../atoms/layout/CollapseContainer";
import { GridLayout } from "../atoms/layout/GridLayout";
import { PanelItem } from "../atoms/layout/PanelItem";

interface ExpandFrameProps {
  props: ExpandFrameType;
  children: React.ReactNode;
}

export function ExpandFrame({ props, children }: ExpandFrameProps) {
  return (
    <AlignLayout column={0.1}>
      <AlignLayout column={0.1}>
        <GridLayout style={"CONTAINER"}>
          <PanelItem props={props.toggle}>
            <GridLayout style={11}>
              <Label props={props.label} style={"LABEL"} primary />
            </GridLayout>
            <GridLayout style={1}>
              <ExpandMark props={props.isExpanded} />
            </GridLayout>
          </PanelItem>
        </GridLayout>
        <DividerLine />
      </AlignLayout>
      <CollapseContainer props={props.isExpanded}>{children}</CollapseContainer>
    </AlignLayout>
  );
}
