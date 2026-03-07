import PanelList from "./PanelList";

interface SelectPanelListProps {
  props: { onAdd: () => void; data: any[] };
}

export default function SelectPanelList({
  props: { onAdd, data },
}: SelectPanelListProps) {
  return (
    <PanelList props={{ label: "Select:", onAddPanel: onAdd }}>
      {data.map((item) => (
        <SelectPanelListItem key={item.id} props={item} />
      ))}
    </PanelList>
  );
}
interface SelectPanelListItemProps {
  props: any;
}
export function SelectPanelListItem({ props: item }: SelectPanelListItemProps) {
  return <></>;
}
