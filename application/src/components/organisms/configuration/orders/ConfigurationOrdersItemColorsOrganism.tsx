"use client";

import { LabelAtom } from "@/components/atoms/LabelAtom";
import { ColorsSection } from "@/hooks/configurations/viewModel/useConfigurationsComposer";
import { Box, Divider, Stack } from "@mui/material";

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
      <Divider />
    </Box>
  );
}
