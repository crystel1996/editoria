import { createTheme } from "@mui/material/styles";
import { textColor } from "@utils/Color/getContrastRatio";

const baseTheme = createTheme({});

const theme = createTheme(baseTheme, {
  typography: {
    h2: {
      fontWeight: 700,
      fontSize: '1.125 rem',
      color: textColor(),
      marginBottom: '2rem',
      letterSpacing: '1px',
    },
  },
});

export default theme;