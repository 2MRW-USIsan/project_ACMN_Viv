"use client";

import { useConfigurationsContext } from "@/hooks/configurations/state/useConfigurationsContext";
import { useConfigurationsController } from "@/hooks/configurations/controller/useConfigurationsController";
import {
  useConfigurationsComposer,
  ConfigurationsViewModel,
} from "@/hooks/configurations/viewModel/useConfigurationsComposer";

export type { ConfigurationsViewModel };

interface ConfigurationsViewModelReturns {
  viewModel: ConfigurationsViewModel;
}

export function useConfigurationsViewModel(): ConfigurationsViewModelReturns {
  const { contexts } = useConfigurationsContext();
  useConfigurationsController(contexts);
  const { viewModel } = useConfigurationsComposer(contexts);

  return { viewModel };
}
