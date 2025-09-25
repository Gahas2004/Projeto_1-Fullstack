import React from 'react';
import { 
  Container, 
  CssBaseline, 
  ThemeProvider, 
  createTheme, 
  AppBar, 
  Toolbar, 
  Typography,
  Box,
  Button
} from '@mui/material';
import { MarsRoverProvider, useMarsRover } from './contexts/MarsRoverContext';
import SearchFilters from './components/SearchFilters';
import PhotoGallery from './components/PhotoGallery';
import WelcomeScreen from './components/WelcomeScreen';
import { CameraAlt } from '@mui/icons-material';

// Tema personalizado
const theme = createTheme({
  palette: {
    primary: {
      main: '#0b3d91',
    },
    secondary: {
      main: '#1a6fc4',
    },
    background: {
      default: '#f5f5f5',
    }
  },
  typography: {
    h4: {
      fontWeight: 600,
    },
    h5: {
      fontWeight: 600,
    }
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
        }
      }
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: 'none',
          fontWeight: 600
        }
      }
    }
  }
});

// Componente principal que usa o context
const AppContent = () => {
  const { firstAccess } = useMarsRover();

  if (firstAccess) {
    return <WelcomeScreen />;
  }

  return (
    <>
      <AppBar position="static" elevation={2}>
        <Toolbar>
          <CameraAlt sx={{ mr: 2 }} />
          <Typography variant="h6" component="h1">
            Galeria de Fotos do Mars Rover - NASA
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          <Button 
            color="inherit" 
            onClick={() => window.location.reload()}
            sx={{ ml: 2 }}
          >
            Voltar ao Início
          </Button>
        </Toolbar>
      </AppBar>

      <Container maxWidth="xl" sx={{ py: 4 }}>
        <SearchFilters />
        <PhotoGallery />
      </Container>
    </>
  );
};

// App principal
function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <MarsRoverProvider>
        <AppContent />
      </MarsRoverProvider>
    </ThemeProvider>
  );
}

export default App;