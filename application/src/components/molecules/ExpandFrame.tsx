import { postingClerkTheme } from "@/theme/postingClerk";
import { IconButtonAtomType, LabelAtomType } from "@/types/ui";
import { DividerAtom } from "../atoms/display/DividerAtom";
import { LabelAtom } from "../atoms/display/LabelAtom";
import { IconButtonAtom } from "../atoms/inputs/IconButtonAtom";
import { AlignLayout } from "../atoms/layout/AlignLayout";
import { CollapseContainer } from "../atoms/layout/CollapseContainer";
import { GridLayout } from "../atoms/layout/GridLayout";

export type ExpandFrameType = {
  isExpanded: boolean;
  label: LabelAtomType;
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
            <LabelAtom props={props.label} style={"LABEL"} primary />
          </GridLayout>
          <GridLayout style={{ size: 1 }}>
            <IconButtonAtom
              props={props.toggle}
              style={postingClerkTheme.smallIconButton}
            />
          </GridLayout>
        </GridLayout>
        <DividerAtom />
      </AlignLayout>

      <CollapseContainer props={props.isExpanded}>{children}</CollapseContainer>
    </AlignLayout>
  );
}
