import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#2563EB',
      light: '#DBEAFE',
      dark: '#1D4ED8',
    },

    success: {
      main: '#16A34A',
      light: '#DCFCE7',
    },

    error: {
      main: '#DC2626',
      light: '#FEE2E2',
    },

    warning: {
      main: '#D97706',
      light: '#FEF3C7',
    },

    background: {
      default: '#F7F9FC',
      paper: '#FFFFFF',
    },

    text: {
      primary: '#1E293B',
      secondary: '#64748B',
    },

    divider: '#E2E8F0',
  },

  shape: {
    borderRadius: 8,
  },

  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  },

  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 600,
        },
      },
    },

    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
        },
      },
    },
  },
});

export default theme;
