import { CheckChip } from "@/components/atoms/CheckChip";
import { PanelList } from "@/components/molecules/panel/PanelList";
import { PanelListItem } from "@/components/molecules/panel/PanelListItem";
import { SelectTextFieldPanel } from "@/components/molecules/select/SelectTextFieldPanel";
import { SelectChildViewItem, SelectViewItem } from "@/types/select";
import { ListItem } from "@mui/material";

interface SelectPanelListItemProps {
  props: SelectViewItem;
}
export function SelectPanelListItem({ props }: SelectPanelListItemProps) {
  const { data, shuffle, onAddPanel, onToggleShuffle } = props;
  const shuffleChipProps = {
    label: "Shuffle",
    onClick: onToggleShuffle,
    selected: shuffle,
  };

  return (
    <PanelListItem props={props}>
      <ListItem sx={{ pl: 2 }}>
        <CheckChip props={shuffleChipProps} />
      </ListItem>
      <ListItem sx={{ pl: 2 }}>
        <PanelList props={{ label: "items:", onAddPanel }}>
          {data.map((item: SelectChildViewItem) => (
            <SelectTextFieldPanel key={item.id} props={item} />
          ))}
        </PanelList>
      </ListItem>
    </PanelListItem>
  );
}
