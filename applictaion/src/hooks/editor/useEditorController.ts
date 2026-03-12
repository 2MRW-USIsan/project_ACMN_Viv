"use client";

import type { EditorContexts } from "@/hooks/editor/useEditorReducer";
import { useEditorEffects } from "@/hooks/editor/useEditorEffects";
import { useEditorInitialize } from "@/hooks/editor/useEditorInitialize";

export function useEditorController(contexts: EditorContexts): void {
  useEditorInitialize(contexts);
  useEditorEffects(contexts);
}
