"use client";

import { usePostingClerkContext } from "@/hooks/posting-clerk/state/usePostingClerkContext";
import { usePostingClerkController } from "@/hooks/posting-clerk/controller/usePostingClerkController";
import {
  usePostingClerkComposer,
  PostingClerkViewModel,
} from "@/hooks/posting-clerk/viewModel/usePostingClerkComposer";

export type { PostingClerkViewModel };

interface PostingClerkViewModelReturns {
  viewModel: PostingClerkViewModel;
}

export function usePostingClerkViewModel(): PostingClerkViewModelReturns {
  const { contexts } = usePostingClerkContext();

  usePostingClerkController(contexts);
  const { viewModel } = usePostingClerkComposer(contexts);

  return { viewModel };
}
