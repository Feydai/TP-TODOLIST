import {
  Box,
  Link,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';

import CalendarTodayIcon from '@mui/icons-material/CalendarToday';

import TaskStatusChip from './TaskStatusChip.jsx';
import TaskActions from './TaskActions.jsx';

const formatDate = (date) => {
  return new Date(`${date}T00:00:00`).toLocaleDateString('fr-FR', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
};

const isOverdue = (task) => {
  if (!task.dueDate || task.status === 'done') {
    return false;
  }

  const today = new Date().toISOString().slice(0, 10);

  return task.dueDate < today;
};

const TaskTable = ({ tasks, onEdit, onDelete, onView }) => {
  return (
    <TableContainer>
      <Table sx={{ minWidth: 720 }}>
        <TableHead>
          <TableRow>
            <TableCell>
              <strong>Titre</strong>
            </TableCell>
            <TableCell sx={{ width: 150 }}>
              <strong>Statut</strong>
            </TableCell>
            <TableCell sx={{ width: 190 }}>
              <strong>Échéance</strong>
            </TableCell>
            <TableCell align="right" sx={{ width: 120 }}>
              <strong>Actions</strong>
            </TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {tasks.map((task) => {
            const overdue = isOverdue(task);

            return (
              <TableRow key={task.id} hover>
                <TableCell>
                  <Link
                    component="button"
                    underline="hover"
                    color="inherit"
                    onClick={() => onView(task.id)}
                    sx={{ fontWeight: 500, fontSize: 16, textAlign: 'left' }}
                  >
                    {task.title}
                  </Link>

                  <Typography
                    variant="body2"
                    color="text.secondary"
                    fontStyle={task.description ? 'normal' : 'italic'}
                    noWrap
                  >
                    {task.description || 'Aucune description'}
                  </Typography>
                </TableCell>

                <TableCell>
                  <TaskStatusChip status={task.status} />
                </TableCell>

                <TableCell sx={{ color: overdue ? 'error.main' : 'text.primary' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <CalendarTodayIcon fontSize="small" />

                    <Typography
                      variant="body2"
                      color={task.dueDate ? 'inherit' : 'text.secondary'}
                    >
                      {task.dueDate ? formatDate(task.dueDate) : 'Aucune échéance'}
                    </Typography>
                  </Box>

                  {overdue && (
                    <Typography variant="caption" fontWeight={500} sx={{ pl: 3.5 }}>
                      En retard
                    </Typography>
                  )}
                </TableCell>

                <TableCell align="right">
                  <TaskActions
                    onEdit={() => onEdit(task.id)}
                    onDelete={() => onDelete(task)}
                  />
                </TableCell>
              </TableRow>
            );
          })}

          {tasks.length === 0 && (
            <TableRow>
              <TableCell colSpan={4} align="center" sx={{ py: 5, color: 'text.secondary' }}>
                Aucune tâche ne correspond à votre recherche.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TaskTable;
