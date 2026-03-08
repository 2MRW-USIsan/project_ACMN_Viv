import { RadioGroupPanel } from "@/components/atoms/RadioGroupPanel";
import { TextFieldPanel } from "@/components/atoms/TextFieldPanel";
import { OrdersChildViewItem } from "@/types/orders";
import { Grid } from "@mui/material";
import { OrdersItemFieldPanel } from "./OrdersItemFieldPanel";
import PanelList from "../panel/PanelList";

interface OrdersTextFieldPanelProps {
  props: OrdersChildViewItem;
}
export function OrdersTextFieldPanel({ props }: OrdersTextFieldPanelProps) {
  const { values, data, onAddPanel, onChangeForm } = props;

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
      <Grid size={6}>
        <TextFieldPanel prop={keyFormProps} />
      </Grid>
      <Grid size={6}>
        <TextFieldPanel prop={labelFormProps} />
      </Grid>
      <Grid size={12}>
        <RadioGroupPanel prop={typeFormProps} />
      </Grid>
      <Grid size={12}>
        <PanelList props={{ label: "items:", onAddPanel }}>
          {data.map((item) => (
            <OrdersItemFieldPanel key={item.id} props={item} />
          ))}
        </PanelList>
      </Grid>
    </Grid>
  );
}
