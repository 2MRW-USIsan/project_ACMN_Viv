"use client";

import { Stack } from "@mui/material";
import { PresetBuilderViewModel } from "@/hooks/preset-builder/viewModel/usePresetBuilderComposer";
import { NavigationLayoutOrganism } from "@/components/organisms/NavigationLayoutOrganism";

interface PresetBuilderTemplateProps {
  props: PresetBuilderViewModel;
}

export function PresetBuilderTemplate({ props: _props }: PresetBuilderTemplateProps) {
  return (
    <NavigationLayoutOrganism props={{}}>
      <Stack spacing={3} p={3} maxWidth={900} mx="auto">
      </Stack>
    </NavigationLayoutOrganism>
  );
}
