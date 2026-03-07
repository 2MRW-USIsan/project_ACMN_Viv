import { Grid } from "@mui/material";
import PanelList from "../../molecules/panel/PanelList";
import PanelListItem from "../../molecules/panel/PanelListItem";
import { TextFieldPanel } from "../../atoms/TextFieldPanel";

type SelectItem = {
  id: number;
  values: { key: string; label: string };
  state: boolean;
  onChangeForm: (label: string, value: string) => void;
  onClick: () => void;
  onDelete: () => void;
};

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
    </PanelListItem>
  );
}
