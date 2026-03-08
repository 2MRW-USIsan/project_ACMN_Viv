import { TextFieldPanel } from "@/components/atoms/TextFieldPanel";
import { SelectListViewItem } from "@/types/select";
import { Grid } from "@mui/material";

interface ListItemTextFieldPanelProps {
  props: SelectListViewItem;
}
export function ListItemTextFieldPanel({
  props: { values, onChangeForm },
}: ListItemTextFieldPanelProps) {
  const promptFormProps = {
    label: "Prompt:",
    value: values.prompt,
    onChange: (value: string) => onChangeForm("prompt", value),
  };
  const valueFormProps = {
    label: "Value:",
    value: values.value,
    onChange: (value: string) => onChangeForm("value", value),
  };
  return (
    <Grid container paddingLeft={4}>
      <Grid size={6}>
        <TextFieldPanel prop={valueFormProps} />
      </Grid>
      <Grid size={6}>
        <TextFieldPanel prop={promptFormProps} />
      </Grid>
    </Grid>
  );
}
