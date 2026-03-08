import { OrdersTextFieldPanel } from "@/components/molecules/orders/OrdersTextFieldPanel";
import PanelList from "@/components/molecules/panel/PanelList";
import PanelListItem from "@/components/molecules/panel/PanelListItem";
import { OrdersChildViewItem, OrdersViewItem } from "@/types/orders";

interface OrdersPanelListItemProps {
  props: OrdersViewItem;
}
export function OrdersPanelListItem({ props }: OrdersPanelListItemProps) {
  const { data, onAddPanel } = props;

  return (
    <PanelListItem props={props}>
      <PanelList props={{ label: "items:", onAddPanel }}>
        {data.map((item: OrdersChildViewItem) => (
          <OrdersTextFieldPanel key={item.id} props={item} />
        ))}
      </PanelList>
    </PanelListItem>
  );
}
