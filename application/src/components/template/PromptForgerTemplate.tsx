import { NavigationLayoutOrganism } from "@/components/organisms/navigation/NavigationLayoutOrganism";
import { PromptForgerBodyOrganism } from "@/components/organisms/prompt-forger/PromptForgerBodyOrganism";
import { PromptForgerViewModel } from "@/hooks/promptForger/viewModel/usePromptForgerComposer";

interface PromptForgerTemplateProps {
  props: PromptForgerViewModel;
}

export function PromptForgerTemplate({ props }: PromptForgerTemplateProps) {
  return (
    <NavigationLayoutOrganism props={props.navigationLayout}>
      <PromptForgerBodyOrganism props={props.promptForgerBody} />
    </NavigationLayoutOrganism>
  );
}
