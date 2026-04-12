import { postingClerkTheme } from "@/theme/postingClerk";
import { IconButtonAtomType, LabelAtomType } from "@/types/ui";
import { Collapse } from "@mui/material";
import { DividerAtom } from "../display/DividerAtom";
import { LabelAtom } from "../display/LabelAtom";
import { IconButtonAtom } from "../inputs/IconButtonAtom";
import { AlignLayout } from "./AlignLayout";
import { GridLayout } from "./GridLayout";

type ExpandFrameType = {
  label: LabelAtomType;
  toggle: IconButtonAtomType;
  isExpanded: boolean;
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

      <Collapse in={props.isExpanded} timeout="auto" unmountOnExit>
        {children}
      </Collapse>
    </AlignLayout>
  );
}
