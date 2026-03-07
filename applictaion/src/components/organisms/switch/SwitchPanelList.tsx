import { Grid } from "@mui/material";
import PanelList from "../../molecules/panel/PanelList";
import PanelListItem from "../../molecules/panel/PanelListItem";
import { TextFieldPanel } from "../../atoms/TextFieldPanel";
import { SwitchTextFieldPanel } from "../../molecules/switch/SwitchTextFieldPanel";

type SwitchItemValues = {
  key: string;
  label: string;
  value: string;
  altValue: string;
};

type SwitchItem = {
  id: number;
  values: { key: string; label: string };
  state: boolean;
  data: SwitchChildItem[];
  onAddPanel: () => void;
  onChangeForm: (label: string, value: string) => void;
  onClick: () => void;
  onDelete: () => void;
};

type SwitchChildItem = {
  id: number;
  values: SwitchItemValues;
  onChangeForm: (label: string, value: string) => void;
};

interface SwitchPanelListProps {
  props: {
    onAdd: () => void;
    data: SwitchItem[];
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
  props: SwitchItem;
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
        {data.map((item: SwitchChildItem) => (
          <SwitchTextFieldPanel key={item.id} props={item} />
        ))}
      </PanelList>
    </PanelListItem>
  );
}
