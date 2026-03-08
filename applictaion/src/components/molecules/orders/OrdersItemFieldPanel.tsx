import { OrdersItemViewItem } from "@/types/orders";
import { Grid, ListItem, TextField } from "@mui/material";

interface OrdersItemFieldPanelProps {
  props: OrdersItemViewItem;
}
export function OrdersItemFieldPanel({ props }: OrdersItemFieldPanelProps) {
  const { values, disabled, onChangeForm } = props;

  return (
    <ListItem sx={{ width: "100%", pl: 4 }}>
      <Grid container width="100%" spacing={1}>
        <Grid size="grow">
          <TextField
            fullWidth
            size="small"
            label="Value"
            disabled={disabled}
            value={values.value}
            onChange={(e) => onChangeForm("value", e.target.value)}
          />
        </Grid>
        <Grid size="grow">
          <TextField
            fullWidth
            size="small"
            label="Prompt"
            disabled={disabled}
            value={values.prompt}
            onChange={(e) => onChangeForm("prompt", e.target.value)}
          />
        </Grid>
        <Grid size={3}>
          <TextField
            fullWidth
            size="small"
            label="Weight"
            type="number"
            disabled={disabled}
            value={disabled ? "0" : values.weight}
            onChange={(e) => {
              const v = Math.floor(Number(e.target.value));
              onChangeForm("weight", String(v < 0 ? 0 : v));
            }}
            slotProps={{ htmlInput: { step: 1, min: 0 } }}
          />
        </Grid>
      </Grid>
    </ListItem>
  );
}
