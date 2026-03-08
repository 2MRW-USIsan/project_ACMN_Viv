import { OrdersItemViewItem } from "@/types/orders";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import { Grid, IconButton, ListItem, TextField } from "@mui/material";
import PanelList from "../panel/PanelList";

interface OrdersItemFieldPanelProps {
  props: OrdersItemViewItem;
}
export function OrdersItemFieldPanel({ props }: OrdersItemFieldPanelProps) {
  const {
    values,
    disabled,
    hidePrompt,
    complexData,
    onAddComplexPanel,
    onChangeForm,
    onDelete,
  } = props;

  return (
    <ListItem sx={{ width: "100%", pl: 4, display: "block" }}>
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
        {!hidePrompt && (
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
        )}
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
        <Grid size="auto" sx={{ display: "flex", alignItems: "center" }}>
          <IconButton size="small" onClick={onDelete}>
            <RemoveCircleOutlineIcon fontSize="small" />
          </IconButton>
        </Grid>
      </Grid>
      {hidePrompt && (
        <PanelList
          props={{ label: "complex items:", onAddPanel: onAddComplexPanel }}
        >
          {complexData.map((complexItem) => (
            <ListItem key={complexItem.id} sx={{ width: "100%", pl: 4 }}>
              <Grid container width="100%" spacing={1}>
                <Grid size="grow">
                  <TextField
                    fullWidth
                    size="small"
                    label="Value"
                    value={complexItem.values.value}
                    onChange={(e) =>
                      complexItem.onChangeForm("value", e.target.value)
                    }
                  />
                </Grid>
                <Grid size="grow">
                  <TextField
                    fullWidth
                    size="small"
                    label="Prompt"
                    value={complexItem.values.prompt}
                    onChange={(e) =>
                      complexItem.onChangeForm("prompt", e.target.value)
                    }
                  />
                </Grid>
                <Grid size={3}>
                  <TextField
                    fullWidth
                    size="small"
                    label="Weight"
                    type="number"
                    value={complexItem.values.weight}
                    onChange={(e) => {
                      const v = Math.floor(Number(e.target.value));
                      complexItem.onChangeForm("weight", String(v < 0 ? 0 : v));
                    }}
                    slotProps={{ htmlInput: { step: 1, min: 0 } }}
                  />
                </Grid>
                <Grid
                  size="auto"
                  sx={{ display: "flex", alignItems: "center" }}
                >
                  <IconButton size="small" onClick={complexItem.onDelete}>
                    <RemoveCircleOutlineIcon fontSize="small" />
                  </IconButton>
                </Grid>
              </Grid>
            </ListItem>
          ))}
        </PanelList>
      )}
    </ListItem>
  );
}
