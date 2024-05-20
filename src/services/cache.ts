import Redis from 'ioredis';
import { AbstractCacheService } from '@app/models';
import { RedisAdapter } from './redis';

export const cacheService = new AbstractCacheService(new RedisAdapter(new Redis()));
