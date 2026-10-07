import { IconButton, Stack, Tooltip } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const TaskActions = ({ onEdit, onDelete }) => {
  return (
    <Stack direction="row" spacing={1}>
      <Tooltip title="Modifier">
        <IconButton onClick={onEdit}>
          <EditIcon />
        </IconButton>
      </Tooltip>

      <Tooltip title="Supprimer">
        <IconButton color="error" onClick={onDelete}>
          <DeleteIcon />
        </IconButton>
      </Tooltip>
    </Stack>
  );
};

export default TaskActions;
