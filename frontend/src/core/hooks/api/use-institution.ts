import { useState, useCallback, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import {
  BestRatesParams,
  Institution,
  InstitutionFilters
} from '../../types/institutions.types';
import { institutionService } from '../../services/institution.service';

export const useInstitution = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [institutions, setInstitutions] = useState<Institution[]>([]);
  const [lastFilters, setLastFilters] = useState<InstitutionFilters | null>(null);

  // Cache de instituciones por filtros
  const [institutionsCache, setInstitutionsCache] = useState<{
    [key: string]: { data: Institution[]; timestamp: number }
  }>({});

  // Función para generar clave de caché basada en filtros
  const getCacheKey = (filters: InstitutionFilters): string => {
    return JSON.stringify({
      amount: filters.amount,
      term: filters.term,
      type: filters.type,
      rateFilter: filters.rateFilter
    });
  };

  // Función para verificar si el caché es válido (menos de 5 minutos)
  const isCacheValid = (timestamp: number): boolean => {
    const CACHE_TTL = 5 * 60 * 1000; // 5 minutos en milisegundos
    return Date.now() - timestamp < CACHE_TTL;
  };

  const filterInstitutions = useCallback(async (filters: InstitutionFilters): Promise<Institution[]> => {
    try {
      setLoading(true);
      setError(null);
      setLastFilters(filters);

      // Validar filtros
      if (!filters.amount || !filters.term) {
        throw new Error('Monto y plazo son requeridos');
      }

      if (filters.amount < 500 || filters.amount > 100000) {
        throw new Error('El monto debe estar entre $500 y $100,000');
      }

      if (filters.term < 3 || filters.term > 72) {
        throw new Error('El plazo debe estar entre 3 y 72 meses');
      }

      // Verificar caché
      const cacheKey = getCacheKey(filters);
      const cachedData = institutionsCache[cacheKey];

      if (cachedData && isCacheValid(cachedData.timestamp)) {
        setInstitutions(cachedData.data);
        return cachedData.data;
      }

      const response = await institutionService.filterInstitutions(filters);
      
      if (!response?.success) {
        throw new Error(response?.error || 'Error al filtrar instituciones');
      }

      const filteredInstitutions = response.data || [];

      if (filteredInstitutions.length === 0) {
        const message = `No se encontraron instituciones que cumplan con los criterios. ${
          filters.amount ? `Prueba con un monto diferente a $${filters.amount.toLocaleString()}.` : ''
        }`;
        toast(message, {
          duration: 4000,
          icon: '⚠️',
          style: {
            background: '#FFF3CD',
            color: '#856404',
            border: '1px solid #FFEEBA'
          }
        });
      }

      // Actualizar caché
      setInstitutionsCache(prev => ({
        ...prev,
        [cacheKey]: {
          data: filteredInstitutions,
          timestamp: Date.now()
        }
      }));

      setInstitutions(filteredInstitutions);
      return filteredInstitutions;

    } catch (error: any) {
      console.error('useInstitution - Error:', error);
      const errorMessage = error.response?.data?.message || error.message;
      setError(errorMessage);
      toast.error(errorMessage);
      return [];
    } finally {
      setLoading(false);
    }
  }, [institutionsCache]);

  const findBestRates = useCallback(async (params: BestRatesParams): Promise<Institution[]> => {
    try {
      setLoading(true);
      setError(null);

      if (!params.amount || !params.term) {
        throw new Error('Monto y plazo son requeridos');
      }

      if (params.amount < 500 || params.amount > 100000) {
        throw new Error('El monto debe estar entre $500 y $100,000');
      }

      if (params.term < 3 || params.term > 72) {
        throw new Error('El plazo debe estar entre 3 y 72 meses');
      }

      const response = await institutionService.findBestRates(
        params.amount,
        params.term,
        params.rateFilter
      );

      if (!response?.success) {
        throw new Error(response?.error || 'Error al obtener mejores tasas');
      }

      return response.data || [];

    } catch (error: any) {
      const errorMessage = error.response?.data?.message || error.message;
      setError(errorMessage);
      toast.error(errorMessage);
      return [];
    } finally {
      setLoading(false);
    }
  }, []);

  const getInstitution = useCallback(async (id: string): Promise<Institution | null> => {
    try {
      if (!id) {
        throw new Error('ID de institución requerido');
      }

      setLoading(true);
      setError(null);

      const response = await institutionService.getOne(id);

      if (!response?.success) {
        throw new Error(response?.error || 'Error al obtener la institución');
      }

      return response.data || null;

    } catch (error: any) {
      console.error('Error en getInstitution:', error);
      const errorMessage = error.response?.data?.message || error.message;
      setError(errorMessage);
      toast.error(errorMessage);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const clearCache = useCallback(() => {
    setInstitutionsCache({});
  }, []);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  // Limpiar caché cada hora
  useEffect(() => {
    const interval = setInterval(clearCache, 60 * 60 * 1000);
    return () => clearInterval(interval);
  }, [clearCache]);

  return {
    loading,
    setLoading,
    error,
    institutions,
    filterInstitutions,
    findBestRates,
    getInstitution,
    clearError,
    clearCache,
    setError
  };
};