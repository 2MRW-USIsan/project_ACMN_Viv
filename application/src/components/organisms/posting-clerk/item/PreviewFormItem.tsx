import { Label } from "@/components/atoms/display/Label";
import { TextArea } from "@/components/atoms/inputs/TextArea";
import { AlignLayout } from "@/components/atoms/layout/AlignLayout";
import { GridLayout } from "@/components/atoms/layout/GridLayout";
import { PreviewFormItemType } from "@/types/posting-clerk";

interface PreviewFormItemProps {
  props: PreviewFormItemType;
}
export function PreviewFormItem({ props }: PreviewFormItemProps) {
  return (
    <GridLayout style={{ size: "CONTAINER" }}>
      <GridLayout style={{ size: 12 }}>
        <AlignLayout column={0.5}>
          <Label props={props.previewLabel} style={"LABEL"} />
          <TextArea props={props.previewField} style={8} />
        </AlignLayout>
      </GridLayout>
    </GridLayout>
  );
}
