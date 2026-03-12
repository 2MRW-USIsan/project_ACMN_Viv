import { ListItem, Grid, Typography, TextField } from "@mui/material";

interface TextFieldPanelProps {
  props: {
    label: string;
    value: string;
    onChange: (value: string) => void;
  };
}
export function TextFieldPanel({ props }: TextFieldPanelProps) {
  const { label, value, onChange } = props;
  const handleChange = (e: React.BaseSyntheticEvent) => {
    onChange(e.target.value);
  };
  return (
    <ListItem sx={{ display: "flex", gap: 1, width: "100%" }}>
      <Grid container width={"100%"} alignItems={"center"}>
        <Grid size={3}>
          <Typography variant="body2" noWrap title={label}>
            {label}
          </Typography>
        </Grid>
        <Grid size={9}>
          <TextField
            fullWidth
            size="small"
            value={value}
            onChange={handleChange}
          />
        </Grid>
      </Grid>
    </ListItem>
  );
}
