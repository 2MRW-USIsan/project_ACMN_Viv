import { SwitchChildViewItem } from "@/types/switch";
import { RemoveIconButton } from "@/components/atoms/RemoveIconButton";
import { Grid } from "@mui/material";
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
    <Grid
      container
      paddingInline={2}
      alignItems="center"
      sx={{ flexWrap: { xs: "wrap", md: "nowrap" } }}
    >
      <Grid size={{ xs: 6, md: "grow" }}>
        <TextFieldPanel props={keyFormProps} />
      </Grid>
      <Grid size={{ xs: 6, md: "grow" }}>
        <TextFieldPanel props={labelFormProps} />
      </Grid>
      <Grid size={{ xs: 5, md: "grow" }}>
        <TextFieldPanel props={valueFormProps} />
      </Grid>
      <Grid size={{ xs: 5, md: "grow" }}>
        <TextFieldPanel props={altValueFormProps} />
      </Grid>
      <Grid
        size={{ xs: 2, md: "auto" }}
        sx={{ display: "flex", alignItems: "center" }}
      >
        <RemoveIconButton props={{ onClick: onDelete }} />
      </Grid>
    </Grid>
  );
}
