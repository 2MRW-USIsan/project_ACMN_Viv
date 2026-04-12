import { DividerAtom } from "@/components/atoms/display/DividerAtom";
import { LabelAtom } from "@/components/atoms/display/LabelAtom";
import { ButtonAtom } from "@/components/atoms/inputs/ButtonAtom";
import { AlignLayout } from "@/components/atoms/layout/AlignLayout";
import { GridLayout } from "@/components/atoms/layout/GridLayout";
import { postingClerkTheme } from "@/theme/postingClerk";
import { CopyFormItemType } from "@/types/posting-clerk";

interface CopyFormItemProps {
  props: CopyFormItemType;
}
export function CopyFormItem({ props }: CopyFormItemProps) {
  return (
    <GridLayout style={{ size: "CONTAINER" }}>
      <GridLayout style={{ size: 12 }}>
        <GridLayout style={{ size: 10 }}>
          <LabelAtom props={props.titleLabel} style={"LABEL"} />
        </GridLayout>
        <GridLayout style={{ size: 2 }}>
          <ButtonAtom
            props={props.titleCopyButton}
            style={postingClerkTheme.standardButton}
          />
        </GridLayout>
      </GridLayout>
      <GridLayout style={{ size: 12 }}>
        <GridLayout style={{ size: 10 }}>
          <LabelAtom props={props.descLabel} style={"LABEL"} />
        </GridLayout>
        <GridLayout style={{ size: 2 }}>
          <ButtonAtom
            props={props.descCopyButton}
            style={postingClerkTheme.standardButton}
          />
        </GridLayout>
      </GridLayout>
      <GridLayout style={{ size: 12 }}>
        <AlignLayout column={0.1}>
          <DividerAtom />
        </AlignLayout>
      </GridLayout>
    </GridLayout>
  );
}
