"use client";

// import { usePresetBuilderViewModel } from "@/hooks/preset-builder/viewModel/usePresetBuilderViewModel";
import { usePresetBuilderViewModelMocks } from "@/hooks/preset-builder/mocks/usePresetBuilderViewModelMocks";
import { PresetBuilderTemplate } from "@/components/template/PresetBuilderTemplate";

export default function PresetBuilderPage() {
  // const { viewModel } = usePresetBuilderViewModel();
  const { viewModel } = usePresetBuilderViewModelMocks();
  return <PresetBuilderTemplate props={viewModel} />;
}

