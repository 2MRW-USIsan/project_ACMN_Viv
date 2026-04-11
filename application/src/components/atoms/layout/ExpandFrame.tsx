import { postingClerkTheme } from "@/theme/postingClerk";
import { IconButtonAtomType, LabelAtomType } from "@/types/ui";
import { Collapse, Stack } from "@mui/material";
import { LabelAtom } from "../display/LabelAtom";
import { IconButtonAtom } from "../inputs/IconButtonAtom";

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
    <>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
      >
        <LabelAtom props={props.label} style={postingClerkTheme.sectionLabel} />
        <IconButtonAtom
          props={props.toggle}
          style={postingClerkTheme.smallIconButton}
        />
      </Stack>

      <Collapse in={props.isExpanded} timeout="auto" unmountOnExit>
        {children}
      </Collapse>
    </>
  );
}
