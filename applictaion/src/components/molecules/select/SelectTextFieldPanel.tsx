import { Grid } from "@mui/material";
import { TextFieldPanel } from "../../atoms/TextFieldPanel";
import PanelList from "../panel/PanelList";
type SelectItemValues = {
  key: string;
  label: string;
};
type SelectChildItem = {
  id: number;
  values: SelectItemValues;
  data: SelectListItemData[];
  onAddPanel: () => void;
  onChangeForm: (label: string, value: string) => void;
};
interface SelectTextFieldPanelProps {
  props: SelectChildItem;
}
export function SelectTextFieldPanel({ props }: SelectTextFieldPanelProps) {
  const { values, data, onChangeForm, onAddPanel } = props;
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
  return (
    <Grid container>
      <Grid size={2}>
        <TextFieldPanel prop={keyFormProps} />
      </Grid>
      <Grid size={2}>
        <TextFieldPanel prop={labelFormProps} />
      </Grid>
      <PanelList props={{ label: "list-items:", onAddPanel }}>
        {data.map((item: SelectListItemData) => (
          <ListItemTextFieldPanel key={item.id} props={item} />
        ))}
      </PanelList>
    </Grid>
  );
}

type SelectListItemData = {
  id: number;
  values: SelectListItemValues;
  onChangeForm: (label: string, value: string) => void;
};
type SelectListItemValues = {
  prompt: string;
  value: string;
};
interface ListItemTextFieldPanelProps {
  props: SelectListItemData;
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
    <Grid container>
      <Grid size={6}>
        <TextFieldPanel prop={valueFormProps} />
      </Grid>
      <Grid size={6}>
        <TextFieldPanel prop={promptFormProps} />
      </Grid>
    </Grid>
  );
}
