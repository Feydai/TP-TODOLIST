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

import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined';

import TaskStatusChip from './TaskStatusChip.jsx';
import TaskActions from './TaskActions.jsx';

const formatDate = (date) => {
  return new Date(date).toLocaleDateString('fr-FR', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
};

const isOverdue = (task) => {
  if (!task.dueDate || task.status === 'done') {
    return false;
  }

  const dueDate = new Date(task.dueDate);
  const today = new Date();

  today.setHours(0, 0, 0, 0);

  return dueDate < today;
};

const TaskTable = ({ tasks, onEdit, onDelete, onView }) => {
  return (
    <TableContainer>
      <Table
        sx={{
          minWidth: 720,
          tableLayout: 'fixed',
        }}
      >
        <TableHead>
          <TableRow
            sx={{
              bgcolor: 'action.hover',

              '& th': {
                py: 2,
                borderColor: 'divider',
              },
            }}
          >
            <TableCell sx={{ width: '50%' }}>
              <Typography variant="body2" fontWeight={600}>
                Titre
              </Typography>
            </TableCell>

            <TableCell sx={{ width: '15%' }}>
              <Typography variant="body2" fontWeight={600}>
                Statut
              </Typography>
            </TableCell>

            <TableCell sx={{ width: '20%' }}>
              <Typography variant="body2" fontWeight={600}>
                Échéance
              </Typography>
            </TableCell>

            <TableCell align="center" sx={{ width: '15%' }}>
              <Typography variant="body2" fontWeight={600}>
                Actions
              </Typography>
            </TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {tasks.map((task) => {
            const overdue = isOverdue(task);

            return (
              <TableRow
                key={task.id}
                hover
                sx={{
                  '& td': {
                    py: 2.5,
                    borderColor: 'divider',
                  },

                  '&:hover': {
                    bgcolor: 'action.hover',
                  },
                }}
              >
                {/* Titre + description */}
                <TableCell>
                  <Link
                    component="button"
                    underline="hover"
                    color="text.primary"
                    onClick={() => onView(task.id)}
                    sx={{
                      display: 'block',
                      maxWidth: '100%',
                      fontSize: 16,
                      fontWeight: 600,
                      textAlign: 'left',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {task.title}
                  </Link>

                  <Typography
                    variant="body2"
                    color="text.secondary"
                    fontStyle={task.description ? 'normal' : 'italic'}
                    sx={{
                      mt: 0.5,
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {task.description || 'Aucune description'}
                  </Typography>
                </TableCell>

                {/* Statut */}
                <TableCell>
                  <TaskStatusChip status={task.status} />
                </TableCell>

                {/* Date */}
                <TableCell>
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 1,
                      color: overdue ? 'error.main' : 'text.primary',
                    }}
                  >
                    <CalendarTodayOutlinedIcon fontSize="small" />

                    <Typography
                      variant="body2"
                      color={task.dueDate ? 'inherit' : 'text.secondary'}
                    >
                      {task.dueDate
                        ? formatDate(task.dueDate)
                        : 'Aucune échéance'}
                    </Typography>
                  </Box>

                  {overdue && (
                    <Typography
                      variant="caption"
                      color="error.main"
                      fontWeight={600}
                      sx={{ ml: 3.5 }}
                    >
                      En retard
                    </Typography>
                  )}
                </TableCell>

                {/* Actions */}
                <TableCell align="center">
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
              <TableCell
                colSpan={4}
                align="center"
                sx={{
                  py: 6,
                  borderBottom: 0,
                }}
              >
                <Typography variant="body1" color="text.secondary">
                  Aucune tâche ne correspond à votre recherche.
                </Typography>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TaskTable;
