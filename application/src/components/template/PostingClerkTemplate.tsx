"use client";

import { NavigationLayoutOrganism } from "@/components/organisms/navigation/NavigationLayoutOrganism";
import { PostingClerkBodyOrganism } from "@/components/organisms/posting-clerk/PostingClerkBodyOrganism";
import { PostingClerkViewModel } from "@/hooks/posting-clerk/viewModel/usePostingClerkComposer";
import { postingClerkBodyTheme } from "@/theme/postingClerk";

interface PostingClerkTemplateProps {
  props: PostingClerkViewModel;
}

export function PostingClerkTemplate({ props }: PostingClerkTemplateProps) {
  return (
    <NavigationLayoutOrganism props={props.navigationLayout}>
      <PostingClerkBodyOrganism
        props={props.postingClerkBody}
        style={postingClerkBodyTheme}
      />
    </NavigationLayoutOrganism>
  );
}
