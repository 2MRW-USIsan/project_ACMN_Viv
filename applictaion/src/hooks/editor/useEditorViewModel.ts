"use client";

import { useEditorComposer } from "@/hooks/editor/useEditorComposer";
import { useEditorController } from "@/hooks/editor/useEditorController";
import { useEditorReducer } from "@/hooks/editor/useEditorReducer";
import { useEditorService } from "@/hooks/editor/useEditorService";

export type { EditorViewModel } from "@/hooks/editor/useEditorComposer";

export function useEditorViewModel() {
  const { fetchItem, request } = useEditorService();
  const { state, action } = useEditorReducer();
  const contexts = { service: { fetchItem, request }, reducer: { state, action } };
  useEditorController(contexts);
  const { viewModels } = useEditorComposer(contexts);
  return viewModels;
}
