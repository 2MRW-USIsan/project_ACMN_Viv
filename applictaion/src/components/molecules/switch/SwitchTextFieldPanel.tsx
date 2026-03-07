import { Grid } from "@mui/material";
import { TextFieldPanel } from "../../atoms/TextFieldPanel";
type SwitchItemValues = {
  key: string;
  label: string;
  value: string;
  altValue: string;
};

interface SwitchTextFieldPanelProps {
  props: {
    id: number;
    values: SwitchItemValues;
    onChangeForm: (label: string, value: string) => void;
  };
}
export function SwitchTextFieldPanel({ props }: SwitchTextFieldPanelProps) {
  const { values, onChangeForm } = props;
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
    <Grid container>
      <Grid size={2}>
        <TextFieldPanel prop={keyFormProps} />
      </Grid>
      <Grid size={2}>
        <TextFieldPanel prop={labelFormProps} />
      </Grid>
      <Grid size={4}>
        <TextFieldPanel prop={valueFormProps} />
      </Grid>
      <Grid size={4}>
        <TextFieldPanel prop={altValueFormProps} />
      </Grid>
    </Grid>
  );
}
