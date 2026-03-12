import { TextFieldPanel } from "@/components/atoms/TextFieldPanel";
import { RemoveIconButton } from "@/components/atoms/RemoveIconButton";
import { SelectListViewItem } from "@/types/select";
import { Grid } from "@mui/material";

interface ListItemTextFieldPanelProps {
  props: SelectListViewItem;
}
export function ListItemTextFieldPanel({
  props: { values, onChangeForm, onDelete },
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
      <Grid size="grow">
        <TextFieldPanel props={valueFormProps} />
      </Grid>
      <Grid size="grow">
        <TextFieldPanel props={promptFormProps} />
      </Grid>
      <Grid size="auto" sx={{ display: "flex", alignItems: "center" }}>
        <RemoveIconButton props={{ onClick: onDelete }} />
      </Grid>
    </Grid>
  );
}
