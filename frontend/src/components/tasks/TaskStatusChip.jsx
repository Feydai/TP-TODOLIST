import { Chip } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';

const config = {
  todo: {
    label: 'À faire',
    bgcolor: '#ebebeb',
    color: 'rgba(0, 0, 0, 0.87)',
    icon: <RadioButtonUncheckedIcon />,
  },
  doing: {
    label: 'En cours',
    bgcolor: '#e3f2fd',
    color: '#0d47a1',
    icon: <AutorenewIcon />,
  },
  done: {
    label: 'Terminée',
    bgcolor: '#e8f5e9',
    color: '#1b5e20',
    icon: <CheckCircleIcon />,
  },
};

const TaskStatusChip = ({ status }) => {
  const statusConfig = config[status] ?? config.todo;

  return (
    <Chip
      label={statusConfig.label}
      icon={statusConfig.icon}
      size="small"
      sx={{
        bgcolor: statusConfig.bgcolor,
        color: statusConfig.color,
        '& .MuiChip-icon': { color: statusConfig.color },
      }}
    />
  );
};

export default TaskStatusChip;
