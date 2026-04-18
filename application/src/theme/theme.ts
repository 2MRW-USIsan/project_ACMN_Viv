import { createTheme } from "@mui/material/styles";

export const acmnTheme = createTheme({
  palette: {
    primary: {
      main: "#1976d2",
    },
    secondary: {
      main: "#00897b",
    },
  },
  typography: {
    h1: { fontSize: "1.25rem", fontWeight: "bold" },
    h2: { fontSize: "1.10rem", fontWeight: "bold" },
    h3: { fontSize: "0.85rem", fontWeight: "bold" },
    h4: { fontSize: "0.85rem", fontWeight: "normal" },
    h5: { fontSize: "0.75rem", fontWeight: "normal" },
    h6: { fontSize: "0.65rem", fontWeight: "normal", fontStyle: "italic" },
    fontSize: 12, //BUTTON
  },
  components: {
    MuiButton: {
      defaultProps: { size: "small" },
      styleOverrides: {
        root: { height: "1.25rem" },
      },
    },
    MuiGrid: {
      defaultProps: { rowSpacing: 0.5 },
      styleOverrides: { root: { gap: "0.5rem", alignItems: "center" } },
    },
    MuiTextField: {
      defaultProps: {
        size: "small",
        variant: "outlined",
        slotProps: {
          htmlInput: { sx: { paddingY: 0, paddingLeft: "0.5rem" } },
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: { root: { padding: 0, paddingTop: "0.25rem" } },
    },
    MuiChip: { styleOverrides: { root: { height: 22 } } },
  },
});
