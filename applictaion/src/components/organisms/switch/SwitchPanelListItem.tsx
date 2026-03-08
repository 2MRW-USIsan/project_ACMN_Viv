import PanelList from "@/components/molecules/panel/PanelList";
import PanelListItem from "@/components/molecules/panel/PanelListItem";
import { SwitchTextFieldPanel } from "@/components/molecules/switch/SwitchTextFieldPanel";
import { SwitchChildViewItem, SwitchViewItem } from "@/types/switch";
import { ListItem } from "@mui/material";

interface SwitchPanelListItemProps {
  props: SwitchViewItem;
}
export function SwitchPanelListItem({ props }: SwitchPanelListItemProps) {
  const { data = [], onAddPanel } = props;

  return (
    <PanelListItem props={props}>
      <ListItem sx={{ pl: 2 }}>
        <PanelList props={{ label: "items:", onAddPanel }}>
          {data.map((item: SwitchChildViewItem) => (
            <SwitchTextFieldPanel key={item.id} props={item} />
          ))}
        </PanelList>
      </ListItem>
    </PanelListItem>
  );
}
