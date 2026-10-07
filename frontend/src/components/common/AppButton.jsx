import { Button } from '@mui/material';

const AppButton = ({
  text,
  color = 'primary',
  variant = 'contained',
  type = 'button',
  onClick,
  icon,
  disabled = false,
  fullWidth = false,
}) => {
  return (
    <Button
      type={type}
      color={color}
      variant={variant}
      onClick={onClick}
      startIcon={icon}
      disabled={disabled}
      fullWidth={fullWidth}
    >
      {text}
    </Button>
  );
};

export default AppButton;
