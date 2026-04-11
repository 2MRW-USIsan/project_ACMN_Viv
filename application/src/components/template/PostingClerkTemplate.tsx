

import { NavigationLayoutOrganism } from "@/components/organisms/navigation/NavigationLayoutOrganism";
import { Body as PostingClerkBody } from "@/components/organisms/posting-clerk/Body";
import { PostingClerkViewModel } from "@/hooks/posting-clerk/viewModel/usePostingClerkComposer";

interface PostingClerkTemplateProps {
  props: PostingClerkViewModel;
}

export function PostingClerkTemplate({ props }: PostingClerkTemplateProps) {
  return (
    <NavigationLayoutOrganism props={props.navigationLayout}>
      <PostingClerkBody props={props.postingClerkBody} />
    </NavigationLayoutOrganism>
  );
}
