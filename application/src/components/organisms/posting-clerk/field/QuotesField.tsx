import { AlignLayout } from "@/components/atoms/layout/AlignLayout";
import { postingClerkTheme } from "@/theme/postingClerk";
import { QuotesFieldType } from "@/types/posting-clerk";
import { Label } from "../../../atoms/display/Label";
import { Button } from "../../../atoms/inputs/Button";
import { TextField } from "../../../atoms/inputs/TextField";
import { GridLayout } from "../../../atoms/layout/GridLayout";
import { SectionLabel } from "../../../molecules/SectionLabel";

interface QuotesFieldProps {
  props: QuotesFieldType;
}
export function QuotesField({ props }: QuotesFieldProps) {
  return (
    <AlignLayout column={0.5}>
      <SectionLabel props={props.quotesSectionLabel} />
      <AlignLayout column={0.1}>
        {props.quoteItems.map((quoteItem) => (
          <GridLayout style={{ size: "CONTAINER" }} key={quoteItem.key}>
            <GridLayout style={{ size: 2 }}>
              <Label props={quoteItem.quoteLabel} style={"LABEL"} />
            </GridLayout>
            <GridLayout style={{ size: 8 }}>
              <TextField props={quoteItem.quoteField} />
            </GridLayout>
            <GridLayout style={{ size: 2 }}>
              <Button
                props={quoteItem.copyButton}
                style={postingClerkTheme.standardButton}
              />
            </GridLayout>
          </GridLayout>
        ))}
      </AlignLayout>
    </AlignLayout>
  );
}
