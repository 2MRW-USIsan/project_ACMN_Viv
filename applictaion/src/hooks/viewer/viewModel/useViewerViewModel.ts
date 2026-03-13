"use client";

import { useViewerComposer } from "@/hooks/viewer/viewModel/useViewerComposer";
import { useViewerController } from "@/hooks/viewer/controller/useViewerController";
import { useViewerReducer } from "@/hooks/viewer/reducer/useViewerReducer";
import { useViewerService } from "@/hooks/viewer/service/useViewerService";

export type { ViewerViewModel } from "@/hooks/viewer/viewModel/useViewerComposer";

export function useViewerViewModel() {
  const { fetchItem, request } = useViewerService();
  const { state, action } = useViewerReducer();
  const contexts = { service: { fetchItem, request }, reducer: { state, action } };
  useViewerController(contexts);
  const { viewModels } = useViewerComposer(contexts);
  return viewModels;
}
