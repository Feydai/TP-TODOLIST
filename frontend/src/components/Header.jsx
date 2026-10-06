import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Avatar,
  Button,
  IconButton,
} from '@mui/material';

import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import LogoutIcon from '@mui/icons-material/Logout';

import { useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

const Header = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const initial = user?.email?.charAt(0).toUpperCase() || '';

  return (
    <AppBar
      position="static"
      elevation={2}
      sx={{
        bgcolor: 'primary.main',
      }}
    >
      <Toolbar
        sx={{
          minHeight: { xs: 72, md: 72 },
          px: { xs: 3, md: 8 },
        }}
      >
        {/* Logo */}
        <Box
          onClick={() => navigate('/tasks')}
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1.5,
            cursor: 'pointer',
          }}
        >
          <CheckCircleIcon
            sx={{
              fontSize: { xs: 36, md: 30 },
            }}
          />

          <Typography
            variant="h6"
            sx={{
              fontWeight: 700,
              fontSize: { xs: '1.8rem', md: '1.25rem' },
            }}
          >
            TaskFlow
          </Typography>
        </Box>

        {/* pousse le reste à droite */}
        <Box sx={{ flexGrow: 1 }} />

        {/* Desktop */}
        <Box
          sx={{
            display: { xs: 'none', md: 'flex' },
            alignItems: 'center',
            gap: 2,
          }}
        >
          <Typography fontWeight={500}>
            {user?.email}
          </Typography>

          <Avatar
            sx={{
              bgcolor: 'primary.dark',
              width: 40,
              height: 40,
            }}
          >
            {initial}
          </Avatar>

          <Button
            color="inherit"
            startIcon={<LogoutIcon />}
            onClick={handleLogout}
            sx={{
              fontWeight: 600,
            }}
          >
            Déconnexion
          </Button>
        </Box>

        {/* Mobile */}
        <IconButton
          color="inherit"
          onClick={handleLogout}
          aria-label="Déconnexion"
          sx={{
            display: { xs: 'flex', md: 'none' },
          }}
        >
          <LogoutIcon sx={{ fontSize: 32 }} />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default Header;