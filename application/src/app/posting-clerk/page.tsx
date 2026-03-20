"use client";

import { usePostingClerkViewModel } from "@/hooks/posting-clerk/viewModel/usePostingClerkViewModel";
import { PostingClerkTemplate } from "@/components/templates/PostingClerkTemplate";

export default function PostingClerkPage() {
  const { viewModel } = usePostingClerkViewModel();
  return <PostingClerkTemplate props={viewModel} />;
}
