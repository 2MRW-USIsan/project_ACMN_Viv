import { Grid } from "@mui/material";
import PanelList from "../../molecules/panel/PanelList";
import PanelListItem from "../../molecules/panel/PanelListItem";
import { TextFieldPanel } from "../../atoms/TextFieldPanel";
import type { OrdersViewItem } from "@/types/orders";

interface OrdersPanelListProps {
  props: { onAdd: () => void; data: OrdersViewItem[] };
}
export default function OrdersPanelList({
  props: { onAdd, data },
}: OrdersPanelListProps) {
  return (
    <PanelList props={{ label: "Orders:", onAddPanel: onAdd }}>
      {data.map((item) => (
        <OrdersPanelListItem key={item.id} props={item} />
      ))}
    </PanelList>
  );
}

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
