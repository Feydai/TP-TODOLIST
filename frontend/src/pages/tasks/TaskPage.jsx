import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import {
  Box,
  CircularProgress,
  Container,
  Paper,
  Tab,
  Tabs,
  TextField,
  Typography,
} from '@mui/material';

import AddIcon from '@mui/icons-material/Add';

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

  const filteredTasks = tasks?.filter((task) => {
    const matchesStatus = filter === 'all' || task.status === filter;

    const matchesSearch = task.title
      .toLowerCase()
      .includes(search.toLowerCase());

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
      await deleteTask(taskToDelete._id);
      setTaskToDelete(null);
    } catch {
      // L'erreur est déjà gérée par useTasks
    }
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
    <Container maxWidth="xl" sx={{ py: 5 }}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 3,
        }}
      >
        <Box>
          <Typography variant="h4" fontWeight={600}>
            Mes tâches
          </Typography>

          <Typography color="text.secondary">
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

      <Paper>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            px: 1,
          }}
        >
          <Tabs value={filter} onChange={(_, value) => setFilter(value)}>
            <Tab value="all" label={`TOUTES ${tasks.length}`} />
            <Tab value="todo" label={`À FAIRE ${todoCount}`} />
            <Tab value="doing" label={`EN COURS ${doingCount}`} />
            <Tab value="done" label={`TERMINÉES ${doneCount}`} />
          </Tabs>

          <TextField
            size="small"
            placeholder="Rechercher une tâche"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            sx={{ width: 320 }}
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
      </Paper>

      <ConfirmDialog
        open={Boolean(taskToDelete)}
        title="Supprimer la tâche"
        message={
          taskToDelete
            ? `Voulez-vous vraiment supprimer « ${taskToDelete.title} » ?`
            : ''
        }
        confirmText="SUPPRIMER"
        onCancel={() => setTaskToDelete(null)}
        onConfirm={handleDelete}
      />
    </Container>
  );
};

export default TaskPage;
