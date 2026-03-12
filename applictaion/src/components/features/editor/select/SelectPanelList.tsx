import type { SelectViewItem } from "@/types/select";
import { PanelList } from "@/components/molecules/panel/PanelList";
import { SelectPanelListItem } from "./SelectPanelListItem";

interface SelectPanelListProps {
  props: { onAdd: () => void; data: SelectViewItem[] };
}

export function SelectPanelList({
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
