import type { SwitchViewItem } from "@/types/switch";
import PanelList from "../../molecules/panel/PanelList";
import { SwitchPanelListItem } from "./SwitchPanelListItem";

interface SwitchPanelListProps {
  props: {
    onAdd: () => void;
    data: SwitchViewItem[];
  };
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
