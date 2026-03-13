"use client";

import type { EditorContexts } from "@/hooks/editor/useEditorReducer";
import { useEditorProperties } from "@/hooks/editor/useEditorProperties";
import type { EditorProperties } from "@/hooks/editor/useEditorProperties";
import { useEditorHandlers } from "@/hooks/editor/useEditorHandlers";
import type { EditorHandlers } from "@/hooks/editor/useEditorHandlers";

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
