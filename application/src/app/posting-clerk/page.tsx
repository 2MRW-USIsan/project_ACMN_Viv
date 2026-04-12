"use client";

// import { usePostingClerkViewModel } from "@/hooks/posting-clerk/viewModel/usePostingClerkViewModel";
import { PostingClerkTemplate } from "@/components/template/PostingClerkTemplate";
import { usePostingClerkViewModelMocks } from "@/hooks/posting-clerk/mocks/usePostingClerkViewModelMocks";

export default function PostingClerkPage() {
  // const { viewModel } = usePostingClerkViewModel();
  const { viewModel } = usePostingClerkViewModelMocks();
  return <PostingClerkTemplate props={viewModel} />;
}
