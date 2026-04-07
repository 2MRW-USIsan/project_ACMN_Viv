"use client";

// import { usePostingClerkViewModel } from "@/hooks/posting-clerk/viewModel/usePostingClerkViewModel";
import { usePostingClerkViewModelMocks } from "@/hooks/posting-clerk/mocks/usePostingClerkViewModelMocks";
import { PostingClerkTemplate } from "@/components/template/PostingClerkTemplate";

export default function PostingClerkPage() {
  // const { viewModel } = usePostingClerkViewModel();
  const { viewModel } = usePostingClerkViewModelMocks();
  return <PostingClerkTemplate props={viewModel} />;
}
