import axiosInstance from '../config/axios.config';
import { ApiResponse } from '../types/auth.types';
import { 
  CreateCreditDTO, 
  CreditDocument, 
  CreditResponse, 
  DocumentResponseDto, 
  VerifyDocumentDto, 
  DocumentType 
} from '../types/credit.types';
import { handleError } from '../utils/error-handler';

export const creditService = {
  create: async (creditData: CreateCreditDTO): Promise<ApiResponse<CreditResponse>> => {
    try {
      // Validación de datos requeridos
      if (!creditData.amount || !creditData.term || !creditData.income || 
          !creditData.location || !creditData.email || !creditData.document) {
        throw new Error('Todos los campos son requeridos');
      }

      console.log('Creando crédito con datos:', creditData);

      const response = await axiosInstance.post('/credits', creditData, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
      console.log('Respuesta del servidor (create):', response.data);

      if (!response?.data) {
        throw new Error('No se recibió respuesta del servidor');
      }

      return {
        success: true,
        data: response.data
      };
    } catch (error: any) {
      console.error('Error en create:', error);
      if (error.response?.status === 401) {
        throw new Error('Sesión expirada, por favor inicie sesión nuevamente');
      }
      throw new Error(error.response?.data?.message || error.message || 'Error al crear el crédito');
    }
  },

  update: async (creditId: string, updateData: { institutionId?: string; status?: string }): Promise<ApiResponse<CreditResponse>> => {
    try {
      if (!creditId) {
        throw new Error('ID de crédito requerido');
      }

      console.log('Actualizando crédito:', { creditId, updateData });

      // Validar que al menos uno de los campos esté presente
      if (!updateData.status && !updateData.institutionId) {
        throw new Error('Se requiere status o institutionId para actualizar');
      }

      const response = await axiosInstance.post(`/credits/${creditId}/status`, {
        status: updateData.status,
        institutionId: updateData.institutionId
      }, {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        timeout: 10000 // 10 segundos
      });
      
      console.log('Respuesta del servidor (update):', response.data);

      if (!response?.data?.success) {
        throw new Error(response?.data?.error || 'Error al actualizar el crédito');
      }

      return response.data;
    } catch (error: any) {
      console.error('Error detallado en update:', {
        message: error.message,
        responseData: error.response?.data,
        status: error.response?.status,
        error: error
      });

      if (error.response?.status === 401) {
        throw new Error('Sesión expirada, por favor inicie sesión nuevamente');
      }

      throw new Error(
        error.response?.data?.message || 
        error.message || 
        'Error al actualizar el crédito'
      );
    }
  },

  // En credit.service.ts
updateStatus: async (creditId: string, updateData: { institutionId?: string; status?: string }): Promise<ApiResponse<CreditResponse>> => {
  try {
    if (!creditId) {
      throw new Error('ID de crédito requerido');
    }

    if (!updateData.institutionId) {
      throw new Error('ID de institución requerido');
    }

    console.log('Actualizando crédito:', { creditId, updateData });

    const response = await axiosInstance.post(`/credits/${creditId}/status`, {
      status: updateData.status,
      institutionId: updateData.institutionId // Asegúrate de que este valor se envíe
    });
    
    console.log('Respuesta del servidor (update):', response.data);

    if (!response?.data?.success) {
      throw new Error(response?.data?.error || 'Error al actualizar el crédito');
    }

    return response.data;
  } catch (error: any) {
    console.error('Error detallado en update:', error);
    throw new Error(error.message || 'Error al actualizar el crédito');
  }
},

  getDetails: async (creditId: string): Promise<ApiResponse<CreditResponse>> => {
    try {
      if (!creditId) {
        throw new Error('ID de crédito requerido');
      }

      console.log('Obteniendo detalles para:', creditId);

      const response = await axiosInstance.get(`/credits/${creditId}/details`);
      
      console.log('Respuesta getDetails:', response.data);

      if (!response?.data?.success) {
        throw new Error(response?.data?.error || 'Error al obtener detalles');
      }

      return response.data;
    } catch (error: any) {
      console.error('Error en getDetails:', error);
      throw new Error(handleError(error));
    }
  },

  search: async (params: {
    amount: number;
    term: number;
    income: number;
    type?: 'bank' | 'cooperative';
  }): Promise<ApiResponse<CreditResponse[]>> => {
    try {
      if (!params.amount || !params.term || !params.income) {
        throw new Error('Monto, plazo e ingresos son requeridos');
      }

      console.log('Buscando créditos con:', params);

      const response = await axiosInstance.get('/credits/search', { 
        params,
        headers: {
          'Accept': 'application/json'
        }
      });
      
      console.log('Respuesta search:', response.data);

      if (!response?.data?.success) {
        throw new Error(response?.data?.error || 'Error en la búsqueda');
      }

      return response.data;
    } catch (error: any) {
      console.error('Error en search:', error);
      throw new Error(handleError(error));
    }
  },

  getUserCredits: async (): Promise<ApiResponse<CreditResponse[]>> => {
    try {
      console.log('Obteniendo créditos del usuario');

      const response = await axiosInstance.get('/credits/user-credits');
      
      console.log('Respuesta getUserCredits:', response.data);

      if (!response?.data?.success) {
        throw new Error(response?.data?.error || 'Error al obtener créditos');
      }

      return response.data;
    } catch (error: any) {
      console.error('Error en getUserCredits:', error);
      throw new Error(handleError(error));
    }
  },

  uploadDocument: async (
    creditId: string,
    documentType: DocumentType,
    file: File,
    onProgress?: (progress: number) => void
  ): Promise<ApiResponse<DocumentResponseDto>> => {
    try {
      if (!creditId || !documentType || !file) {
        throw new Error('Todos los campos son requeridos');
      }

      console.log('Subiendo documento:', { creditId, documentType, fileName: file.name });

      const formData = new FormData();
      formData.append('file', file);
      formData.append('documentType', documentType);

      const response = await axiosInstance.post(
        `/credits/${creditId}/documents/upload`,
        formData,
        {
          headers: { 'Content-Type': 'multipart/form-data' },
          onUploadProgress: (progressEvent) => {
            if (onProgress && progressEvent.total) {
              const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
              onProgress(Math.min(progress, 100));
            }
          },
        }
      );

      console.log('Respuesta uploadDocument:', response.data);

      if (!response?.data?.success) {
        throw new Error(response?.data?.error || 'Error al subir documento');
      }

      return response.data;
    } catch (error: any) {
      console.error('Error en uploadDocument:', error);
      throw new Error(handleError(error));
    }
  },

  getDocuments: async (creditId: string): Promise<ApiResponse<CreditDocument[]>> => {
    try {
      if (!creditId) {
        throw new Error('ID de crédito requerido');
      }

      console.log('Obteniendo documentos para:', creditId);

      const response = await axiosInstance.get(`/credits/${creditId}/documents`);
      
      console.log('Respuesta getDocuments:', response.data);

      if (!response?.data?.success) {
        throw new Error(response?.data?.error || 'Error al obtener documentos');
      }

      return response.data;
    } catch (error: any) {
      console.error('Error en getDocuments:', error);
      throw new Error(handleError(error));
    }
  },

  verifyDocument: async (
    creditId: string,
    documentId: string,
    verifyData: VerifyDocumentDto
  ): Promise<ApiResponse<DocumentResponseDto>> => {
    try {
      if (!creditId || !documentId) {
        throw new Error('ID de crédito y documento requeridos');
      }

      console.log('Verificando documento:', { creditId, documentId, verifyData });

      const response = await axiosInstance.post(
        `/credits/${creditId}/documents/${documentId}/verify`,
        verifyData,
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );

      console.log('Respuesta verifyDocument:', response.data);

      if (!response?.data?.success) {
        throw new Error(response?.data?.error || 'Error al verificar documento');
      }

      return response.data;
    } catch (error: any) {
      console.error('Error en verifyDocument:', error);
      throw new Error(handleError(error));
    }
  },

  uploadCreditFiles: async (
    creditId: string,
    formData: FormData,
    onProgress?: (progress: number) => void
  ): Promise<ApiResponse<DocumentResponseDto>> => {
    try {
      if (!creditId || !formData) {
        throw new Error('ID de crédito y archivos son requeridos');
      }
  
      // Log del contenido del FormData
      console.log('FormData contents:', {
        creditId,
        has_file: formData.has('file'),
        has_documentType: formData.has('documentType'),
        formData_entries: Array.from(formData.entries()).map(([key, value]) => ({
          key,
          value: value instanceof File ? value.name : value
        }))
      });
  
      const response = await axiosInstance.post(
        `/credits/${creditId}/documents/upload`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          },
          onUploadProgress: (progressEvent) => {
            if (onProgress && progressEvent.total) {
              const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
              onProgress(Math.min(progress, 100));
            }
          },
          // Aumentar el timeout para archivos grandes
          timeout: 30000
        }
      );
  
      if (!response?.data) {
        throw new Error('No se recibió respuesta del servidor');
      }
  
      return response.data;
    } catch (error: any) {
      console.error('Error detallado en uploadCreditFiles:', {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status
      });
      const errorMessage = error.response?.data?.message || error.message || 'Error al subir archivos';
      throw new Error(errorMessage);
    }
  }
};