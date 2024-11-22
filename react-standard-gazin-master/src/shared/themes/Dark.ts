import { createTheme } from '@mui/material';

export const DarkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#4a90e2',
      dark: '#3172b5',
      light: '#6bb8ff',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#00bcd4',
      dark: '#008ba3',
      light: '#33c9dc',
      contrastText: '#ffffff',
    },
    background: {
      paper: '#1e2733',
      default: '#121a26',
    },
  },
  typography: {
    allVariants: {
      color: '#ffffff',
    },
    fontFamily: 'Roboto, sans-serif',
  },
});

export default DarkTheme;