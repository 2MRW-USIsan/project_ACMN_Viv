"use client";

import { usePresetBuilderViewModel } from "@/hooks/preset-builder/viewModel/usePresetBuilderViewModel";
import { PresetBuilderTemplate } from "@/components/template/PresetBuilderTemplate";

export default function PresetBuilderPage() {
  const { viewModel } = usePresetBuilderViewModel();
  return <PresetBuilderTemplate props={viewModel} />;
}
