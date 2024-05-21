import { IConfig } from './config';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' || '.env' });

export const config: IConfig = {
  host: process.env.HOST || 'localhost',
  port: +process.env.PORT! || 80,
  jwtSecret: process.env.JWT_SECRET || 'your_secret_key',
  accessTokenExpiresIn: process.env.JWT_ACCESSTOKEN_TTL || '15m',
  refreshTokenExpiresIn: process.env.JWT_REFRESHTOKEN_TTL || '7d',
  dbUri: process.env.DBURI || 'postgres://routelink:routelink@localhost:5432/routelink',
  cookie: {
    name: 'refresh_token',
    enabled: true,
    sameSite: 'lax',
    path: '/auth',
    domain: null,
    httpOnly: 'production' === process.env.NODE_ENV,
    secure: 'production' === process.env.NODE_ENV,
    removeTokenFromBody: true,
  },
};
