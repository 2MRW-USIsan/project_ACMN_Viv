"use client";

import { PostingClerkViewModel } from "@/hooks/posting-clerk/viewModel/usePostingClerkComposer";
import { NavigationLayoutOrganism } from "@/components/organisms/NavigationLayoutOrganism";

interface PostingClerkTemplateProps {
  props: PostingClerkViewModel;
}

export function PostingClerkTemplate({ props: _props }: PostingClerkTemplateProps) {
  return (
    <NavigationLayoutOrganism props={{ title: "Posting-Clerk" }}>
    </NavigationLayoutOrganism>
  );
}
