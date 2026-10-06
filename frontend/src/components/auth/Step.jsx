import { Box, Typography } from '@mui/material';

const Step = ({ number, text, active = false }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 2,
        mb: 2,
      }}
    >
      <Box
        sx={{
          width: 40,
          height: 40,
          borderRadius: '50%',
          bgcolor: active ? 'white' : 'rgba(255, 255, 255, 0.15)',
          color: active ? 'primary.main' : 'white',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontWeight: 700,
        }}
      >
        {number}
      </Box>

      <Typography fontWeight={500}>{text}</Typography>
    </Box>
  );
};

export default Step;
