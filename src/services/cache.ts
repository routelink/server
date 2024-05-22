import Redis, { RedisOptions } from 'ioredis';
import { AbstractCacheService } from '@app/models';
import { RedisAdapter } from './redis';
const options: RedisOptions = {
  host: process.env.REDIS_HOST || 'localhost',
  port: +process.env.REDIS_PORT! || 6379,
};
export const cacheService = new AbstractCacheService(
  new RedisAdapter(new Redis(options)),
);
