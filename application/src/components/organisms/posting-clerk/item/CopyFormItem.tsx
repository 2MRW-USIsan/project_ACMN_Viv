import { DividerLine } from "@/components/atoms/display/DividerLine";
import { Label } from "@/components/atoms/display/Label";
import { Button } from "@/components/atoms/inputs/Button";
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
          <Label props={props.titleLabel} style={"LABEL"} />
        </GridLayout>
        <GridLayout style={{ size: 2 }}>
          <Button
            props={props.titleCopyButton}
            style={postingClerkTheme.standardButton}
          />
        </GridLayout>
      </GridLayout>
      <GridLayout style={{ size: 12 }}>
        <GridLayout style={{ size: 10 }}>
          <Label props={props.descLabel} style={"LABEL"} />
        </GridLayout>
        <GridLayout style={{ size: 2 }}>
          <Button
            props={props.descCopyButton}
            style={postingClerkTheme.standardButton}
          />
        </GridLayout>
      </GridLayout>
      <GridLayout style={{ size: 12 }}>
        <AlignLayout column={0.1}>
          <DividerLine />
        </AlignLayout>
      </GridLayout>
    </GridLayout>
  );
}
