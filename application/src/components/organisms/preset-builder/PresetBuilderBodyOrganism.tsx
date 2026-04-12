import { BodyType } from "@/types/preset-builder";
import { AlignLayout } from "../../atoms/layout/AlignLayout";
import { BodyFrame } from "../../atoms/layout/BodyFrame";
import { PresetBuilderBuildersSectionOrganism } from "./PresetBuilderBuildersSectionOrganism";
import { PresetBuilderInformSectionOrganism } from "./PresetBuilderInformSectionOrganism";

interface PresetBuilderBodyOrganismProps {
  props: BodyType;
}

export function PresetBuilderBodyOrganism({
  props,
}: PresetBuilderBodyOrganismProps) {
  return (
    <BodyFrame>
      <AlignLayout column={1}>
        <PresetBuilderInformSectionOrganism props={props.informProps} />
        <PresetBuilderBuildersSectionOrganism props={props.builderProps} />
      </AlignLayout>
    </BodyFrame>
  );
}
