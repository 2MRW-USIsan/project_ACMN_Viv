"use client";

import type { EditorContexts } from "@/hooks/editor/reducer/useEditorReducer";
import { useEditorProperties } from "@/hooks/editor/viewModel/useEditorProperties";
import type { EditorProperties } from "@/hooks/editor/viewModel/useEditorProperties";
import { useEditorHandlers } from "@/hooks/editor/viewModel/useEditorHandlers";
import type { EditorHandlers } from "@/hooks/editor/viewModel/useEditorHandlers";

export type EditorViewModel = EditorProperties & EditorHandlers;

type Returns = {
  viewModels: EditorViewModel;
};

export function useEditorComposer(contexts: EditorContexts): Returns {
  const properties = useEditorProperties(contexts);
  const handlers = useEditorHandlers(contexts);

  const viewModels: EditorViewModel = {
    ...properties,
    ...handlers,
  };

  return { viewModels };
}
