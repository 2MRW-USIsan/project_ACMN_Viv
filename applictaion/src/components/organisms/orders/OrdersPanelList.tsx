import PanelList from "../../molecules/panel/PanelList";

interface OrdersPanelListProps {
  props: { onAdd: () => void; data: any[] };
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
  props: any;
}
export function OrdersPanelListItem({ props: item }: OrdersPanelListItemProps) {
  return <></>;
}
