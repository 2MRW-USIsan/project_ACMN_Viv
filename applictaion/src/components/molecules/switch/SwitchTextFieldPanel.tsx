import { SwitchChildViewItem } from "@/types/switch";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import { Grid, IconButton } from "@mui/material";
import { TextFieldPanel } from "../../atoms/TextFieldPanel";

interface SwitchTextFieldPanelProps {
  props: SwitchChildViewItem;
}
export function SwitchTextFieldPanel({ props }: SwitchTextFieldPanelProps) {
  const { values, onChangeForm, onDelete } = props;
  const keyFormProps = {
    label: "Key:",
    value: values.key,
    onChange: (value: string) => onChangeForm("key", value),
  };
  const labelFormProps = {
    label: "Label:",
    value: values.label,
    onChange: (value: string) => onChangeForm("label", value),
  };
  const valueFormProps = {
    label: "Value:",
    value: values.value,
    onChange: (value: string) => onChangeForm("value", value),
  };
  const altValueFormProps = {
    label: "Alt VAlue:",
    value: values.altValue,
    onChange: (value: string) => onChangeForm("altValue", value),
  };
  return (
    <Grid container alignItems="center">
      <Grid size={2}>
        <TextFieldPanel prop={keyFormProps} />
      </Grid>
      <Grid size={2}>
        <TextFieldPanel prop={labelFormProps} />
      </Grid>
      <Grid size={3}>
        <TextFieldPanel prop={valueFormProps} />
      </Grid>
      <Grid size={3}>
        <TextFieldPanel prop={altValueFormProps} />
      </Grid>
      <Grid size="auto" sx={{ display: "flex", alignItems: "center" }}>
        <IconButton size="small" onClick={onDelete}>
          <RemoveCircleOutlineIcon fontSize="small" />
        </IconButton>
      </Grid>
    </Grid>
  );
}
