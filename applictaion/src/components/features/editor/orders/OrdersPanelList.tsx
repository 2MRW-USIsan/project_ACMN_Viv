import type { OrdersViewItem } from "@/types/editor/orders";
import { PanelList } from "@/components/molecules/panel/PanelList";
import { OrdersPanelListItem } from "./OrdersPanelListItem";

interface OrdersPanelListProps {
  props: { onAdd: () => void; data: OrdersViewItem[] };
}
export function OrdersPanelList({
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
