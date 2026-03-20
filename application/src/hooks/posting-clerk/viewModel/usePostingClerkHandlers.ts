"use client";

import { PostingClerkContexts } from "@/hooks/posting-clerk/state/usePostingClerkContext";

export interface PostingClerkHandlers {
  // ハンドラは後続工程で追加予定
}

export function usePostingClerkHandlers(contexts: PostingClerkContexts) {
  const { action: _action } = contexts.reducer;
  const { request: _request } = contexts.service;

  const handlers: PostingClerkHandlers = {};

  return { handlers };
}
