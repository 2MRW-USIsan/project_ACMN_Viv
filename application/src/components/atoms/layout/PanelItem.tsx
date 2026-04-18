import { ListItem } from "@mui/material";
import { AlignLayout } from "./AlignLayout";

export type PanelItemType = {
  onClick: () => void;
};
interface PanelItemProps {
  props?: PanelItemType;
  children: React.ReactNode;
}
export function PanelItem({ props, children }: PanelItemProps) {
  return (
    <ListItem
      sx={{ borderBottom: "1px solid #cccccc", paddingBlock: "0" }}
      disablePadding
      disableGutters
      onClick={props?.onClick ?? (() => {})}
    >
      {children}
    </ListItem>
  );
}
