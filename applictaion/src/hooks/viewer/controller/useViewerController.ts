"use client";

import type { ViewerContexts } from "@/hooks/viewer/reducer/useViewerReducer";
import { useViewerEffects } from "@/hooks/viewer/controller/useViewerEffects";
import { useViewerInitialize } from "@/hooks/viewer/controller/useViewerInitialize";

export function useViewerController(contexts: ViewerContexts): void {
  useViewerInitialize(contexts);
  useViewerEffects(contexts);
}
