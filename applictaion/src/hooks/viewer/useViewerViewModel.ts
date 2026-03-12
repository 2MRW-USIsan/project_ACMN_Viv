"use client";

import { useViewerComposer } from "@/hooks/viewer/useViewerComposer";
import { useViewerController } from "@/hooks/viewer/useViewerController";
import { useViewerReducer } from "@/hooks/viewer/useViewerReducer";
import { useViewerService } from "@/hooks/viewer/useViewerService";

export type { ViewerViewModel } from "@/hooks/viewer/useViewerComposer";

export function useViewerViewModel() {
  const { fetchItem, request } = useViewerService();
  const { state, action } = useViewerReducer();
  const contexts = { service: { fetchItem, request }, reducer: { state, action } };
  useViewerController(contexts);
  const { viewModels } = useViewerComposer(contexts);
  return viewModels;
}
