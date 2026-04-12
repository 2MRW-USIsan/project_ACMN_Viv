import { Box, Collapse, Stack } from "@mui/material";
import { PanelFrameAtomsType } from "@/types/ui";
import { DividerAtom } from "../display/DividerAtom";
import { LabelAtom } from "../display/LabelAtom";
import { IconButtonAtom } from "../inputs/IconButtonAtom";

export interface PanelFrameAtomsProps {
  props: PanelFrameAtomsType;
  children: React.ReactNode;
}
export function PanelFrameAtoms({ props, children }: PanelFrameAtomsProps) {
  return (
    <Box>
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <LabelAtom props={props.titleLabel} />
        <IconButtonAtom props={props.toggleButton} />
      </Stack>
      <DividerAtom />
      <Collapse in={props.isExpanded} timeout="auto" unmountOnExit>
        {children}
      </Collapse>
    </Box>
  );
}
