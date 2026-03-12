"use client";

import type { ViewerContexts } from "@/hooks/viewer/useViewerReducer";
import { useViewerEffects } from "@/hooks/viewer/useViewerEffects";
import { useViewerInitialize } from "@/hooks/viewer/useViewerInitialize";

export function useViewerController(contexts: ViewerContexts): void {
  useViewerInitialize(contexts);
  useViewerEffects(contexts);
}
