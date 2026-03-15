"use client";

import { useSampleService } from "@/hooks/sample/service/useSampleService";
import { useSampleReducer } from "@/hooks/sample/reducer/useSampleReducer";
import { useSampleController } from "@/hooks/sample/controller/useSampleController";
import { useSampleComposer, SampleViewModel } from "@/hooks/sample/viewModel/useSampleComposer";

export type { SampleViewModel };

interface SampleViewModelReturns {
  viewModel: SampleViewModel;
}

export function useSampleViewModel(): SampleViewModelReturns {
  const { fetchItem, request } = useSampleService();
  const { state, action } = useSampleReducer();

  const contexts = { service: { fetchItem, request }, reducer: { state, action } };

  useSampleController(contexts);
  const { viewModel } = useSampleComposer(contexts);

  return { viewModel };
}
