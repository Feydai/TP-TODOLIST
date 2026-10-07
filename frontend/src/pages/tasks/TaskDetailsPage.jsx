import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import {
  Box,
  CircularProgress,
  Container,
  Divider,
  Paper,
  Typography,
} from '@mui/material';

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

import AppButton from '../../components/common/AppButton';
import ConfirmDialog from '../../components/common/ConfirmDialogue';
import ErrorMessage from '../../components/ErrorMessage.jsx';
import { taskService } from '../../services/taskService.js';

const statusLabels = {
  todo: 'À FAIRE',
  doing: 'EN COURS',
  done: 'TERMINÉE',
};

const formatDate = (date) => {
  if (!date) {
    return 'Aucune échéance';
  }

  return new Date(date).toLocaleDateString('fr-FR', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
};

const isOverdue = (task) => {
  if (!task?.dueDate || task.status === 'done') {
    return false;
  }

  const dueDate = new Date(task.dueDate);
  const today = new Date();

  today.setHours(0, 0, 0, 0);

  return dueDate < today;
};

const TaskDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  useEffect(() => {
    const fetchTask = async () => {
      try {
        setLoading(true);
        setError('');

        const data = await taskService.getTaskById(id);

        setTask(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTask();
  }, [id]);

  const handleDelete = async () => {
    try {
      setError('');

      await taskService.deleteTask(id);

      navigate('/tasks');
    } catch (error) {
      setError(error.message);
      setDeleteDialogOpen(false);
    }
  };

  if (loading) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          py: 10,
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (!task) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <ErrorMessage message={error || 'Tâche introuvable'} />
      </Container>
    );
  }

  const overdue = isOverdue(task);

  return (
    <Container
      maxWidth="lg"
      sx={{
        py: { xs: 3, md: 4 },
      }}
    >
      {/* Breadcrumb */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 1.5,
          mb: 2.5,
        }}
      >
        <Typography
          component="button"
          onClick={() => navigate('/tasks')}
          sx={{
            p: 0,
            border: 0,
            bgcolor: 'transparent',
            color: 'text.secondary',
            textDecoration: 'underline',
            cursor: 'pointer',
            fontSize: 15,

            '&:hover': {
              color: 'primary.main',
            },
          }}
        >
          Mes tâches
        </Typography>

        <Typography color="text.secondary">/</Typography>

        <Typography
          sx={{
            fontSize: 15,
            fontWeight: 600,
            color: 'text.primary',
          }}
        >
          {task.title}
        </Typography>
      </Box>

      {/* Titre + actions */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: {
            xs: 'flex-start',
            md: 'center',
          },
          flexDirection: {
            xs: 'column',
            md: 'row',
          },
          gap: 2,
          mb: 3,
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1.5,
            minWidth: 0,
          }}
        >
          <ArrowBackIcon
            onClick={() => navigate('/tasks')}
            sx={{
              color: 'text.secondary',
              cursor: 'pointer',
              fontSize: 22,

              '&:hover': {
                color: 'primary.main',
              },
            }}
          />

          <Typography
            sx={{
              fontSize: {
                xs: 24,
                md: 28,
              },
              fontWeight: 500,
              color: 'text.primary',
              lineHeight: 1.3,
              overflowWrap: 'anywhere',
            }}
          >
            {task.title}
          </Typography>
        </Box>

        <Box
          sx={{
            display: 'flex',
            gap: 1.5,
            flexShrink: 0,
          }}
        >
          <AppButton
            text="MODIFIER"
            variant="outlined"
            icon={<EditIcon />}
            onClick={() => navigate(`/tasks/${id}/edit`)}
          />

          <AppButton
            text="SUPPRIMER"
            variant="outlined"
            color="error"
            icon={<DeleteIcon />}
            onClick={() => setDeleteDialogOpen(true)}
          />
        </Box>
      </Box>

      <ErrorMessage message={error} />

      {/* Contenu */}
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: {
            xs: '1fr',
            md: 'minmax(0, 2fr) minmax(300px, 1fr)',
          },
          gap: 3,
          alignItems: 'start',
        }}
      >
        {/* Description */}
        <Paper
          elevation={1}
          sx={{
            p: 3,
            minHeight: 160,
            border: '1px solid',
            borderColor: 'divider',
            borderRadius: 2,
          }}
        >
          <Typography
            sx={{
              mb: 2,
              fontSize: 13,
              fontWeight: 800,
              color: 'text.secondary',
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
            }}
          >
            Description
          </Typography>

          <Typography
            sx={{
              fontSize: 16,
              lineHeight: 1.7,
              color: task.description ? 'text.primary' : 'text.secondary',
              fontStyle: task.description ? 'normal' : 'italic',
              whiteSpace: 'pre-wrap',
            }}
          >
            {task.description || 'Aucune description'}
          </Typography>
        </Paper>

        {/* Informations */}
        <Paper
          elevation={1}
          sx={{
            border: '1px solid',
            borderColor: 'divider',
            borderRadius: 2,
            overflow: 'hidden',
          }}
        >
          {/* Statut */}
          <Box sx={{ p: 3 }}>
            <Typography
              sx={{
                mb: 2,
                fontSize: 13,
                fontWeight: 800,
                color: 'text.secondary',
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
              }}
            >
              Statut
            </Typography>

            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                border: '1px solid',
                borderColor: 'divider',
                borderRadius: 1.5,
                overflow: 'hidden',
              }}
            >
              {['todo', 'doing', 'done'].map((status) => {
                const selected = task.status === status;

                return (
                  <Box
                    key={status}
                    sx={{
                      py: 1.3,
                      px: 0.5,
                      textAlign: 'center',
                      fontSize: 12,
                      fontWeight: selected ? 700 : 500,
                      color: selected ? 'primary.main' : 'text.secondary',
                      bgcolor: selected ? 'primary.50' : 'background.paper',

                      ...(selected && {
                        backgroundColor: '#E8F0FE',
                      }),

                      '&:not(:last-child)': {
                        borderRight: '1px solid',
                        borderColor: 'divider',
                      },
                    }}
                  >
                    {statusLabels[status]}
                  </Box>
                );
              })}
            </Box>
          </Box>

          <Divider />

          {/* Échéance */}
          <Box sx={{ p: 3 }}>
            <Typography
              sx={{
                mb: 1.5,
                fontSize: 13,
                fontWeight: 800,
                color: 'text.secondary',
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
              }}
            >
              Échéance
            </Typography>

            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1.2,
                color: overdue
                  ? 'error.main'
                  : task.dueDate
                    ? 'text.primary'
                    : 'text.secondary',
              }}
            >
              <CalendarTodayOutlinedIcon fontSize="small" />

              <Typography
                sx={{
                  fontSize: 15,
                  fontWeight: 500,
                  color: 'inherit',
                }}
              >
                {formatDate(task.dueDate)}
              </Typography>
            </Box>

            {overdue && (
              <Box
                sx={{
                  display: 'inline-flex',
                  mt: 1.25,
                  px: 1.2,
                  py: 0.25,
                  border: '1px solid',
                  borderColor: 'error.main',
                  borderRadius: 5,
                  color: 'error.main',
                  fontSize: 12,
                  fontWeight: 600,
                }}
              >
                En retard
              </Box>
            )}
          </Box>

          <Divider />

          {/* Identifiant */}
          <Box sx={{ p: 3 }}>
            <Typography
              sx={{
                mb: 1,
                fontSize: 13,
                fontWeight: 800,
                color: 'text.secondary',
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
              }}
            >
              Identifiant
            </Typography>

            <Typography
              sx={{
                fontSize: 14,
                color: 'text.secondary',
                wordBreak: 'break-all',
              }}
            >
              {task.id}
            </Typography>
          </Box>
        </Paper>
      </Box>

      <ConfirmDialog
        open={deleteDialogOpen}
        title="Supprimer la tâche"
        message={`Voulez-vous vraiment supprimer « ${task.title} » ?`}
        confirmText="SUPPRIMER"
        onConfirm={handleDelete}
        onCancel={() => setDeleteDialogOpen(false)}
      />
    </Container>
  );
};

export default TaskDetailsPage;
