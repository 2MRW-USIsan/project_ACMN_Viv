import { CheckChip } from "@/components/atoms/CheckChip";
import { PanelList } from "@/components/molecules/panel/PanelList";
import { PanelListItem } from "@/components/molecules/panel/PanelListItem";
import { SwitchTextFieldPanel } from "./SwitchTextFieldPanel";
import { SwitchChildViewItem, SwitchViewItem } from "@/types/editor/switch";
import { ListItem } from "@mui/material";

interface SwitchPanelListItemProps {
  props: SwitchViewItem;
}
export function SwitchPanelListItem({ props }: SwitchPanelListItemProps) {
  const { data = [], randomize, onAddPanel, onToggleRandomize } = props;
  const randomizeChipProps = {
    label: "Randomize",
    onClick: onToggleRandomize,
    selected: randomize,
  };

  return (
    <PanelListItem props={props}>
      <ListItem sx={{ pl: 2 }}>
        <CheckChip props={randomizeChipProps} />
      </ListItem>
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
