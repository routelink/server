import dotenv from 'dotenv';

import { IConfig } from './config';

dotenv.config();
dotenv.config({ path: `.env.local`, override: true });

export const config: IConfig = {
  host: process.env.HOST || 'localhost',
  port: +process.env.PORT! || 80,
  jwtSecret: process.env.JWT_SECRET || 'your_secret_key',
  accessTokenExpiresIn: process.env.JWT_ACCESSTOKEN_TTL || '15m',
  refreshTokenExpiresIn: process.env.JWT_REFRESHTOKEN_TTL || '7d',
  database: process.env.POSTGRES_DB || 'routelink',
  username: process.env.POSTGRES_USER || 'routelink',
  password: process.env.POSTGRES_PASSWORD || 'routelink',
  dbhost: process.env.POSTGRES_HOST || 'localhost',
  cookie: {
    name: 'refresh_token',
    enabled: true,
    sameSite: 'lax',
    path: '/auth',
    domain: 'localhost',
    httpOnly: 'production' === process.env.NODE_ENV,
    secure: 'production' === process.env.NODE_ENV,
    removeTokenFromBody: true,
  },
};
