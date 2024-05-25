import { NextFunction, Request, Response } from 'express';

import { ErrorResponse } from '@app/models';

export const error = (
  err: Error,
  _: Request,
  res: Response<ErrorResponse>,
  next: NextFunction,
) => {
  const statusCode = res.statusCode !== 200 ? res.statusCode : 500;
  res.status(statusCode);
  let message: ErrorResponse = {
    message: err.message,
  };
  if ('dev' === process.env.NODE_ENV) {
    message = { ...message, stack: err.stack?.split('\n') };
  }
  res.json(message);
  next();
};
