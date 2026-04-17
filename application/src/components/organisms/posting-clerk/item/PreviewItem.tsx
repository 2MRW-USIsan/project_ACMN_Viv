import { AlignLayout } from "@/components/atoms/layout/AlignLayout";
import { ExpandFrame } from "@/components/molecules/ExpandFrame";
import { PreviewItemType } from "@/types/posting-clerk";
import { CopyFormItem } from "./CopyFormItem";
import { PreviewFormItem } from "./PreviewFormItem";
import { ReferenceFormItem } from "./ReferenceFormItem";

interface PreviewItemProps {
  props: PreviewItemType;
}
export function PreviewItem({ props }: PreviewItemProps) {
  return (
    <ExpandFrame props={props.frame} key={props.key}>
      <AlignLayout column={0.5}>
        <CopyFormItem props={props.copyForm} />
        <ReferenceFormItem props={props.referenceForm} />
        <PreviewFormItem props={props.previewForm} />
      </AlignLayout>
    </ExpandFrame>
  );
}
