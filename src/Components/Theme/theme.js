import { createTheme } from "@mui/material";
import { colors } from "@mui/material";

const theme = createTheme({
  palette: {
    primary: {
      dark: colors.amber[800],
      main: colors.amber[500],
      light: colors.amber[100],
      bg: colors.amber[50],
    },
    secondary: {
      dark: colors.blueGrey[800],
      main: colors.blueGrey[500],
      light: colors.blueGrey[100],
      bg: colors.blueGrey[50],
    },
  },
  typography: {
    fontFamily: "Prosto One, cursive",
  },
});

export default theme;
