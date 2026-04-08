import { DividerAtom } from "@/components/atoms/DividerAtom";
import { IconButtonAtom } from "@/components/atoms/IconButtonAtom";
import { LabelAtom } from "@/components/atoms/LabelAtom";
import { Box, Collapse, Stack } from "@mui/material";

interface PanelFrameAtomsProps {
  props: {
    isExpanded: any;
    titleLabel: any;
    toggleButton: any;
  };
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
