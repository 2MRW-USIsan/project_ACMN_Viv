import { LabelType } from "@/types/components/ui";
import { DividerLine } from "../atoms/display/DividerLine";
import { Label } from "../atoms/display/Label";
import { AlignLayout } from "../atoms/layout/AlignLayout";

interface SectionLabelProps {
  props: LabelType;
  style?: "HEADER" | "LABEL";
}
export function SectionLabel({ props, style = "HEADER" }: SectionLabelProps) {
  return (
    <AlignLayout column={0.1}>
      <Label props={props} style={style} primary={style === "HEADER"} />
      <DividerLine />
    </AlignLayout>
  );
}
