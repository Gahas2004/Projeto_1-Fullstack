import React from 'react';
import {
    Box,
    Paper,
    Typography,
    Button,
    Grid,
    Card,
  CardContent,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Chip,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Alert
} from '@mui/material';
import {
  Rocket,
  CameraAlt,
  Science,
  Public,
  Search,
  DateRange,
  CheckCircle,
  Cancel
} from '@mui/icons-material';
import { useMarsRover } from '../contexts/MarsRoverContext';

const WelcomeScreen = () => {
  const { setFirstAccess } = useMarsRover();

  const handleStartExploring = () => {
    setFirstAccess(false);
  };

  // Informações precisas dos rovers baseadas na documentação
  const roverInfo = [
    {
      name: 'Curiosity',
      launch: '26 Nov 2011',
      landing: '6 Ago 2012',
      status: 'active',
      statusText: 'Ativo',
      max_sol: 'Mais de 4000',
      total_photos: '1.000.000+',
      color: 'success'
    },
    {
      name: 'Perseverance',
      launch: '30 Jul 2020',
      landing: '18 Fev 2021',
      status: 'active',
      statusText: 'Ativo',
      max_sol: 'Em progresso',
      total_photos: 'Em progresso',
      color: 'success'
    },
    {
      name: 'Opportunity',
      launch: '7 Jul 2003',
      landing: '25 Jan 2004',
      status: 'complete',
      statusText: 'Missão Concluída',
      max_sol: '5111',
      total_photos: '200.000+',
      color: 'default'
    },
    {
      name: 'Spirit',
      launch: '10 Jun 2003',
      landing: '4 Jan 2004',
      status: 'complete',
      statusText: 'Missão Concluída',
      max_sol: '2208',
      total_photos: '100.000+',
      color: 'default'
    }
  ];

  // Tabela de câmeras baseada na documentação oficial
  const cameraTable = [
    { abbreviation: 'FHAZ', camera: 'Front Hazard Avoidance Camera', curiosity: true, opportunity: true, spirit: true },
    { abbreviation: 'RHAZ', camera: 'Rear Hazard Avoidance Camera', curiosity: true, opportunity: true, spirit: true },
    { abbreviation: 'MAST', camera: 'Mast Camera', curiosity: true, opportunity: false, spirit: false },
    { abbreviation: 'CHEMCAM', camera: 'Chemistry and Camera Complex', curiosity: true, opportunity: false, spirit: false },
    { abbreviation: 'MAHLI', camera: 'Mars Hand Lens Imager', curiosity: true, opportunity: false, spirit: false },
    { abbreviation: 'MARDI', camera: 'Mars Descent Imager', curiosity: true, opportunity: false, spirit: false },
    { abbreviation: 'NAVCAM', camera: 'Navigation Camera', curiosity: true, opportunity: true, spirit: true },
    { abbreviation: 'PANCAM', camera: 'Panoramic Camera', curiosity: false, opportunity: true, spirit: true },
    { abbreviation: 'MINITES', camera: 'Miniature Thermal Emission Spectrometer', curiosity: false, opportunity: true, spirit: true }
  ];

  return (
    <Box sx={{ maxWidth: 1400, margin: '0 auto', py: 4, px: 2 }}>
      {/* Hero Section */}
      <Paper 
        elevation={0} 
        sx={{ 
          background: 'linear-gradient(135deg, #0b3d91 0%, #1a6fc4 100%)',
          color: 'white',
          p: 6,
          textAlign: 'center',
          mb: 6,
          borderRadius: 3
        }}
      >
        <Rocket sx={{ fontSize: 80, mb: 2 }} />
        <Typography variant="h3" component="h1" gutterBottom fontWeight="bold">
          NASA Mars Rover Photos API
        </Typography>
        <Typography variant="h6" sx={{ opacity: 0.9, maxWidth: 800, margin: '0 auto', mb: 2 }}>
          Explore imagens reais capturadas pelos rovers da NASA na superfície de Marte
        </Typography>
        <Typography variant="body1" sx={{ opacity: 0.8 }}>
          API mantida por Chris Cerami • Dados atualizados diariamente
        </Typography>
      </Paper>

      {/* Alert de informações reais */}
      <Alert severity="info" sx={{ mb: 4 }}>
        <strong>Dados oficiais da NASA:</strong> Todas as imagens e informações são provenientes 
        da API pública da NASA. As fotos são organizadas por sol (dia marciano) a partir da data de pouso.
      </Alert>

      {/* Sobre a API */}
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 4, height: '100%' }}>
            <Typography variant="h5" gutterBottom color="primary" fontWeight="bold">
              <Public sx={{ mr: 1, verticalAlign: 'bottom' }} />
              Sobre a API
            </Typography>
            <Typography paragraph>
              A <strong>NASA Mars Rover Photos API</strong> foi desenvolvida para disponibilizar 
              as imagens coletadas pelos rovers Curiosity, Opportunity e Spirit em Marte 
              para desenvolvedores, educadores e cientistas cidadãos.
            </Typography>
            <Typography paragraph>
              Cada rover possui suas próprias fotos armazenadas no banco de dados, 
              que podem ser consultadas separadamente. As fotos são organizadas pelo 
              <strong> sol</strong> (rotação marciana ou dia) em que foram tiradas, 
              contando a partir da data de pouso do rover.
            </Typography>
            <Box sx={{ mt: 3 }}>
              <Chip icon={<Science />} label="Dados Científicos Reais" sx={{ mr: 1, mb: 1 }} />
              <Chip icon={<CameraAlt />} label="Imagens em Alta Resolução" sx={{ mr: 1, mb: 1 }} />
              <Chip icon={<DateRange />} label="Organizado por Sol Marciano" />
            </Box>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 4, height: '100%' }}>
            <Typography variant="h5" gutterBottom color="primary" fontWeight="bold">
              <Search sx={{ mr: 1, verticalAlign: 'bottom' }} />
              Como Pesquisar
            </Typography>
            <List>
              <ListItem>
                <ListItemIcon>
                  <Typography variant="h6" color="primary">1</Typography>
                </ListItemIcon>
                <ListItemText 
                  primary="Por Sol Marciano" 
                  secondary="Dias marcianos desde o pouso (ex: Sol 1000)"
                />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <Typography variant="h6" color="primary">2</Typography>
                </ListItemIcon>
                <ListItemText 
                  primary="Por Data Terrestre" 
                  secondary="Data específica no formato YYYY-MM-DD"
                />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <Typography variant="h6" color="primary">3</Typography>
                </ListItemIcon>
                <ListItemText 
                  primary="Por Câmera" 
                  secondary="Filtre por câmeras científicas específicas"
                />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <Typography variant="h6" color="primary">4</Typography>
                </ListItemIcon>
                <ListItemText 
                  primary="Paginação" 
                  secondary="25 fotos por página para melhor performance"
                />
              </ListItem>
            </List>
          </Paper>
        </Grid>
      </Grid>

      {/* Tabela de Câmeras */}
      <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
        <Typography variant="h5" gutterBottom color="primary" fontWeight="bold">
          📷 Câmeras dos Rovers
        </Typography>
        <Typography variant="body2" color="textSecondary" gutterBottom>
          Cada câmera tem uma função única e perspectiva diferente
        </Typography>
        
        <TableContainer sx={{ mt: 2, maxHeight: 440 }}>
          <Table stickyHeader size="small">
            <TableHead>
              <TableRow>
                <TableCell><strong>Abrev.</strong></TableCell>
                <TableCell><strong>Câmera</strong></TableCell>
                <TableCell align="center"><strong>Curiosity</strong></TableCell>
                <TableCell align="center"><strong>Opportunity</strong></TableCell>
                <TableCell align="center"><strong>Spirit</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {cameraTable.map((camera) => (
                <TableRow key={camera.abbreviation}>
                  <TableCell>
                    <Chip label={camera.abbreviation} size="small" variant="outlined" />
                  </TableCell>
                  <TableCell>{camera.camera}</TableCell>
                  <TableCell align="center">
                    {camera.curiosity ? <CheckCircle color="success" /> : <Cancel color="error" />}
                  </TableCell>
                  <TableCell align="center">
                    {camera.opportunity ? <CheckCircle color="success" /> : <Cancel color="error" />}
                  </TableCell>
                  <TableCell align="center">
                    {camera.spirit ? <CheckCircle color="success" /> : <Cancel color="error" />}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      {/* Informações dos Rovers */}
      <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
        <Typography variant="h5" gutterBottom color="primary" fontWeight="bold">
          🚀 Rovers Marcianos - Manifesto da Missão
        </Typography>
        <Grid container spacing={3} sx={{ mt: 1 }}>
          {roverInfo.map((rover) => (
            <Grid item xs={12} sm={6} md={3} key={rover.name}>
              <Card 
                variant="outlined" 
                sx={{ 
                  height: '100%',
                  borderColor: rover.status === 'active' ? 'success.main' : 'grey.300'
                }}
              >
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    {rover.name}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    🚀 Lançamento: {rover.launch}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    🌍 Pouso: {rover.landing}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    📅 Máx. Sol: {rover.max_sol}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    📸 Total Fotos: {rover.total_photos}
                  </Typography>
                  <Chip 
                    label={rover.statusText} 
                    color={rover.status === 'active' ? 'success' : 'default'}
                    size="small"
                    sx={{ mt: 1 }}
                  />
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Paper>

      {/* Exemplos de Query */}
      <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
        <Typography variant="h5" gutterBottom color="primary" fontWeight="bold">
          🔍 Exemplos de Consulta API
        </Typography>
        <Box sx={{ fontFamily: 'monospace', fontSize: '0.9rem', bgcolor: 'grey.50', p: 2, borderRadius: 1 }}>
          <Typography variant="body2" color="primary" gutterBottom>
            # Por Sol Marciano:
          </Typography>
          <Typography variant="body2">
            https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&api_key=DEMO_KEY
          </Typography>
          
          <Typography variant="body2" color="primary" sx={{ mt: 2 }} gutterBottom>
            # Por Data Terrestre:
          </Typography>
          <Typography variant="body2">
            https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?earth_date=2015-6-3&api_key=DEMO_KEY
          </Typography>
          
          <Typography variant="body2" color="primary" sx={{ mt: 2 }} gutterBottom>
            # Com filtro de câmera:
          </Typography>
          <Typography variant="body2">
            https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&camera=fhaz&api_key=DEMO_KEY
          </Typography>
        </Box>
      </Paper>

      {/* Botão de Início */}
      <Box textAlign="center" sx={{ mt: 6 }}>
        <Button
          variant="contained"
          size="large"
          onClick={handleStartExploring}
          sx={{
            px: 6,
            py: 2,
            fontSize: '1.1rem',
            background: 'linear-gradient(135deg, #0b3d91 0%, #1a6fc4 100%)'
          }}
          startIcon={<CameraAlt />}
        >
          Explorar Fotos de Marte
        </Button>
        <Typography variant="body2" color="textSecondary" sx={{ mt: 2 }}>
          Dados oficiais da NASA • API mantida por Chris Cerami
        </Typography>
      </Box>
    </Box>
  );
};

export default WelcomeScreen;