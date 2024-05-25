import { NextFunction, Request, Response } from 'express';
import { JsonWebTokenError, TokenExpiredError } from 'jsonwebtoken';
import passport from 'passport';
import { Strategy } from 'passport';
import {
  ExtractJwt,
  Strategy as JWTStrategy,
  StrategyOptionsWithRequest,
  VerifiedCallback,
} from 'passport-jwt';

import { error } from '@app/middlewares';
import { config } from '@app/models';
import { User } from '@app/models';
import { AUTH } from '@app/models';
import { UserService } from '@app/services';

export class Auth {
  jwtOptions: StrategyOptionsWithRequest;
  superSecret = config.secretKey;
  constructor() {
    this.jwtOptions = {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: config.jwtSecret,
      passReqToCallback: true,
    };
  }

  initialize() {
    passport.use(this.getJWTStrategy());
    return passport.initialize();
  }

  getJWTStrategy(): Strategy {
    return new JWTStrategy(
      this.jwtOptions,
      async (_: Request, payload: any, done: VerifiedCallback) => {
        try {
          const userService = new UserService();
          const user: User | null = await userService.getItem({
            where: { email: payload.email },
          });
          if (!user) {
            return done(null, false);
          }

          return done(undefined, {
            id: user.id,
          });
        } catch (err) {
          return done(null, false);
        }
      },
    );
  }

  authenticate(req: Request, res: Response, next: NextFunction) {
    return passport.authenticate(
      'jwt',
      { session: false },
      (err: any, user: any, status: any) => {
        if (status instanceof TokenExpiredError) {
          return Auth.tokenExpired(res);
        }
        if (status instanceof JsonWebTokenError) {
          return Auth.authRequired(res);
        }
        if (err) {
          return error(err, req, res, next);
        }
        if (!user) {
          return Auth.authRequired(res);
        }
        req.user = user;
        next();
      },
    )(req, res, next);
  }

  private static tokenExpired(res: Response) {
    return res
      .status(401)
      .json({ status: AUTH.EXPIRED_ACCESS_TOKEN, message: 'Access Token Expired' });
  }

  private static authRequired(res: Response) {
    return res
      .status(401)
      .json({ status: AUTH.REQUIRED, message: 'Authentication required' });
  }
}
