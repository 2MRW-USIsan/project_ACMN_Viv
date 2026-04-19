import { postingClerkTheme } from "@/theme/postingClerk";
import { LabelType } from "@/types/components/ui";
import { IconButtonAtomType } from "@/types/ui";
import { DividerLine } from "../atoms/display/DividerLine";
import { Label } from "../atoms/display/Label";
import { IconButtonAtom } from "../atoms/inputs/IconButtonAtom";
import { AlignLayout } from "../atoms/layout/AlignLayout";
import { CollapseContainer } from "../atoms/layout/CollapseContainer";
import { GridLayout } from "../atoms/layout/GridLayout";

export type ExpandFrameType = {
  isExpanded: boolean;
  label: LabelType;
  toggle: IconButtonAtomType;
};

interface ExpandFrameProps {
  props: ExpandFrameType;
  children: React.ReactNode;
}

export function ExpandFrame({ props, children }: ExpandFrameProps) {
  return (
    <AlignLayout column={0.1}>
      <AlignLayout column={0.1}>
        <GridLayout style={{ size: "CONTAINER" }}>
          <GridLayout style={{ size: 11 }}>
            <Label props={props.label} style={"LABEL"} primary />
          </GridLayout>
          <GridLayout style={{ size: 1 }}>
            <IconButtonAtom
              props={props.toggle}
              style={postingClerkTheme.smallIconButton}
            />
          </GridLayout>
        </GridLayout>
        <DividerLine />
      </AlignLayout>

      <CollapseContainer props={props.isExpanded}>{children}</CollapseContainer>
    </AlignLayout>
  );
}
