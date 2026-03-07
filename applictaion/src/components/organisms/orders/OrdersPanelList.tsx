import { Grid } from "@mui/material";
import PanelList from "../../molecules/panel/PanelList";
import PanelListItem from "../../molecules/panel/PanelListItem";
import { TextFieldPanel } from "../../atoms/TextFieldPanel";

type OrdersItem = {
  id: number;
  values: { key: string; label: string };
  state: boolean;
  onChangeForm: (label: string, value: string) => void;
  onClick: () => void;
  onDelete: () => void;
};

interface OrdersPanelListProps {
  props: { onAdd: () => void; data: OrdersItem[] };
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
  props: OrdersItem;
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
