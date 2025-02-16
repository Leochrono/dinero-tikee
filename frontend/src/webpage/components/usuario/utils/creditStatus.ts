export const getStatusText = (status: string): string => {
    const statusMap: Record<string, string> = {
      'DOCUMENTS_SUBMITTED': 'Documentos Enviados',
      'INSTITUTION_SELECTED': 'Institución Seleccionada',
      'UNDER_REVIEW': 'En Revisión',
      'APPROVED': 'Aprobado',
      'REJECTED': 'Rechazado',
      'PENDING': 'Pendiente'
    };
    return statusMap[status] || 'Pendiente';
  };