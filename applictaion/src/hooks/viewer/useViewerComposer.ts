"use client";

import type { ViewerContexts } from "@/hooks/viewer/useViewerReducer";
import { useViewerProperties } from "@/hooks/viewer/useViewerProperties";
import type { ViewerProperties } from "@/hooks/viewer/useViewerProperties";
import { useViewerHandlers } from "@/hooks/viewer/useViewerHandlers";
import type { ViewerHandlers } from "@/hooks/viewer/useViewerHandlers";

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
