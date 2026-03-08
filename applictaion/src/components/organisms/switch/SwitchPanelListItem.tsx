import { TextFieldPanel } from "@/components/atoms/TextFieldPanel";
import PanelList from "@/components/molecules/panel/PanelList";
import PanelListItem from "@/components/molecules/panel/PanelListItem";
import { SwitchTextFieldPanel } from "@/components/molecules/switch/SwitchTextFieldPanel";
import { SwitchChildViewItem, SwitchViewItem } from "@/types/switch";
import { Grid } from "@mui/material";

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
