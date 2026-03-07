"use client";
import { List, ListItemButton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import PanelListItem from "./PanelListItem";
import { CheckChip } from "./CheckChip";

interface PanelListProps {
    props: { onAddPanel: () => void }
    children: React.ReactNode
}
export default function PanelList({
    props: { onAddPanel },
    children
}: PanelListProps) {
    return (
        <List >
            {children}
            <ListItemButton onClick={onAddPanel} sx={{ justifyContent: "center" }}>
                <AddIcon fontSize="small" />
            </ListItemButton>
        </List>
    );
}

