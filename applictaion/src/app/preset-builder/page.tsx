"use client";

import { usePresetBuilderViewModelMocks } from "@/hooks/preset-builder/mocks/usePresetBuilderViewModelMocks";
import { PresetBuilderTemplate } from "@/components/template/PresetBuilderTemplate";

export default function PresetBuilderPage() {
  const { viewModel } = usePresetBuilderViewModelMocks();
  return <PresetBuilderTemplate props={viewModel} />;
}
