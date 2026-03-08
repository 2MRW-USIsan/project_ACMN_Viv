import { Grid } from "@mui/material";
import PanelList from "../../molecules/panel/PanelList";
import PanelListItem from "../../molecules/panel/PanelListItem";
import { TextFieldPanel } from "../../atoms/TextFieldPanel";
import { SwitchTextFieldPanel } from "../../molecules/switch/SwitchTextFieldPanel";
import type { SwitchViewItem, SwitchChildViewItem } from "@/types/switch";

interface SwitchPanelListProps {
  props: {
    onAdd: () => void;
    data: SwitchViewItem[];
  };
}
export function SwitchPanelList({
  props: { onAdd, data },
}: SwitchPanelListProps) {
  return (
    <PanelList props={{ label: "Switch:", onAddPanel: onAdd }}>
      {data.map((item) => (
        <SwitchPanelListItem key={item.id} props={item} />
      ))}
    </PanelList>
  );
}
interface SwitchPanelListItemProps {
  props: SwitchViewItem;
}
export function SwitchPanelListItem({ props }: SwitchPanelListItemProps) {
  const { values, data = [], onAddPanel, onChangeForm } = props;

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
        {data.map((item: SwitchChildViewItem) => (
          <SwitchTextFieldPanel key={item.id} props={item} />
        ))}
      </PanelList>
    </PanelListItem>
  );
}
