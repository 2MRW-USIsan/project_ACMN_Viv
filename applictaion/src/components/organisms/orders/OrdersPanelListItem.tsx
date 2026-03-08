import { TextFieldPanel } from "@/components/atoms/TextFieldPanel";
import PanelListItem from "@/components/molecules/panel/PanelListItem";
import { OrdersViewItem } from "@/types/orders";
import { Grid } from "@mui/material";

interface OrdersPanelListItemProps {
  props: OrdersViewItem;
}
export function OrdersPanelListItem({ props }: OrdersPanelListItemProps) {
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
