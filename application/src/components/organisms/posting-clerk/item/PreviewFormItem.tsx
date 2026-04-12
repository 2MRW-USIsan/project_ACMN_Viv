import { LabelAtom } from "@/components/atoms/display/LabelAtom";
import { TextAreaAtom } from "@/components/atoms/inputs/TextAreaAtom";
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
          <LabelAtom props={props.previewLabel} style={"LABEL"} />
          <TextAreaAtom props={props.previewField} style={{ rows: 8 }} />
        </AlignLayout>
      </GridLayout>
    </GridLayout>
  );
}
