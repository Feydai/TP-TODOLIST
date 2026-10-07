import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import {
  Box,
  CircularProgress,
  Container,
  IconButton,
  Typography,
} from '@mui/material';

import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import TaskForm from '../../components/tasks/TaskForm.jsx';
import ErrorMessage from '../../components/ErrorMessage.jsx';
import { taskService } from '../../services/taskService.js';

const EditTaskPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchTask = async () => {
      try {
        setLoading(true);
        setError('');

        const data = await taskService.getTaskById(id);

        setTask({
          ...data,

          // input type="date" attend YYYY-MM-DD
          dueDate: data.dueDate ? data.dueDate.slice(0, 10) : '',
        });
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTask();
  }, [id]);

  const handleUpdate = async (data) => {
    try {
      setSaving(true);
      setError('');

      await taskService.updateTask(id, data);

      navigate(`/tasks/${id}`);
    } catch (error) {
      setError(error.message);
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    navigate(`/tasks/${id}`);
  };

  if (loading) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          mt: 10,
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container
      maxWidth="md"
      sx={{
        py: { xs: 3, md: 4 },
      }}
    >
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        Mes tâches / {task ? task.title : 'Tâche'} / Modifier
      </Typography>

      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 1,
          mb: 3,
        }}
      >
        <IconButton onClick={handleCancel} aria-label="Retour à la tâche">
          <ArrowBackIcon />
        </IconButton>

        <Typography
          sx={{
            fontSize: {
              xs: 24,
              md: 28,
            },
            fontWeight: 500,
            color: 'text.primary',
          }}
        >
          Modifier la tâche
        </Typography>
      </Box>

      <ErrorMessage message={error} />

      {task && (
        <>
          <TaskForm
            mode="edit"
            initialValues={task}
            onSubmit={handleUpdate}
            onCancel={handleCancel}
            loading={saving}
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
        </>
      )}
    </Container>
  );
};

export default EditTaskPage;
