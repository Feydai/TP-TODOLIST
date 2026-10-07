import { Box } from '@mui/material';
import { Outlet } from 'react-router-dom';

import Header from './Header.jsx';

export default function Layout() {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        bgcolor: 'background.default',
      }}
    >
      <Header />

      <Box
        component="main"
        sx={{
          minHeight: 'calc(100vh - 64px)',
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
}
