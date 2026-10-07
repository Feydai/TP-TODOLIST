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
        {/* HEADER */}
        <TableHead>
          <TableRow
            sx={{
              bgcolor: '#ffffff',

              '& th': {
                py: 2,
                borderColor: 'divider',
              },
            }}
          >
            <TableCell sx={{ width: '50%' }}>
              <Typography
                sx={{
                  fontSize: 14,
                  fontWeight: 700,
                  color: '#212121',
                }}
              >
                Titre
              </Typography>
            </TableCell>

            <TableCell sx={{ width: '15%' }}>
              <Typography
                sx={{
                  fontSize: 14,
                  fontWeight: 700,
                  color: '#212121',
                }}
              >
                Statut
              </Typography>
            </TableCell>

            <TableCell sx={{ width: '20%' }}>
              <Typography
                sx={{
                  fontSize: 14,
                  fontWeight: 700,
                  color: '#212121',
                }}
              >
                Échéance
              </Typography>
            </TableCell>

            <TableCell align="center" sx={{ width: '15%' }}>
              <Typography
                sx={{
                  fontSize: 14,
                  fontWeight: 700,
                  color: '#212121',
                }}
              >
                Actions
              </Typography>
            </TableCell>
          </TableRow>
        </TableHead>

        {/* BODY */}
        <TableBody>
          {tasks.map((task) => {
            const overdue = isOverdue(task);

            return (
              <TableRow
                key={task.id}
                hover
                sx={{
                  '& td': {
                    py: 2.25,
                    borderColor: 'divider',
                  },

                  '&:hover': {
                    bgcolor: 'action.hover',
                  },
                }}
              >
                {/* TITRE + DESCRIPTION */}
                <TableCell>
                  <Link
                    component="button"
                    underline="none"
                    color="text.primary"
                    onClick={() => onView(task.id)}
                    sx={{
                      display: 'block',
                      maxWidth: '100%',
                      fontSize: 16,
                      fontWeight: 700,
                      lineHeight: 1.4,
                      textAlign: 'left',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                      cursor: 'pointer',

                      '&:hover': {
                        textDecoration: 'underline',
                      },
                    }}
                  >
                    {task.title}
                  </Link>

                  <Typography
                    sx={{
                      mt: 0.4,
                      fontSize: 14,
                      fontWeight: 400,
                      color: '#6B7280',
                      fontStyle: task.description ? 'normal' : 'italic',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {task.description || 'Aucune description'}
                  </Typography>
                </TableCell>

                {/* STATUT */}
                <TableCell>
                  <TaskStatusChip status={task.status} />
                </TableCell>

                {/* ÉCHÉANCE */}
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
                      sx={{
                        fontSize: 14,
                        fontWeight: 400,
                        color: task.dueDate ? 'inherit' : '#6B7280',
                      }}
                    >
                      {task.dueDate
                        ? formatDate(task.dueDate)
                        : 'Aucune échéance'}
                    </Typography>
                  </Box>

                  {overdue && (
                    <Typography
                      sx={{
                        display: 'block',
                        mt: 0.25,
                        ml: 3.5,
                        fontSize: 12,
                        fontWeight: 600,
                        color: 'error.main',
                      }}
                    >
                      En retard
                    </Typography>
                  )}
                </TableCell>

                {/* ACTIONS */}
                <TableCell align="center">
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  >
                    <TaskActions
                      onView={() => onView(task.id)}
                      onEdit={() => onEdit(task.id)}
                      onDelete={() => onDelete(task)}
                    />
                  </Box>
                </TableCell>
              </TableRow>
            );
          })}

          {/* AUCUNE TÂCHE */}
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
                <Typography
                  sx={{
                    fontSize: 14,
                    color: '#6B7280',
                  }}
                >
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
