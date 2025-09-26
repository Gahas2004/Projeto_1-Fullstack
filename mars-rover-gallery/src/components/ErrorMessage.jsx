import React from 'react';
import { Alert, Box, Button, Typography } from '@mui/material';
import { Refresh, SentimentDissatisfied } from '@mui/icons-material';

const ErrorMessage = ({ message, onRetry }) => {
  const getErrorMessage = (msg) => {
    if (msg.includes('Sol')) {
      return (
        <Box>
          <Typography>{msg}</Typography>
          <Typography variant="body2" sx={{ mt: 1 }}>
            💡 Dica: Consulte as informações do rover para saber o sol máximo disponível.
          </Typography>
        </Box>
      );
    }
    
    if (msg.includes('Nenhuma foto')) {
      return (
        <Box display="flex" alignItems="center">
          <SentimentDissatisfied sx={{ mr: 1 }} />
          <Box>
            <Typography>{msg}</Typography>
            <Typography variant="body2" sx={{ mt: 1 }}>
              Tente ajustar os filtros de busca.
            </Typography>
          </Box>
        </Box>
      );
    }
    
    return msg;
  };

  return (
    <Box display="flex" justifyContent="center" py={4}>
      <Alert 
        severity="error"
        sx={{ maxWidth: 600, width: '100%' }}
        action={
          onRetry && (
            <Button color="inherit" size="small" onClick={onRetry} startIcon={<Refresh />}>
              Tentar Novamente
            </Button>
          )
        }
      >
        {getErrorMessage(message)}
      </Alert>
    </Box>
  );
};

export default ErrorMessage;