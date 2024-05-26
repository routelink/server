import { NextFunction, Request, Response } from 'express';

import { error } from './error';

export class Syntax {
  public static errorHandler(err: any, req: Request, res: Response, next: NextFunction) {
    if (err instanceof SyntaxError && err.message.includes('Unexpected token }')) {
      err.message = 'Invalid JSON';
      return error(err, req, res.status(400), next);
    }

    next(err);
  }
}
