import { TextFieldPanel } from "@/components/atoms/TextFieldPanel";
import PanelList from "@/components/molecules/panel/PanelList";
import PanelListItem from "@/components/molecules/panel/PanelListItem";
import { SelectTextFieldPanel } from "@/components/molecules/select/SelectTextFieldPanel";
import { SelectViewItem, SelectChildViewItem } from "@/types/select";
import { Grid } from "@mui/material";

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
