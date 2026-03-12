import { RadioGroupPanel } from "@/components/atoms/RadioGroupPanel";
import { RemoveIconButton } from "@/components/atoms/RemoveIconButton";
import { TextFieldPanel } from "@/components/atoms/TextFieldPanel";
import { OrdersChildViewItem } from "@/types/orders";
import { Grid, Typography } from "@mui/material";
import { OrdersItemFieldPanel } from "./OrdersItemFieldPanel";
import { PanelList } from "../panel/PanelList";

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

  const typeContentMap: Record<string, React.ReactNode> = {
    Scripts: (
      <Grid size={12} sx={{ pl: 1 }}>
        <Typography variant="caption" color="text.secondary">
          Request: Intend to include an appropriate text.
        </Typography>
      </Grid>
    ),
    Color: (
      <Grid size={12} sx={{ pl: 1 }}>
        <Typography variant="caption" color="text.secondary">
          Request: Intend to include appropriate color information [#RRGGBB].
        </Typography>
      </Grid>
    ),
  };

  const typeContent = typeContentMap[values.type] ?? (
    <Grid size={12} paddingInline={2}>
      <PanelList props={{ label: "items:", onAddPanel }}>
        {data.map((item) => (
          <OrdersItemFieldPanel key={item.id} props={item} />
        ))}
      </PanelList>
    </Grid>
  );

  return (
    <Grid container paddingLeft={4}>
      <Grid size="grow">
        <TextFieldPanel props={keyFormProps} />
      </Grid>
      <Grid size="grow">
        <TextFieldPanel props={labelFormProps} />
      </Grid>
      <Grid size="auto" sx={{ display: "flex", alignItems: "center" }}>
        <RemoveIconButton props={{ onClick: onDelete }} />
      </Grid>
      <Grid size={12} paddingLeft={2}>
        <RadioGroupPanel props={typeFormProps} />
      </Grid>
      {typeContent}
    </Grid>
  );
}
