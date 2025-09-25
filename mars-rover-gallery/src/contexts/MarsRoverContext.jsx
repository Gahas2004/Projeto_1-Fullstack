import { createContext, useContext, useReducer } from 'react';
import axios from 'axios';

// Estado inicial do contexto
const initialState = {
    photos: [],
    loading: false,
    error: null,
    filters: {
        rover: 'curiosity',
        camera: 'all',
        sol: 1000,
        earth_date: '',
        page: 1
    },
    hasMore: true,
    firstAccess: true,
    noResults: false
};

// Tipos de ações para o reducer
const ACTION_TYPES = {
    SET_LOADING: 'SET_LOADING',
    SET_ERROR: 'SET_ERROR',
    SET_PHOTOS: 'SET_PHOTOS',
    ADD_PHOTOS: 'ADD_PHOTOS',
    SET_FILTERS: 'SET_FILTERS',
    SET_HAS_MORE: 'SET_HAS_MORE',
    RESET_PHOTOS: 'RESET_PHOTOS',
    SET_FIRST_ACCESS: 'SET_FIRST_ACCESS',
    SET_NO_RESULTS: 'SET_NO_RESULTS'
};

// Função reducer para atualizar o estado
const marsRoverReducer = (state, action) => {
    switch (action.type) {
        case ACTION_TYPES.SET_LOADING:
            return { ...state, loading: action.payload, noResults: false };
        case ACTION_TYPES.SET_ERROR:
            return { ...state, error: action.payload, loading: false, noResults: false };
        case ACTION_TYPES.SET_PHOTOS:
            return { 
                ...state, 
                photos: action.payload, 
                loading: false, 
                error: null,
                noResults: action.payload.length === 0
            };
        case ACTION_TYPES.ADD_PHOTOS:
            return { 
                ...state, 
                photos: [...state.photos, ...action.payload], 
                loading: false, 
                error: null,
                noResults: false
            };
        case ACTION_TYPES.SET_FILTERS:
            return { ...state, filters: { ...state.filters, ...action.payload } };
        case ACTION_TYPES.SET_HAS_MORE:
            return { ...state, hasMore: action.payload };
        case ACTION_TYPES.RESET_PHOTOS:
            return { ...state, photos: [], hasMore: true, noResults: false };
        case ACTION_TYPES.SET_FIRST_ACCESS:
            return { ...state, firstAccess: action.payload };
        case ACTION_TYPES.SET_NO_RESULTS:
            return { ...state, noResults: action.payload };
        default:
            return state;
    }
};

const MarsRoverContext = createContext();

// Provider do contexto
export const MarsRoverProvider = ({ children }) => {
    const [state, dispatch] = useReducer(marsRoverReducer, initialState);

    const API_KEY = import.meta.env.VITE_NASA_API_KEY;
    const BASE_URL = 'https://api.nasa.gov/mars-photos/api/v1/rovers';

    // Busca o manifesto da missão do rover
    const fetchManifest = async (rover) => {
        try {
            const response = await axios.get(
                `https://api.nasa.gov/mars-photos/api/v1/manifests/${rover}?api_key=${API_KEY}`
            );
            return response.data.photo_manifest;
        } catch (error) {
            return null;
        }
    };

    // Formata a data para o padrão da API
    const formatEarthDate = (dateString) => {
        if (!dateString) return '';
        const [year, month, day] = dateString.split('-');
        const formattedMonth = parseInt(month, 10).toString();
        const formattedDay = parseInt(day, 10).toString();
        return `${year}-${formattedMonth}-${formattedDay}`;
    };

    // Busca fotos do rover
    const fetchPhotos = async (loadMore = false) => {
        dispatch({ type: ACTION_TYPES.SET_LOADING, payload: true });
        try {
            const { rover, camera, sol, earth_date, page } = state.filters;
            const manifest = await fetchManifest(rover);
            const maxSol = manifest?.max_sol || 4000;

            if (!earth_date && sol > maxSol) {
                dispatch({ 
                    type: ACTION_TYPES.SET_ERROR, 
                    payload: `Sol ${sol} não disponível. Sol máximo para ${rover}: ${maxSol}` 
                });
                return;
            }

            let url = `${BASE_URL}/${rover}/photos?api_key=${API_KEY}&page=${page}`;
            if (earth_date) {
                const formattedDate = formatEarthDate(earth_date);
                url += `&earth_date=${formattedDate}`;
            } else {
                url += `&sol=${sol}`;
            }
            if (camera !== 'all') {
                url += `&camera=${camera}`;
            }

            const response = await axios.get(url);

            if (response.data.photos.length === 0) {
                if (loadMore) {
                    dispatch({ type: ACTION_TYPES.SET_HAS_MORE, payload: false });
                } else {
                    dispatch({ type: ACTION_TYPES.SET_PHOTOS, payload: [] });
                }
            } else {
                if (loadMore) {
                    dispatch({ type: ACTION_TYPES.ADD_PHOTOS, payload: response.data.photos });
                    dispatch({ type: ACTION_TYPES.SET_FILTERS, payload: { page: page + 1 } });
                } else {
                    dispatch({ type: ACTION_TYPES.SET_PHOTOS, payload: response.data.photos });
                    dispatch({ type: ACTION_TYPES.SET_FILTERS, payload: { page: 2 } });
                    dispatch({ type: ACTION_TYPES.SET_HAS_MORE, payload: true });
                }
            }
        } catch (error) {
            dispatch({ 
                type: ACTION_TYPES.SET_ERROR, 
                payload: 'Erro ao buscar fotos. Tente novamente.' 
            });
        }
    };

    // Atualiza filtros de busca
    const updateFilters = (newFilters) => {
        dispatch({ type: ACTION_TYPES.SET_FILTERS, payload: newFilters });
    };

    // Reseta fotos para nova busca
    const resetPhotos = () => {
        dispatch({ type: ACTION_TYPES.RESET_PHOTOS });
    };

    // Controla estado de primeiro acesso
    const setFirstAccess = (value) => {
        dispatch({ type: ACTION_TYPES.SET_FIRST_ACCESS, payload: value });
    };

    // Define estado de sem resultados
    const setNoResults = (value) => {
        dispatch({ type: ACTION_TYPES.SET_NO_RESULTS, payload: value });
    };

    const value = {
        ...state,
        fetchPhotos,
        updateFilters,
        resetPhotos,
        setFirstAccess,
        setNoResults
    };

    return (
        <MarsRoverContext.Provider value={value}>
            {children}
        </MarsRoverContext.Provider>
    );
};

// Hook personalizado para acessar o contexto
export const useMarsRover = () => {
    const context = useContext(MarsRoverContext);
    if (!context) {
        throw new Error('useMarsRover deve ser usado dentro de um MarsRoverProvider');
    }
    return context;
};
