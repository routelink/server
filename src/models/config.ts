export type SameSite = 'strict' | 'lax' | 'none';

export interface Cookie {
  name: string;
  enabled: boolean;
  sameSite: SameSite;
  path: string;
  domain: string;
  httpOnly: boolean;
  secure: boolean;
  removeTokenFromBody: boolean;
}

export interface IConfig {
  host: string;
  port: number;
  dbUri: string;
  jwtSecret: string;
  accessTokenExpiresIn: string;
  refreshTokenExpiresIn: string;
  cookie: Cookie;
  [key: string]: any;
}
