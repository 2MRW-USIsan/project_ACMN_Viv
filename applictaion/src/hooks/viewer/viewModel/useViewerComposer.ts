"use client";

import type { ViewerContexts } from "@/hooks/viewer/reducer/useViewerReducer";
import { useViewerProperties } from "@/hooks/viewer/viewModel/useViewerProperties";
import type { ViewerProperties } from "@/hooks/viewer/viewModel/useViewerProperties";
import { useViewerHandlers } from "@/hooks/viewer/viewModel/useViewerHandlers";
import type { ViewerHandlers } from "@/hooks/viewer/viewModel/useViewerHandlers";

export type ViewerViewModel = ViewerProperties & ViewerHandlers;

type Returns = {
  viewModels: ViewerViewModel;
};

export function useViewerComposer(contexts: ViewerContexts): Returns {
  const properties = useViewerProperties(contexts);
  const handlers = useViewerHandlers(contexts);

  const viewModels: ViewerViewModel = {
    ...properties,
    ...handlers,
  };

  return { viewModels };
}
