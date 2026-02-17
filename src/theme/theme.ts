import { createTheme } from "@mui/material/styles";
import { textColor } from "@utils/color/getContrastRatio";

const baseTheme = createTheme({});

const theme = createTheme(baseTheme, {
  typography: {
    h1: {
      fontWeight: 700,
      fontSize: '2.5rem',
      color: textColor(),
      letterSpacing: '1px',
    },
    h2: {
      fontWeight: 700,
      fontSize: '2rem',
      color: textColor(),
      letterSpacing: '1px',
    },
    h3: {
      fontWeight: 700,
      fontSize: '1.5rem',
      color: textColor(),
      letterSpacing: '1px',
    },
    h4: {
      fontWeight: 700,
      fontSize: '1.25rem',
      color: textColor(),
      letterSpacing: '1px',
    },
    h5: {
      fontWeight: 700,
      fontSize: '1.125rem',
      color: textColor(),
      letterSpacing: '1px',
    },
    h6: {
      fontWeight: 700,
      fontSize: '1rem',
      color: textColor(),
      letterSpacing: '1px',
    },
    body1: {
      fontSize: '1rem',
      color: textColor(),
      lineHeight: 1.6,
    },
    body2: {
      fontSize: '0.9375rem',
      color: textColor(),
      lineHeight: 1.6,
    },
    p: {
      fontSize: '1rem',
      color: textColor(),
      lineHeight: 1.6,
    },
    span: {
      fontSize: '1rem',
      color: textColor(),
    }
  },
});

export default theme;