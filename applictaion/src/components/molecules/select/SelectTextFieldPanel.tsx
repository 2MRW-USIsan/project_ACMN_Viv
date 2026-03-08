import type { SelectChildViewItem, SelectListViewItem } from "@/types/select";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import { Grid, IconButton } from "@mui/material";
import { TextFieldPanel } from "../../atoms/TextFieldPanel";
import PanelList from "../panel/PanelList";
import { ListItemTextFieldPanel } from "./ListItemTextFieldPanel";

interface SelectTextFieldPanelProps {
  props: SelectChildViewItem;
}
export function SelectTextFieldPanel({ props }: SelectTextFieldPanelProps) {
  const { values, data, onChangeForm, onAddPanel, onDelete } = props;
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
        <PanelList props={{ label: "list-items:", onAddPanel }}>
          {data.map((item: SelectListViewItem) => (
            <ListItemTextFieldPanel key={item.id} props={item} />
          ))}
        </PanelList>
      </Grid>
    </Grid>
  );
}
