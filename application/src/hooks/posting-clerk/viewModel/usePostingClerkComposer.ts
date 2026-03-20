"use client";

import { PostingClerkContexts } from "@/hooks/posting-clerk/state/usePostingClerkContext";
import { usePostingClerkProperties } from "@/hooks/posting-clerk/viewModel/usePostingClerkProperties";
import { usePostingClerkHandlers } from "@/hooks/posting-clerk/viewModel/usePostingClerkHandlers";

export interface PostingClerkViewModel {
  // ViewModel は後続工程で追加予定
}

export function usePostingClerkComposer(contexts: PostingClerkContexts) {
  const { properties: _properties } = usePostingClerkProperties(contexts);
  const { handlers: _handlers } = usePostingClerkHandlers(contexts);

  return {
    viewModel: {} satisfies PostingClerkViewModel,
  };
}
