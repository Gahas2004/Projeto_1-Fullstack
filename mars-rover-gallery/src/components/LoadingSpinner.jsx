import React from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';

const LoadingSpinner = ({ message = "Carregando..." }) => {
  return (
    <Box 
      display="flex" 
      flexDirection="column" 
      alignItems="center" 
      justifyContent="center" 
      py={4}
    >
      <CircularProgress size={60} thickness={4} />
      <Typography variant="h6" color="textSecondary" mt={2}>
        {message}
      </Typography>
    </Box>
  );
};

export default LoadingSpinner;