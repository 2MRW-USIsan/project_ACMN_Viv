import { OrdersTextFieldPanel } from "./OrdersTextFieldPanel";
import { PanelList } from "@/components/molecules/panel/PanelList";
import { PanelListItem } from "@/components/molecules/panel/PanelListItem";
import { OrdersChildViewItem, OrdersViewItem } from "@/types/orders";
import { ListItem } from "@mui/material";

interface OrdersPanelListItemProps {
  props: OrdersViewItem;
}
export function OrdersPanelListItem({ props }: OrdersPanelListItemProps) {
  const { data, onAddPanel } = props;

  return (
    <PanelListItem props={props}>
      <ListItem sx={{ pl: 2 }}>
        <PanelList props={{ label: "items:", onAddPanel }}>
          {data.map((item: OrdersChildViewItem) => (
            <OrdersTextFieldPanel key={item.id} props={item} />
          ))}
        </PanelList>
      </ListItem>
    </PanelListItem>
  );
}
