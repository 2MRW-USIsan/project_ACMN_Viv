import { RemoveIconButton } from "@/components/atoms/RemoveIconButton";
import { OrdersItemViewItem } from "@/types/editor/orders";
import { Grid, ListItem } from "@mui/material";
import { InputPanel } from "@/components/atoms/InputPanel";
import { PanelList } from "@/components/molecules/panel/PanelList";

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
          <InputPanel
            props={{
              label: "Value",
              value: values.value,
              fullWidth: true,
              disabled,
              onChange: (v) => onChangeForm("value", v),
            }}
          />
        </Grid>
        {!hidePrompt && (
          <Grid size="grow">
            <InputPanel
              props={{
                label: "Prompt",
                value: values.prompt,
                fullWidth: true,
                disabled,
                onChange: (v) => onChangeForm("prompt", v),
              }}
            />
          </Grid>
        )}
        <Grid size={3}>
          <InputPanel
            props={{
              label: "Weight",
              value: disabled ? "0" : values.weight,
              fullWidth: true,
              disabled,
              type: "number",
              step: 1,
              min: 0,
              onChange: (v) => {
                const n = Math.floor(Number(v));
                onChangeForm("weight", String(n < 0 ? 0 : n));
              },
            }}
          />
        </Grid>
        <Grid size="auto" sx={{ display: "flex", alignItems: "center" }}>
          <RemoveIconButton props={{ onClick: onDelete }} />
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
                  <InputPanel
                    props={{
                      label: "Value",
                      value: complexItem.values.value,
                      fullWidth: true,
                      onChange: (v) => complexItem.onChangeForm("value", v),
                    }}
                  />
                </Grid>
                <Grid size="grow">
                  <InputPanel
                    props={{
                      label: "Prompt",
                      value: complexItem.values.prompt,
                      fullWidth: true,
                      onChange: (v) => complexItem.onChangeForm("prompt", v),
                    }}
                  />
                </Grid>
                <Grid size={3}>
                  <InputPanel
                    props={{
                      label: "Weight",
                      value: complexItem.values.weight,
                      fullWidth: true,
                      type: "number",
                      step: 1,
                      min: 0,
                      onChange: (v) => {
                        const n = Math.floor(Number(v));
                        complexItem.onChangeForm("weight", String(n < 0 ? 0 : n));
                      },
                    }}
                  />
                </Grid>
                <Grid
                  size="auto"
                  sx={{ display: "flex", alignItems: "center" }}
                >
                  <RemoveIconButton props={{ onClick: complexItem.onDelete }} />
                </Grid>
              </Grid>
            </ListItem>
          ))}
        </PanelList>
      )}
    </ListItem>
  );
}
