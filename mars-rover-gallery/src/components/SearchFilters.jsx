import React from 'react';
import {
    Box,
    TextField,
    MenuItem,
    Button,
    Paper,
    Grid,
    Typography,
    Alert
} from '@mui/material';
import { Search, CameraAlt, Info, Warning } from '@mui/icons-material';
import { useMarsRover } from '../contexts/MarsRoverContext';

// Componente de filtros de busca para fotos dos rovers
const SearchFilters = () => {
    // Hooks do contexto para manipular filtros e buscar fotos
    const { filters, updateFilters, fetchPhotos, resetPhotos, loading, noResults } = useMarsRover();

    // Opções de rovers disponíveis
    const rovers = [
        { value: 'curiosity', label: 'Curiosity' },
        { value: 'opportunity', label: 'Opportunity' },
        { value: 'spirit', label: 'Spirit' },
        { value: 'perseverance', label: 'Perseverance' }
    ];

    // Retorna as opções de câmeras conforme o rover selecionado
    const getCamerasByRover = (rover) => {
        const allCameras = [
            { value: 'all', label: 'Todas as Câmeras' },
            { value: 'FHAZ', label: 'Front Hazard Avoidance Camera' },
            { value: 'RHAZ', label: 'Rear Hazard Avoidance Camera' },
            { value: 'NAVCAM', label: 'Navigation Camera' },
        ];

        if (rover === 'curiosity') {
            return [
                ...allCameras,
                { value: 'MAST', label: 'Mast Camera' },
                { value: 'CHEMCAM', label: 'Chemistry and Camera Complex' },
                { value: 'MAHLI', label: 'Mars Hand Lens Imager' },
                { value: 'MARDI', label: 'Mars Descent Imager' },
            ];
        } else if (rover === 'opportunity' || rover === 'spirit') {
            return [
                ...allCameras,
                { value: 'PANCAM', label: 'Panoramic Camera' },
                { value: 'MINITES', label: 'Miniature Thermal Emission Spectrometer' },
            ];
        } else if (rover === 'perseverance') {
            return [
                ...allCameras,
                { value: 'MCZ_LEFT', label: 'Mastcam-Z Left' },
                { value: 'MCZ_RIGHT', label: 'Mastcam-Z Right' },
                { value: 'FRONT_HAZCAM_LEFT_A', label: 'Front Hazard Avoidance Camera Left' },
                { value: 'FRONT_HAZCAM_RIGHT_A', label: 'Front Hazard Avoidance Camera Right' },
            ];
        }
        return allCameras;
    };

    // Lista de câmeras conforme rover selecionado
    const cameras = getCamerasByRover(filters.rover);

    // Validação: impede busca se ambos os campos de data estiverem preenchidos ou nenhum
    const hasBothDates = filters.sol > 0 && filters.earth_date !== '';
    const hasNoDates = filters.sol <= 0 && filters.earth_date === '';

    // Executa busca de fotos conforme filtros válidos
    const handleSearch = () => {
        if (hasBothDates) return;
        if (hasNoDates) return;
        resetPhotos();
        fetchPhotos();
    };

    // Atualiza filtro de data terrestre, limpando sol
    const handleDateChange = (event) => {
        const rawDate = event.target.value;
        if (rawDate) {
            updateFilters({ earth_date: rawDate, sol: 0, page: 1 });
        } else {
            updateFilters({ earth_date: '', page: 1 });
        }
    };

    // Atualiza filtro de sol, limpando data terrestre
    const handleSolChange = (value) => {
        updateFilters({ sol: value, earth_date: '', page: 1 });
    };

    // Atualiza filtro de rover e reseta câmera
    const handleRoverChange = (rover) => {
        updateFilters({ rover, camera: 'all', page: 1 });
    };

    // Atualiza filtro de câmera
    const handleCameraChange = (camera) => {
        updateFilters({ camera, page: 1 });
    };

    // Formata data para exibição no helperText
    const formatDisplayDate = (dateString) => {
        if (!dateString) return '';
        const [year, month, day] = dateString.split('-');
        return `${day}/${month}/${year}`;
    };

    return (
        <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
            <Typography variant="h5" gutterBottom color="primary">
                Filtros de Busca
            </Typography>
            
            {/* Alerta se ambos os campos de data estiverem preenchidos */}
            {hasBothDates && (
                <Alert severity="warning" sx={{ mb: 2 }}>
                    <Warning sx={{ mr: 1 }} />
                    Preencha apenas Sol <strong>OU</strong> Data Terrestre, não ambos.
                </Alert>
            )}
            
            {/* Alerta se nenhum campo de data estiver preenchido */}
            {hasNoDates && (
                <Alert severity="info" sx={{ mb: 2 }}>
                    <Info sx={{ mr: 1 }} />
                    Preencha o Sol <strong>OU</strong> a Data Terrestre para realizar a busca.
                </Alert>
            )}

            <Grid container spacing={3}>
                {/* Seleção do rover */}
                <Grid item xs={12} sm={6} md={3}>
                    <TextField
                        select
                        fullWidth
                        label="Rover"
                        value={filters.rover}
                        onChange={(e) => handleRoverChange(e.target.value)}
                        variant="outlined"
                    >
                        {rovers.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                                {option.label}
                            </MenuItem>
                        ))}
                    </TextField>
                </Grid>

                {/* Seleção da câmera */}
                <Grid item xs={12} sm={6} md={3}>
                    <TextField
                        select
                        fullWidth
                        label="Câmera"
                        value={filters.camera}
                        onChange={(e) => handleCameraChange(e.target.value)}
                        variant="outlined"
                    >
                        {cameras.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                                {option.label}
                            </MenuItem>
                        ))}
                    </TextField>
                </Grid>

                {/* Campo para sol (dia marciano) */}
                <Grid item xs={12} sm={6} md={2}>
                    <TextField
                        fullWidth
                        label="Sol (Dia Marciano)"
                        type="number"
                        value={filters.sol}
                        onChange={(e) => handleSolChange(parseInt(e.target.value) || 0)}
                        variant="outlined"
                        inputProps={{ min: 0 }}
                        helperText="Dias desde o pouso"
                        error={hasBothDates}
                    />
                </Grid>

                {/* Campo para data terrestre */}
                <Grid item xs={12} sm={6} md={2}>
                    <TextField
                        fullWidth
                        label="Data Terrestre"
                        type="date"
                        value={filters.earth_date}
                        onChange={handleDateChange}
                        variant="outlined"
                        InputLabelProps={{ shrink: true }}
                        helperText={filters.earth_date ? `Buscar: ${formatDisplayDate(filters.earth_date)}` : "Selecione uma data"}
                        error={hasBothDates}
                    />
                </Grid>

                {/* Botão de busca */}
                <Grid item xs={12} md={2}>
                    <Button
                        fullWidth
                        variant="contained"
                        size="large"
                        onClick={handleSearch}
                        disabled={loading || hasBothDates || hasNoDates}
                        startIcon={<Search />}
                        sx={{ height: '56px' }}
                    >
                        {loading ? 'Buscando...' : 'Buscar'}
                    </Button>
                </Grid>

                {/* Mensagem quando não há resultados */}
                {noResults && (
                    <Grid item xs={12}>
                        <Box 
                            sx={{ 
                                mt: 2, 
                                p: 2, 
                                bgcolor: 'warning.light', 
                                borderRadius: 1,
                                display: 'flex',
                                alignItems: 'center'
                            }}
                        >
                            <Info sx={{ mr: 1 }} />
                            <Typography variant="body2">
                                <strong>Nenhuma foto encontrada.</strong> Tente ajustar os filtros ou usar valores diferentes.
                            </Typography>
                        </Box>
                    </Grid>
                )}

                {/* Botão para informações da API */}
                <Grid item xs={12}>
                    <Box textAlign="center" mt={2}>
                        <Button 
                            variant="outlined" 
                            onClick={() => window.location.reload()}
                            startIcon={<CameraAlt />}
                        >
                            Ver Informações da API
                        </Button>
                    </Box>
                </Grid>
            </Grid>

            {/* Informação sobre o tratamento da data */}
            <Box sx={{ mt: 2, p: 2, bgcolor: 'grey.50', borderRadius: 1 }}>
                <Typography variant="body2" color="textSecondary">
                    💡 <strong>Solução do fuso horário:</strong> Agora a data é enviada exatamente como selecionada.
                </Typography>
            </Box>
        </Paper>
    );
};

export default SearchFilters;