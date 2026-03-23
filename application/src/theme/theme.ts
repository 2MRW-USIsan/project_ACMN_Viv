import { createTheme } from "@mui/material/styles";

const DRAWER_WIDTH = 240;

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
    MuiAppBar: {
      defaultProps: {
        position: "fixed",
      },
      styleOverrides: {
        root: {
          zIndex: 1201,
        },
      },
    },
    MuiDrawer: {
      defaultProps: {
        variant: "persistent",
      },
      styleOverrides: {
        root: {
          width: DRAWER_WIDTH,
          flexShrink: 0,
        },
        paper: {
          width: DRAWER_WIDTH,
          boxSizing: "border-box",
        },
      },
    },
    MuiBackdrop: {
      styleOverrides: {
        root: ({ theme }) => ({
          zIndex: theme.zIndex.drawer - 1,
          backgroundColor: "rgba(0, 0, 0, 0.35)",
        }),
      },
    },
  },
});
