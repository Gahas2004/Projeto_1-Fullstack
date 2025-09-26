import React, { useEffect, useCallback } from 'react';
import {
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Box,
  Button,
  Chip,
  Paper
} from '@mui/material';
import { SentimentDissatisfied } from '@mui/icons-material';
import { useMarsRover } from '../contexts/MarsRoverContext';
import LoadingSpinner from './LoadingSpinner';
import ErrorMessage from './ErrorMessage';

const PhotoGallery = () => {
  const { photos, loading, error, hasMore, noResults, fetchPhotos, firstAccess, filters } = useMarsRover();

  useEffect(() => {
    if (photos.length === 0 && !loading && !firstAccess && !noResults) {
      fetchPhotos();
    }
  }, [firstAccess]);

  const handleLoadMore = useCallback(() => {
    fetchPhotos(true);
  }, [fetchPhotos]);

  // Corrigir o problema de fuso horário - usar a data original da API
  const formatDate = (dateString) => {
    if (!dateString) return '';
    
    // Manter o formato original YYYY-MM-DD sem conversão de fuso
    const [year, month, day] = dateString.split('-');
    return `${day}/${month}/${year}`;
  };

  // Formatar a data de busca para exibição
  const formatSearchDate = (dateString) => {
    if (!dateString) return '';
    
    // Para a data de busca, também manter o formato original
    const [year, month, day] = dateString.split('-');
    return `${day}/${month}/${year}`;
  };

  if (error) {
    return <ErrorMessage message={error} onRetry={fetchPhotos} />;
  }

  // Componente para quando não há resultados
  const NoResultsMessage = () => (
    <Box textAlign="center" py={8}>
      <Paper 
        elevation={0} 
        sx={{ 
          p: 6, 
          maxWidth: 500, 
          margin: '0 auto',
          background: 'linear-gradient(135deg, #f5f5f5 0%, #e0e0e0 100%)'
        }}
      >
        <SentimentDissatisfied sx={{ fontSize: 80, color: 'text.secondary', mb: 2 }} />
        <Typography variant="h5" gutterBottom color="textSecondary">
          Nenhuma foto encontrada
        </Typography>
        <Typography variant="body1" color="textSecondary" paragraph>
          Não foram encontradas fotos para os filtros selecionados.
        </Typography>
        <Typography variant="body2" color="textSecondary">
          💡 Tente ajustar o Sol, a data terrestre ou a câmera selecionada.
        </Typography>
        <Button 
          variant="contained" 
          onClick={() => window.location.reload()}
          sx={{ mt: 3 }}
        >
          Voltar às Informações
        </Button>
      </Paper>
    </Box>
  );

  return (
    <Box>
      {photos.length > 0 && (
        <Box sx={{ mb: 3, p: 2, bgcolor: 'info.light', borderRadius: 1 }}>
          <Typography variant="body2" color="info.contrastText">
            📅 Rover {photos[0]?.rover.name} • 
            {filters.earth_date ? (
              <> Data Terrestre: {formatSearchDate(filters.earth_date)} •</>
            ) : (
              <> Sol: {filters.sol} •</>
            )}
            Câmera: {filters.camera === 'all' ? 'Todas' : filters.camera} • 
            Fotos encontradas: {photos.length}
          </Typography>
        </Box>
      )}

      {noResults && !loading && <NoResultsMessage />}

      {!noResults && (
        <>
          <Grid container spacing={3}>
            {photos.map((photo, index) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={`${photo.id}-${index}`}>
                <Card 
                  sx={{ 
                    height: '100%', 
                    display: 'flex', 
                    flexDirection: 'column',
                    transition: 'transform 0.2s',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      boxShadow: 6
                    }
                  }}
                >
                  <CardMedia
                    component="img"
                    height="200"
                    image={photo.img_src}
                    alt={`Foto do rover ${photo.rover.name} - ${photo.camera.full_name}`}
                    sx={{ objectFit: 'cover' }}
                    loading="lazy"
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography variant="h6" component="h3" gutterBottom noWrap>
                      {photo.rover.name}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" gutterBottom>
                      {photo.camera.full_name}
                    </Typography>
                    <Box sx={{ mt: 1 }}>
                      <Chip 
                        label={`Sol: ${photo.sol}`} 
                        size="small" 
                        variant="outlined" 
                        sx={{ mr: 1, mb: 1 }}
                      />
                      <Chip 
                        label={`Data: ${formatDate(photo.earth_date)}`} 
                        size="small" 
                        variant="outlined" 
                      />
                    </Box>
                    <Typography variant="caption" color="textSecondary" sx={{ mt: 1, display: 'block' }}>
                      ID: {photo.id} • Data original: {photo.earth_date}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>

          {loading && <LoadingSpinner message="Buscando fotos de Marte..." />}

          {hasMore && !loading && photos.length > 0 && (
            <Box display="flex" justifyContent="center" py={4}>
              <Button 
                variant="outlined" 
                size="large" 
                onClick={handleLoadMore}
                disabled={loading}
              >
                Carregar Mais Fotos
              </Button>
            </Box>
          )}

          {!hasMore && photos.length > 0 && (
            <Box textAlign="center" py={4}>
              <Typography variant="body1" color="textSecondary">
                🎉 Todas as fotos disponíveis foram carregadas!
              </Typography>
              <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
                Total de {photos.length} fotos encontradas
              </Typography>
            </Box>
          )}
        </>
      )}

      {!loading && photos.length === 0 && !error && !firstAccess && !noResults && (
        <Box textAlign="center" py={4}>
          <Typography variant="h6" color="textSecondary">
            Faça uma busca para ver as fotos disponíveis.
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default PhotoGallery;