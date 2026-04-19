import { Label } from "@/components/atoms/display/Label";
import { AlignLayout } from "@/components/atoms/layout/AlignLayout";
import { SectionLabel } from "@/components/molecules/SectionLabel";
import { SectionType } from "@/types/components/configurations/orders.colors.types";

interface SectionProps {
  props: SectionType;
}
export function Section({ props }: SectionProps) {
  return (
    <AlignLayout column={0.1} indent>
      <SectionLabel props={props.label} style={"HEADER"} />
      <AlignLayout style={"CENTER"}>
        <Label props={props.message} style={"HEADER"} grey />
      </AlignLayout>
    </AlignLayout>
  );
}
