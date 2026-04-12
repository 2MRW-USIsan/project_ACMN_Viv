import { ColorsSection } from "@/hooks/configurations/viewModel/useConfigurationsComposer";
import { Box, Stack } from "@mui/material";
import { DividerAtom } from "../../../atoms/display/DividerAtom";
import { LabelAtom } from "../../../atoms/display/LabelAtom";

interface ConfigurationOrdersItemColorsOrganismProps {
  props: ColorsSection;
}

export function ConfigurationOrdersItemColorsOrganism({
  props,
}: ConfigurationOrdersItemColorsOrganismProps) {
  return (
    <Box>
      <Stack direction="row" alignItems="center" spacing={2} py={1}>
        <LabelAtom props={props.colorLabel} />
        <Box sx={{ flex: 1, display: "flex", justifyContent: "center" }}>
          <LabelAtom props={props.colorInfoLabel} />
        </Box>
      </Stack>
      <DividerAtom />
    </Box>
  );
}
