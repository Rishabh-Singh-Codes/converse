import { createTheme } from "@mui/material";

const theme = createTheme({
    palette: {
        primary: {
            main: "#ff99c8",
            contrastText: "#003566"
        },
        secondary: {
            main: "#e4c1f9",
        }
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    textTransform: "none"
                }
            }
        }
    },
    typography: {
        fontFamily: 'Mukta, Arial, sans-serif',
    },
})

export default theme;