"use client";

import { useSampleService } from "@/hooks/sample/state/useSampleService";
import { useSampleStateReducer } from "@/hooks/sample/state/useSampleStateReducer";
import { useSampleController } from "@/hooks/sample/controller/useSampleController";
import { useSampleComposer, SampleViewModel } from "@/hooks/sample/viewModel/useSampleComposer";

export type { SampleViewModel };

interface SampleViewModelReturns {
  viewModel: SampleViewModel;
}

export function useSampleViewModel(): SampleViewModelReturns {
  const { fetchItem, request } = useSampleService();
  const { state, action } = useSampleStateReducer();

  const contexts = { service: { fetchItem, request }, reducer: { state, action } };

  useSampleController(contexts);
  const { viewModel } = useSampleComposer(contexts);

  return { viewModel };
}
