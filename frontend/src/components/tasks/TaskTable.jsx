import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';

import CalendarTodayIcon from '@mui/icons-material/CalendarToday';

import TaskStatusChip from './TaskStatusChip.jsx';
import TaskActions from './TaskActions.jsx';

const TaskTable = ({ tasks, onEdit, onDelete, onView }) => {
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>
            <strong>Titre</strong>
          </TableCell>
          <TableCell>
            <strong>Statut</strong>
          </TableCell>
          <TableCell>
            <strong>Échéance</strong>
          </TableCell>
          <TableCell align="right">
            <strong>Actions</strong>
          </TableCell>
        </TableRow>
      </TableHead>

      <TableBody>
        {tasks.map((task) => (
          <TableRow key={task.id} hover>
            <TableCell>
              <Box onClick={() => onView(task.id)} sx={{ cursor: 'pointer' }}>
                <Typography fontWeight={600}>{task.title}</Typography>

                <Typography
                  variant="body2"
                  color="text.secondary"
                  fontStyle={!task.description ? 'italic' : 'normal'}
                >
                  {task.description || 'Aucune description'}
                </Typography>
              </Box>
            </TableCell>

            <TableCell>
              <TaskStatusChip status={task.status} />
            </TableCell>

            <TableCell>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1,
                }}
              >
                <CalendarTodayIcon fontSize="small" />

                <Typography variant="body2">
                  {task.dueDate || 'Aucune échéance'}
                </Typography>
              </Box>
            </TableCell>

            <TableCell align="right">
              <TaskActions
                onEdit={() => onEdit(task.id)}
                onDelete={() => onDelete(task)}
              />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default TaskTable;
