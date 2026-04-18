import { LabelAtom } from "@/components/atoms/display/LabelAtom";
import { AlignLayout } from "@/components/atoms/layout/AlignLayout";
import { SectionLabel } from "@/components/molecules/SectionLabel";
import { SectionProps } from "@/types/configurations/orders/scripts";

export function Section({ props }: SectionProps) {
  return (
    <AlignLayout column={0.1} indent>
      <SectionLabel props={props.label} style={"HEADER"} />
      <AlignLayout style={"CENTER"}>
        <LabelAtom props={props.message} style={"HEADER"} grey />
      </AlignLayout>
    </AlignLayout>
  );
}
