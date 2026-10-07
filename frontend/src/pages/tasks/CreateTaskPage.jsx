import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Container, IconButton, Typography } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import TaskForm from '../../components/tasks/TaskForm.jsx';
import ErrorMessage from '../../components/ErrorMessage.jsx';
import { taskService } from '../../services/taskService.js';

const CreateTaskPage = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleCreate = async (task) => {
    try {
      setLoading(true);
      setError('');

      await taskService.createTask(task);

      navigate('/tasks');
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    navigate('/tasks');
  };

  return (
    <Container maxWidth="md" sx={{ py: 5 }}>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        Mes tâches / Nouvelle tâche
      </Typography>

      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 1,
          mb: 3,
        }}
      >
        <IconButton onClick={handleCancel} aria-label="Retour aux tâches">
          <ArrowBackIcon />
        </IconButton>

        <Typography variant="h4" fontWeight={600}>
          Nouvelle tâche
        </Typography>
      </Box>

      <ErrorMessage message={error} />

      <TaskForm
        mode="create"
        onSubmit={handleCreate}
        onCancel={handleCancel}
        loading={loading}
      />

      <Typography
        variant="caption"
        color="text.secondary"
        sx={{
          display: 'block',
          mt: 2,
        }}
      >
        * Champs obligatoires
      </Typography>
    </Container>
  );
};

export default CreateTaskPage;
