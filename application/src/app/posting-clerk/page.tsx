"use client";

import { usePostingClerkViewModel } from "@/hooks/posting-clerk/viewModel/usePostingClerkViewModel";
import { PostingClerkTemplate } from "@/components/template/PostingClerkTemplate";

export default function PostingClerkPage() {
  const { viewModel } = usePostingClerkViewModel();
  return <PostingClerkTemplate props={viewModel} />;
}
