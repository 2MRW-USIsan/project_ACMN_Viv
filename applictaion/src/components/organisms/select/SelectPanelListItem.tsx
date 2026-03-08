import PanelList from "@/components/molecules/panel/PanelList";
import PanelListItem from "@/components/molecules/panel/PanelListItem";
import { SelectTextFieldPanel } from "@/components/molecules/select/SelectTextFieldPanel";
import { SelectViewItem, SelectChildViewItem } from "@/types/select";

interface SelectPanelListItemProps {
  props: SelectViewItem;
}
export function SelectPanelListItem({ props }: SelectPanelListItemProps) {
  const { data, onAddPanel } = props;

  return (
    <PanelListItem props={props}>
      <PanelList props={{ label: "items:", onAddPanel }}>
        {data.map((item: SelectChildViewItem) => (
          <SelectTextFieldPanel key={item.id} props={item} />
        ))}
      </PanelList>
    </PanelListItem>
  );
}
