"use client";

import { usePresetBuilderViewModel } from "@/hooks/preset-builder/viewModel/usePresetBuilderViewModel";
import { PresetBuilderTemplate } from "@/components/templates/PresetBuilderTemplate";

export default function PresetBuilderPage() {
  const { viewModel } = usePresetBuilderViewModel();
  return <PresetBuilderTemplate props={viewModel} />;
}
