import { NavigationLayoutOrganism } from "@/components/organisms/navigation/NavigationLayoutOrganism";
import { PresetBuilderBodyOrganism } from "@/components/organisms/preset-builder/PresetBuilderBodyOrganism";
import { PresetBuilderViewModel } from "@/hooks/preset-builder/viewModel/usePresetBuilderComposer";

interface PresetBuilderTemplateProps {
  props: PresetBuilderViewModel;
}

export function PresetBuilderTemplate({ props }: PresetBuilderTemplateProps) {
  return (
    <NavigationLayoutOrganism props={props.navigationLayout}>
      <PresetBuilderBodyOrganism props={props.presetBuilderBody} />
    </NavigationLayoutOrganism>
  );
}
