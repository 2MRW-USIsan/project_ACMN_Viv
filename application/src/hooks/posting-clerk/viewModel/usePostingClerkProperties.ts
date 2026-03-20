"use client";

import { PostingClerkContexts } from "@/hooks/posting-clerk/state/usePostingClerkContext";

export interface PostingClerkProperties {
  // プロパティは後続工程で追加予定
}

export function usePostingClerkProperties(contexts: PostingClerkContexts) {
  const { state: _state } = contexts.reducer;
  const { fetchItem: _fetchItem } = contexts.service;

  const properties: PostingClerkProperties = {};

  return { properties };
}
