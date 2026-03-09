import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import {
  Collapse,
  Grid,
  IconButton,
  List,
  ListItem,
  TextField,
} from "@mui/material";

interface PanelListItemProps {
  props: {
    id: number;
    values: { key: string; label: string };
    onChangeForm: (label: string, value: string) => void;
    onClick: () => void;
    onDelete: () => void;
    state: boolean;
  };
  children: React.ReactNode;
}
export function PanelListItem({
  props: { id, values, onChangeForm, onClick, onDelete, state },
  children,
}: PanelListItemProps) {
  return (
    <List key={id} component="div" disablePadding sx={{ pl: 4 }}>
      <ListItem sx={{ pl: 2, pr: 1, gap: 1 }}>
        <Grid container spacing={1} sx={{ flex: 1 }} alignItems="center">
          <Grid size="grow">
            <TextField
              fullWidth
              size="small"
              label="Key"
              value={values.key}
              onChange={(e) => onChangeForm("key", e.target.value)}
            />
          </Grid>
          <Grid size="grow">
            <TextField
              fullWidth
              size="small"
              label="Label"
              value={values.label}
              onChange={(e) => onChangeForm("label", e.target.value)}
            />
          </Grid>
        </Grid>
        <IconButton size="small" onClick={onDelete}>
          <DeleteOutlineIcon fontSize="small" />
        </IconButton>
        <IconButton size="small" onClick={onClick}>
          {state ? <ExpandLess /> : <ExpandMore />}
        </IconButton>
      </ListItem>
      <Collapse in={state} orientation="vertical" timeout="auto" unmountOnExit>
        {children}
      </Collapse>
    </List>
  );
}
