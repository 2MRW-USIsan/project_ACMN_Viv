"use client";

import type { EditorContexts } from "@/hooks/editor/reducer/useEditorReducer";
import { useEditorEffects } from "@/hooks/editor/controller/useEditorEffects";
import { useEditorInitialize } from "@/hooks/editor/controller/useEditorInitialize";

export function useEditorController(contexts: EditorContexts): void {
  useEditorInitialize(contexts);
  useEditorEffects(contexts);
}
