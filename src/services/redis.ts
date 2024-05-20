import { Redis } from 'ioredis';
import { ICache } from '@app/models';

export class RedisAdapter implements ICache {
  constructor(private readonly redis: Redis) {}

  async get(key: string): Promise<string | null> {
    return await this.redis.get(key);
  }

  async set(key: string, value: string, expire?: number): Promise<void> {
    if (expire) {
      await this.redis.set(key, value, 'EX', expire);
    } else {
      await this.redis.set(key, value);
    }
  }

  async del(key: string): Promise<void> {
    await this.redis.del(key);
  }
}
