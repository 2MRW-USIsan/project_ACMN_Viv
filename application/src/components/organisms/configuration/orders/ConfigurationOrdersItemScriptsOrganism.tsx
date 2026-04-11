"use client";

import { LabelAtom } from "@/components/atoms/display/LabelAtom";
import { ScriptsSection } from "@/hooks/configurations/viewModel/useConfigurationsComposer";
import { Box, Divider, Stack } from "@mui/material";

interface ConfigurationOrdersItemScriptsOrganismProps {
  props: ScriptsSection;
}

export function ConfigurationOrdersItemScriptsOrganism({
  props,
}: ConfigurationOrdersItemScriptsOrganismProps) {
  return (
    <Box>
      <Stack direction="row" alignItems="center" spacing={2} py={1}>
        <LabelAtom props={props.scriptLabel} />
        <Box sx={{ flex: 1, display: "flex", justifyContent: "center" }}>
          <LabelAtom props={props.scriptInfoLabel} />
        </Box>
      </Stack>
      <Divider />
    </Box>
  );
}
