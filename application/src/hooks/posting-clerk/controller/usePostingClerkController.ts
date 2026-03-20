"use client";

import { PostingClerkContexts } from "@/hooks/posting-clerk/state/usePostingClerkContext";
import { usePostingClerkInitialize } from "@/hooks/posting-clerk/controller/usePostingClerkInitialize";
import { usePostingClerkEffects } from "@/hooks/posting-clerk/controller/usePostingClerkEffects";

export function usePostingClerkController(
  contexts: PostingClerkContexts,
): void {
  usePostingClerkInitialize(contexts);
  usePostingClerkEffects(contexts);
}
