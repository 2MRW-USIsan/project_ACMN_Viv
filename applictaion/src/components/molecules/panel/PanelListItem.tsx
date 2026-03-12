import { DeleteIconButton } from "../../atoms/DeleteIconButton";
import { ExpandIconButton } from "../../atoms/ExpandIconButton";
import { InputPanel } from "../../atoms/InputPanel";
import { Collapse, Grid, List, ListItem } from "@mui/material";

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
            <InputPanel
              props={{
                label: "Key",
                value: values.key,
                fullWidth: true,
                onChange: (v) => onChangeForm("key", v),
              }}
            />
          </Grid>
          <Grid size="grow">
            <InputPanel
              props={{
                label: "Label",
                value: values.label,
                fullWidth: true,
                onChange: (v) => onChangeForm("label", v),
              }}
            />
          </Grid>
        </Grid>
        <DeleteIconButton props={{ onClick: onDelete }} />
        <ExpandIconButton props={{ expanded: state, onClick }} />
      </ListItem>
      <Collapse in={state} orientation="vertical" timeout="auto" unmountOnExit>
        {children}
      </Collapse>
    </List>
  );
}
