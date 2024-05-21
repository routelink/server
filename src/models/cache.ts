export interface ICache {
  get(key: string): Promise<string | null>;
  set(key: string, value: string, expire?: number): Promise<void>;
  del(key: string): Promise<void>;
}

export class AbstractCacheService {
  constructor(private readonly cache: ICache) {}

  async get(key: string): Promise<string | null> {
    return this.cache.get(key);
  }

  async set(key: string, value: string, expire?: number): Promise<void> {
    return this.cache.set(key, value, expire);
  }

  async del(key: string): Promise<void> {
    return this.cache.del(key);
  }
}
