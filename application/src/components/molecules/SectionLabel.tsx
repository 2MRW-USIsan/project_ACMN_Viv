import { LabelAtomType } from "@/types/ui";
import { DividerAtom } from "../atoms/display/DividerAtom";
import { LabelAtom } from "../atoms/display/LabelAtom";
import { AlignLayout } from "../atoms/layout/AlignLayout";

interface SectionLabelProps {
  props: LabelAtomType;
}
export function SectionLabel({ props }: SectionLabelProps) {
  return (
    <AlignLayout column={0.1}>
      <LabelAtom props={props} style={"HEADER"} primary />
      <DividerAtom />
    </AlignLayout>
  );
}
