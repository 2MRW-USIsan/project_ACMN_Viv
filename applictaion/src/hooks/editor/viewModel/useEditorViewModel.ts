"use client";

import { useEditorComposer } from "@/hooks/editor/viewModel/useEditorComposer";
import { useEditorController } from "@/hooks/editor/controller/useEditorController";
import { useEditorReducer } from "@/hooks/editor/reducer/useEditorReducer";
import { useEditorService } from "@/hooks/editor/service/useEditorService";

export type { EditorViewModel } from "@/hooks/editor/viewModel/useEditorComposer";

export function useEditorViewModel() {
  const { fetchItem, request } = useEditorService();
  const { state, action } = useEditorReducer();
  const contexts = { service: { fetchItem, request }, reducer: { state, action } };
  useEditorController(contexts);
  const { viewModels } = useEditorComposer(contexts);
  return viewModels;
}
