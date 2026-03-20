"use client";

import { usePostingClerkService } from "@/hooks/posting-clerk/state/usePostingClerkService";
import {
  usePostingClerkStateReducer,
  PostingClerkContexts,
} from "@/hooks/posting-clerk/state/usePostingClerkStateReducer";

export type { PostingClerkContexts };

export interface PostingClerkContextReturns {
  contexts: PostingClerkContexts;
}

export function usePostingClerkContext(): PostingClerkContextReturns {
  const { fetchItem, request } = usePostingClerkService();
  const { state, action } = usePostingClerkStateReducer();

  const contexts: PostingClerkContexts = {
    service: { fetchItem, request },
    reducer: { state, action },
  };

  return { contexts };
}
