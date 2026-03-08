import { RadioGroupPanel } from "@/components/atoms/RadioGroupPanel";
import { TextFieldPanel } from "@/components/atoms/TextFieldPanel";
import { OrdersChildViewItem } from "@/types/orders";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import { Grid, IconButton, Typography } from "@mui/material";
import { OrdersItemFieldPanel } from "./OrdersItemFieldPanel";
import PanelList from "../panel/PanelList";

interface OrdersTextFieldPanelProps {
  props: OrdersChildViewItem;
}
export function OrdersTextFieldPanel({ props }: OrdersTextFieldPanelProps) {
  const { values, data, onAddPanel, onChangeForm, onDelete } = props;

  const keyFormProps = {
    label: "Key:",
    value: values.key,
    onChange: (value: string) => onChangeForm("key", value),
  };
  const labelFormProps = {
    label: "Label:",
    value: values.label,
    onChange: (value: string) => onChangeForm("label", value),
  };
  const typeOptions = ["Random", "Complex", "Scripts", "Color"];
  const typeFormProps = {
    value: values.type,
    options: typeOptions,
    onChange: (value: string) => onChangeForm("type", value),
  };

  return (
    <Grid container paddingLeft={4}>
      <Grid size="grow">
        <TextFieldPanel prop={keyFormProps} />
      </Grid>
      <Grid size="grow">
        <TextFieldPanel prop={labelFormProps} />
      </Grid>
      <Grid size="auto" sx={{ display: "flex", alignItems: "center" }}>
        <IconButton size="small" onClick={onDelete}>
          <RemoveCircleOutlineIcon fontSize="small" />
        </IconButton>
      </Grid>
      <Grid size={12}>
        <RadioGroupPanel prop={typeFormProps} />
      </Grid>
      {values.type === "Scripts" ? (
        <Grid size={12} sx={{ pl: 1 }}>
          <Typography variant="caption" color="text.secondary">
            Request: Intend to include an appropriate text.
          </Typography>
        </Grid>
      ) : values.type === "Color" ? (
        <Grid size={12} sx={{ pl: 1 }}>
          <Typography variant="caption" color="text.secondary">
            Request: Intend to include appropriate color information [#RRGGBB].
          </Typography>
        </Grid>
      ) : (
        <>
          <Grid size={12}>
            <PanelList props={{ label: "items:", onAddPanel }}>
              {data.map((item) => (
                <OrdersItemFieldPanel key={item.id} props={item} />
              ))}
            </PanelList>
          </Grid>
        </>
      )}
    </Grid>
  );
}
