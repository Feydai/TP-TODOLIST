import {
  Box,
  Divider,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from '@mui/material';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Step from '../../components/auth/Step.jsx';
import AppButton from '../../components/common/AppButton.jsx';
import ErrorMessage from '../../components/ErrorMessage.jsx';

import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

import useAuth from '../../hooks/useAuth.js';

const RegisterPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      setError('');
      await register(email, password);
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
      {/* ================= GAUCHE ================= */}

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

          <Typography variant="h5" fontWeight={700}>
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
              lineHeight: 1.2,
              mb: 4,
            }}
          >
            Créez votre espace en
            <br />
            quelques secondes.
          </Typography>

          <Typography
            sx={{
              fontSize: 18,
              lineHeight: 1.7,
              mb: 4,
            }}
          >
            Un email et un mot de passe suffisent. Votre mot de passe est
            chiffré avant d’être enregistré et n’est jamais renvoyé par
            l’application.
          </Typography>

          <Step number="1" text="Créez votre compte" active />

          <Step number="2" text="Ajoutez votre première tâche" />

          <Step number="3" text="Suivez son statut jusqu'à « Terminée »" />
        </Box>

        <Typography variant="body2">Projet Full Stack JS · EFREI</Typography>
      </Box>

      {/* ================= DROITE ================= */}

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
          {/* Icon */}

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
                color: 'white',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <PersonAddIcon />
            </Box>
          </Box>

          <Typography variant="h4" align="center" sx={{ mb: 1 }}>
            Créer un compte
          </Typography>

          <Typography color="text.secondary" align="center" sx={{ mb: 4 }}>
            Tous les champs sont obligatoires.
          </Typography>

          {/* Erreur API */}

          <ErrorMessage message={error} />

          {/* Email */}

          <TextField
            label="Adresse email"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
            fullWidth
            sx={{ mb: 3 }}
          />

          {/* Password */}

          <TextField
            label="Mot de passe"
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
            fullWidth
            error={password.length > 0 && password.length < 8}
            helperText={
              password.length > 0 && password.length < 8
                ? 'Le mot de passe doit contenir au moins 8 caractères.'
                : ''
            }
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

          {/* Submit */}

          <AppButton
            text="S'INSCRIRE"
            color="primary"
            type="submit"
            fullWidth
          />

          <Divider sx={{ my: 4 }} />

          {/* Login */}

          <Typography align="center" color="text.secondary">
            Déjà un compte ?{' '}
            <Typography
              component={Link}
              to="/login"
              sx={{
                color: 'primary.main',
                fontWeight: 600,
              }}
            >
              Se connecter
            </Typography>
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default RegisterPage;
