"use client";

import { useSampleViewModel } from "@/hooks/sample/viewModel/useSampleViewModel";
import { SampleTemplate } from "@/components/templates/SampleTemplate";

export default function SamplePage() {
  const { viewModel } = useSampleViewModel();
  return <SampleTemplate props={viewModel} />;
}
