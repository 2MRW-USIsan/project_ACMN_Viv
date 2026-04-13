import { LabelAtomType } from "@/types/ui";
import { DividerAtom } from "../atoms/display/DividerAtom";
import { LabelAtom } from "../atoms/display/LabelAtom";
import { AlignLayout } from "../atoms/layout/AlignLayout";

interface SectionLabelProps {
  props: LabelAtomType;
  style?: "HEADER" | "LABEL";
}
export function SectionLabel({ props, style = "HEADER" }: SectionLabelProps) {
  return (
    <AlignLayout column={0.1}>
      <LabelAtom props={props} style={style} primary={style === "HEADER"} />
      <DividerAtom />
    </AlignLayout>
  );
}
