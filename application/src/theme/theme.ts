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
    fontSize: 13,
    body1: { fontSize: "0.85rem" },
    body2: { fontSize: "0.80rem" },
    caption: { fontSize: "0.72rem" },
    button: { fontSize: "0.80rem" },
  },
  spacing: 6,
  components: {
    MuiFormControlLabel: {
      styleOverrides: {
        root: {
          margin: 0,
        },
      },
    },
    MuiTextField: {
      defaultProps: {
        size: "small",
        variant: "outlined",
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          height: 22,
        },
      },
    },
    MuiDivider: {
      styleOverrides: {
        root: {
          marginTop: "0.5em",
        },
      },
    },
  },
});
