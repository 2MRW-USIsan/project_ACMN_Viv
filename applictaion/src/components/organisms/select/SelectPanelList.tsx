import { Grid } from "@mui/material";
import { TextFieldPanel } from "../../atoms/TextFieldPanel";
import PanelList from "../../molecules/panel/PanelList";
import PanelListItem from "../../molecules/panel/PanelListItem";
import { SelectTextFieldPanel } from "@/components/molecules/select/SelectTextFieldPanel";

interface SelectPanelListProps {
  props: { onAdd: () => void; data: SelectItem[] };
}

export default function SelectPanelList({
  props: { onAdd, data },
}: SelectPanelListProps) {
  return (
    <PanelList props={{ label: "Select:", onAddPanel: onAdd }}>
      {data.map((item) => (
        <SelectPanelListItem key={item.id} props={item} />
      ))}
    </PanelList>
  );
}

interface SelectPanelListItemProps {
  props: SelectItem;
}
export function SelectPanelListItem({ props }: SelectPanelListItemProps) {
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
    <PanelListItem props={{ ...props, label: values.label }}>
      <Grid container>
        <Grid size={6}>
          <TextFieldPanel prop={keyFormProps} />
        </Grid>
        <Grid size={6}>
          <TextFieldPanel prop={labelFormProps} />
        </Grid>
      </Grid>
      <PanelList props={{ label: "items:", onAddPanel }}>
        {data.map((item: SelectChildItem) => (
          <SelectTextFieldPanel key={item.id} props={item} />
        ))}
      </PanelList>
    </PanelListItem>
  );
}

type SelectItem = {
  id: number;
  values: { key: string; label: string };
  data: SelectChildItem[];
  state: boolean;
  onAddPanel: () => void;
  onChangeForm: (label: string, value: string) => void;
  onClick: () => void;
  onDelete: () => void;
};
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
type SelectListItemData = {
  id: number;
  values: SelectListItemValues;
  onChangeForm: (label: string, value: string) => void;
};
type SelectListItemValues = {
  prompt: string;
  value: string;
};
