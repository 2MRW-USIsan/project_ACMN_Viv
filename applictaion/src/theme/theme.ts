import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#1565c0",
      light: "#5e92f3",
      dark: "#003c8f",
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#00695c",
      light: "#439889",
      dark: "#003d33",
      contrastText: "#ffffff",
    },
    background: {
      default: "#f0f4f8",
      paper: "#ffffff",
    },
    text: {
      primary: "#1a237e",
      secondary: "#37474f",
      disabled: "#90a4ae",
    },
    divider: "#cfd8dc",
    success: {
      main: "#2e7d32",
    },
    error: {
      main: "#c62828",
    },
  },
  typography: {
    fontSize: 13,
    body1: { fontSize: "0.85rem" },
    body2: { fontSize: "0.78rem" },
    subtitle1: { fontSize: "0.85rem", fontWeight: 600 },
    subtitle2: { fontSize: "0.78rem", fontWeight: 600 },
    caption: { fontSize: "0.72rem" },
  },
  spacing: 6,
  shape: {
    borderRadius: 6,
  },
  components: {
    MuiListItem: {
      styleOverrides: {
        root: {
          paddingTop: 2,
          paddingBottom: 2,
        },
      },
    },
    MuiListItemButton: {
      styleOverrides: {
        root: {
          paddingTop: 4,
          paddingBottom: 4,
        },
      },
    },
    MuiTextField: {
      defaultProps: {
        size: "small",
        variant: "outlined",
      },
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          fontSize: "0.82rem",
        },
      },
    },
    MuiChip: {
      defaultProps: {
        size: "small",
      },
      styleOverrides: {
        root: {
          fontSize: "0.75rem",
          height: 22,
        },
      },
    },
    MuiList: {
      styleOverrides: {
        root: {
          paddingTop: 2,
          paddingBottom: 2,
        },
      },
    },
    MuiButton: {
      defaultProps: {
        size: "small",
      },
      styleOverrides: {
        root: {
          textTransform: "none",
          fontSize: "0.82rem",
        },
      },
    },
    MuiIconButton: {
      defaultProps: {
        size: "small",
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: "none",
        },
      },
    },
  },
});

export default theme;
