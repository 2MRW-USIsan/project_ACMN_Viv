import { LabelAtomType } from "@/types/ui";
import { DividerAtom } from "../atoms/display/DividerAtom";
import { LabelAtom } from "../atoms/display/LabelAtom";

interface SectionLabelProps {
  props: LabelAtomType;
}
export function SectionLabel({ props }: SectionLabelProps) {
  return (
    <>
      <LabelAtom props={props} style={undefined} />
      <DividerAtom />
    </>
  );
}
