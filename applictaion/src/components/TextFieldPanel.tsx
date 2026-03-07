import { ListItem, Grid, Typography, TextField } from "@mui/material";

interface TextFieldPanel {
  prop: {
    label: string;
    value: string;
    onChange: (value: string) => void;
  };
}
export function TextFieldPanel({ prop }: TextFieldPanel) {
  const { label, value, onChange } = prop;
  const handleChange = (e: React.BaseSyntheticEvent) => {
    onChange(e.target.value);
  };
  return (
    <ListItem sx={{ pl: 4, display: "flex", gap: 1, width: "100%" }}>
      <Grid container width={"100%"} alignItems={"center"}>
        <Grid size={1}>
          <Typography variant="body2">{label}</Typography>
        </Grid>
        <Grid size={5}>
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
