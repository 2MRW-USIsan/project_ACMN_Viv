"use client";

import { useSampleContext } from "@/hooks/sample/state/useSampleContext";
import { useSampleController } from "@/hooks/sample/controller/useSampleController";
import {
  useSampleComposer,
  SampleViewModel,
} from "@/hooks/sample/viewModel/useSampleComposer";

export type { SampleViewModel };

interface SampleViewModelReturns {
  viewModel: SampleViewModel;
}

export function useSampleViewModel(): SampleViewModelReturns {
  const { contexts } = useSampleContext();

  useSampleController(contexts);
  const { viewModel } = useSampleComposer(contexts);

  return { viewModel };
}
