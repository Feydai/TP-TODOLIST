import { Box, Typography } from '@mui/material';

const TabLabel = ({ label, count, active = false }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 1,
      }}
    >
      <Typography
        component="span"
        variant="body2"
        sx={{
          fontWeight: active ? 700 : 600,
        }}
      >
        {label}
      </Typography>

      <Box
        component="span"
        sx={{
          minWidth: 22,
          height: 22,
          px: 0.7,
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          bgcolor: active ? 'primary.main' : 'action.selected',
          color: active ? 'primary.contrastText' : 'text.secondary',
          fontSize: 12,
          fontWeight: 700,
        }}
      >
        {count}
      </Box>
    </Box>
  );
};

export default TabLabel;
