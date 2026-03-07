import { Divider, Grid, List, ListItem } from "@mui/material";
import { CheckChip } from "../../atoms/CheckChip";
import OrdersPanelList from "../orders/OrdersPanelList";
import PanelListItem from "../../molecules/panel/PanelListItem";
import SelectPanelList from "../select/SelectPanelList";
import { SwitchPanelList } from "../switch/SwitchPanelList";
import { TextFieldPanel } from "../../atoms/TextFieldPanel";

type OrdersItem = {
  id: number;
  values: { key: string; label: string };
  state: boolean;
  onChangeForm: (label: string, value: string) => void;
  onClick: () => void;
  onDelete: () => void;
};

type SelectItem = {
  id: number;
  values: { key: string; label: string };
  state: boolean;
  onChangeForm: (label: string, value: string) => void;
  onClick: () => void;
  onDelete: () => void;
};

interface BlocPanelListItemProps {
  props: {
    id: number;
    label: string;
    state: boolean;
    onChange: (label: string, value: string) => void;
    onClick: () => void;
    onDelete: () => void;
    value: {
      key: string;
      label: string;
    };
    orders: {
      selected: boolean;
      onClick: () => void;
      onAdd: () => void;
      data: OrdersItem[];
    };
    select: {
      selected: boolean;
      onClick: () => void;
      onAdd: () => void;
      data: SelectItem[];
    };
    switch: {
      selected: boolean;
      onClick: () => void;
      onAdd: () => void;
      data: SwitchItem[];
    };
  };
}
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
type SwitchItemValues = {
  key: string;
  label: string;
  value: string;
  altValue: string;
};
export function BlocPanelListItem({ props: item }: BlocPanelListItemProps) {
  const handlerChange = (label: string, value: string) => {
    item.onChange(label, value);
  };

  const keyFormProps = {
    label: "Key:",
    value: item.value.key,
    onChange: (value: string) => handlerChange("key", value),
  };
  const labelFormProps = {
    label: "Label:",
    value: item.value.label,
    onChange: (value: string) => handlerChange("label", value),
  };
  const ordersChipProps = {
    label: "Orders",
    selected: item.orders.selected,
    onClick: item.orders.onClick,
  };
  const selectChipProps = {
    label: "Select",
    selected: item.select.selected,
    onClick: item.select.onClick,
  };
  const switchChipProps = {
    label: "Switch",
    selected: item.switch.selected,
    onClick: item.switch.onClick,
  };
  const ordersPanelProps = { onAdd: item.orders.onAdd, data: item.orders.data };
  const selectPanelProps = { onAdd: item.select.onAdd, data: item.select.data };
  const switchPanelProps = { onAdd: item.switch.onAdd, data: item.switch.data };

  return (
    <PanelListItem key={item.id} props={item}>
      <Grid container>
        <Grid size={6}>
          <TextFieldPanel prop={keyFormProps} />
        </Grid>
        <Grid size={6}>
          <TextFieldPanel prop={labelFormProps} />
        </Grid>
      </Grid>
      <ListItem sx={{ pl: 4, display: "flex", gap: 1 }}>
        <CheckChip props={ordersChipProps} />
        <CheckChip props={selectChipProps} />
        <CheckChip props={switchChipProps} />
      </ListItem>
      <ListItem sx={{ pl: 4 }}>
        <Divider sx={{ width: "100%" }} flexItem />
      </ListItem>
      <List sx={{ pl: 4 }}>
        {item.orders.selected && <OrdersPanelList props={ordersPanelProps} />}
        {item.select.selected && <SelectPanelList props={selectPanelProps} />}
        {item.switch.selected && <SwitchPanelList props={switchPanelProps} />}
      </List>
    </PanelListItem>
  );
}
