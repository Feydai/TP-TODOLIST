import { Chip } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';

const config = {
  TODO: {
    label: 'À faire',
    color: 'default',
    icon: <RadioButtonUncheckedIcon />,
  },
  IN_PROGRESS: {
    label: 'En cours',
    color: 'primary',
    icon: <AutorenewIcon />,
  },
  DONE: {
    label: 'Terminée',
    color: 'success',
    icon: <CheckCircleIcon />,
  },
};

const TaskStatusChip = ({ status }) => {
  const statusConfig = config[status] ?? config.TODO;

  return (
    <Chip
      label={statusConfig.label}
      color={statusConfig.color}
      icon={statusConfig.icon}
      size="small"
    />
  );
};

export default TaskStatusChip;
