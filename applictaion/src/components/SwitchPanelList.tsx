import PanelList from "./PanelList";
import PanelListItem from "./PanelListItem";

interface SwitchPanelListProps {
  props: { onAdd: () => void; data: {
    id: number;
    label: string;
    onClick: () => void;
    onDelete: () => void;
    state: boolean;
  }[] };
}
export function SwitchPanelList({
  props: { onAdd, data },
}: SwitchPanelListProps) {
  return (
    <PanelList props={{ label: "Switch:", onAddPanel: onAdd }}>
      {data.map((item) => (
        <SwitchPanelListItem key={item.id} props={item} />
      ))}
    </PanelList>
  );
}
interface SwitchPanelListItemProps {
  props: {
    id: number;
    label: string;
    onClick: () => void;
    onDelete: () => void;
    state: boolean;
  };
}
export function SwitchPanelListItem({ props: item }: SwitchPanelListItemProps) {
  return (
    <PanelListItem key={item.id} props={item}>
      sd
    </PanelListItem>
  );
}
