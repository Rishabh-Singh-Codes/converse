import { createTheme } from "@mui/material";

const theme = createTheme({
  palette: {
    primary: {
      main: "#e4c1f9",
      contrastText: "#003566",
    },
    secondary: {
      main: "#fcf6bd",
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
        },
      },
    },
    MuiContainer: {
      styleOverrides: {
        root: {
          "@media (min-width: 0px)": {
            width: "100%",
          },
          "@media (min-width: 600px)": {
            width: "100%",
          },
          "@media (min-width: 960px)": {
            width: "50%",
          },
        },
      },
    },
    MuiCssBaseline: {
        styleOverrides: {
          body: {
            fontFamily: "Mukta, Arial, sans-serif",
          },
        },
      },
  },
  typography: {
    fontFamily: "Mukta, Arial, sans-serif",
  },
});

export default theme;
