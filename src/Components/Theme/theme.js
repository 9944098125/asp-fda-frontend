import { createTheme } from "@mui/material";
import { colors } from "@mui/material";

const theme = createTheme({
	palette: {
		primary: {
			dark: colors.teal[800],
			main: colors.teal[500],
			light: colors.teal[100],
			bg: colors.teal[50],
		},
		secondary: {
			dark: colors.grey[800],
			main: colors.grey[500],
			light: colors.grey[100],
			bg: colors.grey[50],
		},
	},
	typography: {
		fontFamily: "Oswald, sans-serif",
	},
});

export default theme;
