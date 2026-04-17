import { List } from "@mui/material";

interface PanelListProps {
  children: React.ReactNode;
}
export function PanelList({ children }: PanelListProps) {
  return <List disablePadding>{children}</List>;
}
