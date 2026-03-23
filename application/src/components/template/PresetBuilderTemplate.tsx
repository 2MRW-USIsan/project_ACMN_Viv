"use client";

import { Stack, Typography } from "@mui/material";
import { PresetBuilderViewModel } from "@/hooks/preset-builder/viewModel/usePresetBuilderComposer";

interface PresetBuilderTemplateProps {
  props: PresetBuilderViewModel;
}

export function PresetBuilderTemplate({
  props: _props,
}: PresetBuilderTemplateProps) {
  return (
    <Stack spacing={3} p={3} maxWidth={900} mx="auto">
      <Typography variant="h4">プリセット情報編集</Typography>
    </Stack>
  );
}
