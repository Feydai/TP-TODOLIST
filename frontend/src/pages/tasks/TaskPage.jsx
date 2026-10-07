import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import {
  Box,
  Button,
  CircularProgress,
  Container,
  InputAdornment,
  Paper,
  Tab,
  Tabs,
  TextField,
  Typography,
} from '@mui/material';

import AddIcon from '@mui/icons-material/Add';
import AppSnackbar from '../../components/common/AppSnackBar';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import SearchIcon from '@mui/icons-material/Search';

import AppButton from '../../components/common/AppButton.jsx';
import ConfirmDialog from '../../components/common/ConfirmDialogue.jsx';
import ErrorMessage from '../../components/ErrorMessage.jsx';
import TaskTable from '../../components/tasks/TaskTable.jsx';
import useTasks from '../../hooks/useTasks.js';

const TaskPage = () => {
  const navigate = useNavigate();

  const { tasks, loading, error, deleteTask } = useTasks();

  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');
  const [taskToDelete, setTaskToDelete] = useState(null);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success',
  });
  const filteredTasks = tasks?.filter((task) => {
    const matchesStatus = filter === 'all' || task.status === filter;

    const matchesSearch = task.title
      .toLowerCase()
      .includes(search.trim().toLowerCase());

    return matchesStatus && matchesSearch;
  });

  const todoCount = tasks.filter((task) => task.status === 'todo').length;

  const doingCount = tasks.filter((task) => task.status === 'doing').length;

  const doneCount = tasks.filter((task) => task.status === 'done').length;

  const handleDelete = async () => {
    if (!taskToDelete) {
      return;
    }

    try {
      await deleteTask(taskToDelete.id);

      setTaskToDelete(null);

      setSnackbar({
        open: true,
        message: 'Tâche supprimée avec succès',
        severity: 'success',
      });
    } catch (error) {
      setSnackbar({
        open: true,
        message: error.message || 'Impossible de supprimer la tâche',
        severity: 'error',
      });
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 10 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
          gap: 2,
          mb: 3,
        }}
      >
        <Box>
          <Typography variant="h4">Mes tâches</Typography>

          <Typography variant="body2" color="text.secondary">
            {tasks.length} tâches · {doneCount} terminées
          </Typography>
        </Box>

        <AppButton
          text="NOUVELLE TÂCHE"
          icon={<AddIcon />}
          onClick={() => navigate('/tasks/new')}
        />
      </Box>

      <ErrorMessage message={error} />

      <Paper sx={{ overflow: 'hidden' }}>
        {tasks.length === 0 ? (
          <Box
            sx={{
              py: 9,
              px: 3,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 2,
              textAlign: 'center',
            }}
          >
            <Box
              sx={{
                width: 88,
                height: 88,
                borderRadius: '50%',
                bgcolor: '#e3f2fd',
                color: 'primary.main',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <AssignmentTurnedInIcon sx={{ fontSize: 44 }} />
            </Box>

            <Typography variant="h6">Aucune tâche pour le moment</Typography>

            <Typography variant="body2" color="text.secondary">
              Créez votre première tâche pour commencer à suivre votre travail.
            </Typography>

            <Button
              variant="outlined"
              startIcon={<AddIcon />}
              onClick={() => navigate('/tasks/new')}
            >
              CRÉER UNE TÂCHE
            </Button>
          </Box>
        ) : (
          <>
            <Box
              sx={{
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'space-between',
                alignItems: 'center',
                gap: 1.5,
                pl: 1,
                pr: 2,
                borderBottom: 1,
                borderColor: 'divider',
              }}
            >
              <Tabs
                value={filter}
                onChange={(_, value) => setFilter(value)}
                variant="scrollable"
                allowScrollButtonsMobile
              >
                <Tab value="all" label={`Toutes (${tasks.length})`} />
                <Tab value="todo" label={`À faire (${todoCount})`} />
                <Tab value="doing" label={`En cours (${doingCount})`} />
                <Tab value="done" label={`Terminées (${doneCount})`} />
              </Tabs>

              <TextField
                size="small"
                placeholder="Rechercher une tâche"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                sx={{ width: { xs: '100%', sm: 280 }, my: 1 }}
                slotProps={{
                  htmlInput: { 'aria-label': 'Rechercher une tâche' },
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon />
                      </InputAdornment>
                    ),
                  },
                }}
              />
            </Box>

            <TaskTable
              tasks={filteredTasks}
              onView={(id) => navigate(`/tasks/${id}`)}
              onEdit={(id) => navigate(`/tasks/${id}/edit`)}
              onDelete={setTaskToDelete}
            />

            <Box sx={{ p: 2, textAlign: 'right' }}>
              <Typography variant="body2" color="text.secondary">
                {filteredTasks.length} sur {tasks.length} tâches affichées
              </Typography>
            </Box>
          </>
        )}
      </Paper>

      <ConfirmDialog
        open={Boolean(taskToDelete)}
        title="Supprimer cette tâche ?"
        message={
          taskToDelete
            ? `La tâche « ${taskToDelete.title} » sera supprimée définitivement. Cette action est irréversible.`
            : ''
        }
        confirmText="SUPPRIMER"
        onCancel={() => setTaskToDelete(null)}
        onConfirm={handleDelete}
      />
      <AppSnackbar
        open={snackbar.open}
        message={snackbar.message}
        severity={snackbar.severity}
        onClose={() =>
          setSnackbar((current) => ({
            ...current,
            open: false,
          }))
        }
      />
    </Container>
  );
};

export default TaskPage;
