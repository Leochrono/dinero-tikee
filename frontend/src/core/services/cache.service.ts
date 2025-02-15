// Importar los tipos de NodeJS si no están disponibles globalmente
type NodeJSTimeout = ReturnType<typeof setTimeout>;

export interface CacheItem<T> {
  data: T;
  timestamp: number;
  ttl: number; // Añadimos TTL al item para mayor flexibilidad
}

export class CacheService {
  private cache: Map<string, CacheItem<any>> = new Map();
  private readonly DEFAULT_TTL = 5 * 60 * 1000; // 5 minutos
  private readonly CLEANUP_INTERVAL = 10 * 60 * 1000; // 10 minutos
  private cleanupTimer: NodeJSTimeout;

  constructor() {
    // Usar un método más eficiente de limpieza
    this.cleanupTimer = setInterval(() => this.cleanup(), this.CLEANUP_INTERVAL);
    
    // Manejar la limpieza al cerrar la aplicación
    if (typeof window !== 'undefined') {
      window.addEventListener('beforeunload', () => this.dispose());
    }
  }

  set<T>(key: string, data: T, ttl: number = this.DEFAULT_TTL): void {
    // Validaciones adicionales
    if (!key) {
      console.warn('Cache key cannot be empty');
      return;
    }

    this.cache.set(key, {
      data,
      timestamp: Date.now(),
      ttl
    });
  }

  get<T>(key: string): T | null {
    const item = this.cache.get(key);
    
    if (!item) return null;
    
    // Verificar si el elemento ha expirado
    if (Date.now() > (item.timestamp + item.ttl)) {
      this.cache.delete(key);
      return null;
    }
    
    return item.data as T;
  }

  // Método para verificar si un elemento está en caché sin extraerlo
  has(key: string): boolean {
    const item = this.cache.get(key);
    
    if (!item) return false;
    
    // Verificar si el elemento ha expirado
    if (Date.now() > (item.timestamp + item.ttl)) {
      this.cache.delete(key);
      return false;
    }
    
    return true;
  }

  // Método para obtener el tiempo de vida restante
  getRemainingTTL(key: string): number | null {
    const item = this.cache.get(key);
    
    if (!item) return null;
    
    const remainingTime = (item.timestamp + item.ttl) - Date.now();
    return remainingTime > 0 ? remainingTime : null;
  }

  clear(): void {
    this.cache.clear();
  }

  // Método para eliminar un elemento específico
  remove(key: string): void {
    this.cache.delete(key);
  }

  // Generar clave única para solicitudes
  generateKey(endpoint: string, params?: Record<string, any>): string {
    const sortedParams = params ? this.sortParams(params) : {};
    return JSON.stringify({ endpoint, params: sortedParams });
  }

  // Método para manejar parámetros de manera más robusta
  private sortParams(params: Record<string, any>): Record<string, any> {
    return Object.keys(params)
      .sort()
      .reduce((acc, key) => {
        // Manejar valores complejos de manera segura
        const value = params[key];
        acc[key] = typeof value === 'object' 
          ? JSON.stringify(value) 
          : value;
        return acc;
      }, {} as Record<string, any>);
  }

  // Limpieza más eficiente
  private cleanup(): void {
    const now = Date.now();
    const keysToDelete: string[] = [];

    for (const [key, item] of this.cache.entries()) {
      if (now > (item.timestamp + item.ttl)) {
        keysToDelete.push(key);
      }
    }

    // Eliminar elementos expirados en un solo paso
    keysToDelete.forEach(key => this.cache.delete(key));
  }

  // Método de disposición para limpiar recursos
  dispose(): void {
    clearInterval(this.cleanupTimer);
    this.clear();
  }
}

// Decorador para caché de métodos (opcional)
export function Cacheable(ttl?: number) {
  return function (
    target: any, 
    propertyKey: string, 
    descriptor: PropertyDescriptor
  ) {
    const originalMethod = descriptor.value;

    descriptor.value = function (...args: any[]) {
      // Usar el servicio de caché importado directamente
      const key = cacheService.generateKey(propertyKey, args);
      
      // Intentar obtener de caché primero
      const cachedResult = cacheService.get(key);
      if (cachedResult) return cachedResult;

      // Ejecutar método original
      const result = originalMethod.apply(this, args);

      // Guardar en caché
      cacheService.set(key, result, ttl);

      return result;
    };

    return descriptor;
  };
}

// Instancia única del servicio de caché
export const cacheService = new CacheService();