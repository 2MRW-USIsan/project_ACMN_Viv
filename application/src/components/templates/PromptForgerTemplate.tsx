"use client";

import { PromptForgerViewModel } from "@/hooks/promptForger/viewModel/usePromptForgerViewModel";
import { NavigationLayoutOrganism } from "@/components/organisms/NavigationLayoutOrganism";

interface Props {
  props: PromptForgerViewModel;
}

export function PromptForgerTemplate(_props: Props) {
  return (
    <NavigationLayoutOrganism props={{}}>
      {null}
    </NavigationLayoutOrganism>
  );
}
