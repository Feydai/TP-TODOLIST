import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ErrorMessage from '../../components/ErrorMessage.jsx';
import {
  Box,
  Button,
  Divider,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
  Alert,
} from '@mui/material';
import AppButton from '../../components/common/AppButton.jsx';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import LockIcon from '@mui/icons-material/Lock';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

import useAuth from '../../hooks/useAuth.js';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      setError('');

      await login(email, password);

      navigate('/dashboard');
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
      }}
    >
      {/* Partie gauche */}
      <Box
        sx={{
          width: '48%',
          bgcolor: 'primary.main',
          color: 'white',
          display: { xs: 'none', md: 'flex' },
          flexDirection: 'column',
          px: 8,
          py: 6,
        }}
      >
        {/* Logo */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 2,
          }}
        >
          <CheckCircleIcon sx={{ fontSize: 34 }} />

          <Typography variant="h5" sx={{ fontWeight: 700 }}>
            TaskFlow
          </Typography>
        </Box>

        {/* Contenu */}
        <Box
          sx={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            maxWidth: 600,
          }}
        >
          <Typography
            variant="h3"
            component="h1"
            sx={{
              fontWeight: 400,
              mb: 4,
              lineHeight: 1.2,
            }}
          >
            Organisez vos tâches,
            <br />
            suivez leur avancement.
          </Typography>

          <Typography
            sx={{
              fontSize: 18,
              lineHeight: 1.7,
              mb: 4,
            }}
          >
            Créez, consultez et mettez à jour vos tâches personnelles. Elles
            restent privées : elles ne sont visibles que depuis votre compte.
          </Typography>

          <Feature
            icon={<AutorenewIcon />}
            text="Statuts « À faire », « En cours », « Terminée »"
          />

          <Feature
            icon={<CalendarMonthIcon />}
            text="Échéance et description facultatives"
          />

          <Feature
            icon={<LockIcon />}
            text="Données privées, protégées par votre compte"
          />
        </Box>

        <Typography variant="body2">Projet Full Stack JS · EFREI</Typography>
      </Box>

      {/* Partie droite */}
      <Box
        sx={{
          width: { xs: '100%', md: '52%' },
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          px: 3,
        }}
      >
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            width: '100%',
            maxWidth: 480,
          }}
        >
          {/* Icône */}
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              mb: 2,
            }}
          >
            <Box
              sx={{
                width: 58,
                height: 58,
                borderRadius: '50%',
                bgcolor: 'secondary.main',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                color: 'white',
              }}
            >
              <LockIcon />
            </Box>
          </Box>

          <Typography variant="h4" align="center" sx={{ mb: 1 }}>
            Connexion
          </Typography>

          <Typography color="text.secondary" align="center" sx={{ mb: 4 }}>
            Connectez-vous pour retrouver vos tâches.
          </Typography>

          <ErrorMessage message={error} />

          <TextField
            label="Adresse email"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
            fullWidth
            sx={{ mb: 3 }}
          />

          <TextField
            label="Mot de passe"
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
            fullWidth
            sx={{ mb: 3 }}
            slotProps={{
              input: {
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                    >
                      {showPassword ? (
                        <VisibilityOffIcon />
                      ) : (
                        <VisibilityIcon />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              },
            }}
          />

          <AppButton
            text="SE CONNECTER"
            color="primary"
            type="submit"
            fullWidth
          />

          <Divider sx={{ my: 4 }} />

          <Typography align="center" color="text.secondary">
            Pas encore de compte ?{' '}
            <Typography
              component={Link}
              to="/register"
              sx={{
                color: 'primary.main',
                fontWeight: 600,
              }}
            >
              Créer un compte
            </Typography>
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

const Feature = ({ icon, text }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 2,
        mb: 2,
      }}
    >
      <Box
        sx={{
          width: 44,
          height: 44,
          borderRadius: '50%',
          bgcolor: 'rgba(255,255,255,0.15)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {icon}
      </Box>

      <Typography sx={{ fontWeight: 500 }}>{text}</Typography>
    </Box>
  );
};

export default LoginPage;
