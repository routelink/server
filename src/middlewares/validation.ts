import { plainToClass } from 'class-transformer';
import { ValidationError, validate } from 'class-validator';
import { NextFunction, Request, Response } from 'express';

export class Validation {
  public static req<T>(cls: new () => T, groups?: string[]) {
    return async (req: Request, res: Response, next: NextFunction) => {
      try {
        const object = plainToClass(cls, req.body, { groups });
        const errors = await validate(object as object);

        if (errors.length > 0) {
          const validationErrors = this.extractErrorMessages(errors);
          res.status(400).json({ errors: validationErrors });
        } else {
          req.body = object;
          next();
        }
      } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
      }
    };
  }

  public static res() {
    return async (_: Request, res: Response, next: NextFunction) => {
      try {
        next();
        /* const rawdata = classToPlain(cls, res., { groups });
        const errors = await validate(object as object);

        if (errors.length > 0) {
          const validationErrors = this.extractErrorMessages(errors);
          res.status(400).json({ errors: validationErrors });
        } else {
          req.body = object;
          next();
        }*/
      } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
      }
    };
  }

  private static extractErrorMessages(errors: ValidationError[]): string[] {
    return errors
      .map((error) => Object.values(error.constraints || {}))
      .reduce((prev, curr) => [...prev, ...curr], []);
  }
}
