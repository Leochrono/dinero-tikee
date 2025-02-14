interface CacheItem<T> {
    data: T;
    timestamp: number;
  }
  
  export class CacheService {
    private cache: Map<string, CacheItem<any>> = new Map();
    private readonly DEFAULT_TTL = 5 * 60 * 1000; // 5 minutos
    private readonly CLEANUP_INTERVAL = 10 * 60 * 1000; // 10 minutos
  
    constructor() {
      // Limpieza automática cada 10 minutos
      setInterval(() => this.cleanup(), this.CLEANUP_INTERVAL);
    }
  
    set<T>(key: string, data: T, ttl: number = this.DEFAULT_TTL): void {
      this.cache.set(key, {
        data,
        timestamp: Date.now() + ttl,
      });
    }
  
    get<T>(key: string): T | null {
      const item = this.cache.get(key);
      if (!item) return null;
  
      if (Date.now() > item.timestamp) {
        this.cache.delete(key);
        return null;
      }
  
      return item.data as T;
    }
  
    clear(): void {
      this.cache.clear();
    }
  
    generateKey(endpoint: string, params?: Record<string, any>): string {
      const sortedParams = params ? this.sortParams(params) : params;
      return JSON.stringify({ endpoint, params: sortedParams });
    }
  
    private sortParams(params: Record<string, any>): Record<string, any> {
      return Object.keys(params)
        .sort()
        .reduce((acc, key) => {
          acc[key] = params[key];
          return acc;
        }, {} as Record<string, any>);
    }
  
    private cleanup(): void {
      const now = Date.now();
      for (const [key, item] of this.cache.entries()) {
        if (now > item.timestamp) {
          this.cache.delete(key);
        }
      }
    }
  }
  
  export const cacheService = new CacheService();