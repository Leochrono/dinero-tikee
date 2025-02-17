type NodeJSTimeout = ReturnType<typeof setTimeout>;

export interface CacheItem<T> {
  data: T;
  timestamp: number;
  ttl: number;
}

export class CacheService {
  private cache: Map<string, CacheItem<any>> = new Map();
  private readonly DEFAULT_TTL = 5 * 60 * 1000;
  private readonly CLEANUP_INTERVAL = 10 * 60 * 1000; 
  private cleanupTimer: NodeJSTimeout;

  constructor() {
    this.cleanupTimer = setInterval(
      () => this.cleanup(),
      this.CLEANUP_INTERVAL
    );
    if (typeof window !== "undefined") {
      window.addEventListener("beforeunload", () => this.dispose());
    }
  }

  set<T>(key: string, data: T, ttl: number = this.DEFAULT_TTL): void {
    if (!key) {
      console.warn("Cache key cannot be empty");
      return;
    }

    this.cache.set(key, {
      data,
      timestamp: Date.now(),
      ttl,
    });
  }

  get<T>(key: string): T | null {
    const item = this.cache.get(key);
    if (!item) return null;
    if (Date.now() > item.timestamp + item.ttl) {
      this.cache.delete(key);
      return null;
    }

    return item.data as T;
  }
  has(key: string): boolean {
    const item = this.cache.get(key);
    if (!item) return false;
    if (Date.now() > item.timestamp + item.ttl) {
      this.cache.delete(key);
      return false;
    }

    return true;
  }
  getRemainingTTL(key: string): number | null {
    const item = this.cache.get(key);

    if (!item) return null;

    const remainingTime = item.timestamp + item.ttl - Date.now();
    return remainingTime > 0 ? remainingTime : null;
  }

  clear(): void {
    this.cache.clear();
  }
  remove(key: string): void {
    this.cache.delete(key);
  }
  generateKey(endpoint: string, params?: Record<string, any>): string {
    const sortedParams = params ? this.sortParams(params) : {};
    return JSON.stringify({ endpoint, params: sortedParams });
  }
  private sortParams(params: Record<string, any>): Record<string, any> {
    return Object.keys(params)
      .sort()
      .reduce((acc, key) => {
        const value = params[key];
        acc[key] = typeof value === "object" ? JSON.stringify(value) : value;
        return acc;
      }, {} as Record<string, any>);
  }
  private cleanup(): void {
    const now = Date.now();
    const keysToDelete: string[] = [];

    for (const [key, item] of this.cache.entries()) {
      if (now > item.timestamp + item.ttl) {
        keysToDelete.push(key);
      }
    }
    keysToDelete.forEach((key) => this.cache.delete(key));
  }
  dispose(): void {
    clearInterval(this.cleanupTimer);
    this.clear();
  }
}
export function Cacheable(ttl?: number) {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    const originalMethod = descriptor.value;

    descriptor.value = function (...args: any[]) {
      const key = cacheService.generateKey(propertyKey, args);
      const cachedResult = cacheService.get(key);
      if (cachedResult) return cachedResult;
      const result = originalMethod.apply(this, args);
      cacheService.set(key, result, ttl);

      return result;
    };

    return descriptor;
  };
}
export const cacheService = new CacheService();
