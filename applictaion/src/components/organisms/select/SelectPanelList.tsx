import { Grid } from "@mui/material";
import { TextFieldPanel } from "../../atoms/TextFieldPanel";
import PanelList from "../../molecules/panel/PanelList";
import PanelListItem from "../../molecules/panel/PanelListItem";
import { SelectTextFieldPanel } from "@/components/molecules/select/SelectTextFieldPanel";
import type { SelectViewItem, SelectChildViewItem } from "@/types/select";

interface SelectPanelListProps {
  props: { onAdd: () => void; data: SelectViewItem[] };
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
  props: SelectViewItem;
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
        {data.map((item: SelectChildViewItem) => (
          <SelectTextFieldPanel key={item.id} props={item} />
        ))}
      </PanelList>
    </PanelListItem>
  );
}
