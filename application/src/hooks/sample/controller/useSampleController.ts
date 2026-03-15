"use client";

import { SampleContexts } from "@/hooks/sample/reducer/useSampleReducer";
import { useSampleInitialize } from "@/hooks/sample/controller/useSampleInitialize";
import { useSampleEffects } from "@/hooks/sample/controller/useSampleEffects";

export function useSampleController(contexts: SampleContexts): void {
  useSampleInitialize(contexts);
  useSampleEffects(contexts);
}
