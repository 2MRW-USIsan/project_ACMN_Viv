import { PreviewFieldType } from "@/types/posting-clerk";
import { AlignLayout } from "../../../atoms/layout/AlignLayout";
import { SectionLabel } from "../../../molecules/SectionLabel";
import { PreviewItem } from "../item/PreviewItem";

interface PreviewFieldProps {
  props: PreviewFieldType;
}
export function PreviewField({ props }: PreviewFieldProps) {
  return (
    <AlignLayout column={0.5}>
      <SectionLabel props={props.postingPreviewLabel} />
      <AlignLayout column={0.5}>
        {props.platformPreviews.map((platform) => (
          <PreviewItem props={platform} key={platform.key} />
        ))}
      </AlignLayout>
    </AlignLayout>
  );
}
