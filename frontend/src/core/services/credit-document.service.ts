import axiosInstance from "../config/axios.config";
import { 
 DocumentType, 
 DocumentResponseDto 
} from "../types/documents.types";
import { ApiResponse } from "../types/auth.types";

export const creditDocumentService = {
 uploadDocument: async (
   creditId: string,
   documentType: DocumentType,
   file: File,
   onProgress?: (progress: number) => void
 ): Promise<ApiResponse<DocumentResponseDto>> => {
   try {
     const formData = new FormData();
     formData.append('file', file);
     formData.append('documentType', documentType);

     const response = await axiosInstance.post(
       `/credits/${creditId}/documents/upload`,
       formData,
       {
         headers: {
           'Content-Type': 'multipart/form-data',
         },
         onUploadProgress: (progressEvent) => {
           if (onProgress && progressEvent.total) {
             const progress = Math.round(
               (progressEvent.loaded * 100) / progressEvent.total
             );
             onProgress(Math.min(progress, 100));
           }
         },
       }
     );

     return response.data;
   } catch (error: any) {
     console.error('Error en uploadDocument:', error);
     throw new Error(
       error.response?.data?.message || 
       error.response?.data?.error || 
       'Error al subir el documento'
     );
   }
 },

 getDocuments: async (creditId: string): Promise<ApiResponse<DocumentResponseDto[]>> => {
   try {
     const response = await axiosInstance.get(
       `/credits/${creditId}/documents`
     );
     return response.data;
   } catch (error: any) {
     console.error('Error en getDocuments:', error);
     throw new Error(
       error.response?.data?.message || 
       'Error al obtener los documentos'
     );
   }
 },

 deleteDocument: async (creditId: string, documentId: string): Promise<ApiResponse<void>> => {
   try {
     const response = await axiosInstance.delete(
       `/credits/${creditId}/documents/${documentId}`
     );
     return response.data;
   } catch (error: any) {
     console.error('Error en deleteDocument:', error);
     throw new Error(
       error.response?.data?.message || 
       'Error al eliminar el documento'
     );
   }
 },

 verifyDocument: async (
   creditId: string,
   documentId: string,
   verified: boolean,
   comments?: string
 ): Promise<ApiResponse<DocumentResponseDto>> => {
   try {
     const response = await axiosInstance.post(
       `/credits/${creditId}/documents/${documentId}/verify`,
       {
         verified,
         comments
       }
     );
     return response.data;
   } catch (error: any) {
     console.error('Error en verifyDocument:', error);
     throw new Error(
       error.response?.data?.message || 
       'Error al verificar el documento'
     );
   }
 }
};