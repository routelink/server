import { NextFunction, Request, Response } from 'express';

export function notFound(_: Request, res: Response, next: NextFunction) {
  res.status(404);
  next(new Error('Not found'));
}
