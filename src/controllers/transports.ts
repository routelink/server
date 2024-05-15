import { NextFunction, Request, Response } from 'express';

type RequestWithBody<T> = Request<{}, {}, T>;
type RequestWithQuery<T> = Request<{}, {}, {}, T>;
// type RequestWithParams<T> = Request<T>

type GetRequest = {
  page: number;
  count: number;
};
type AddRequest = {
  data: any;
};

class TransportsController {
  async get(req: RequestWithQuery<GetRequest>, res: Response, next: NextFunction) {
    try {
      const { page = 1, count = 10 } = req.query;

      res.json({ page, count });
    } catch (e) {
      next(e);
    }
  }

  async add(req: RequestWithBody<AddRequest>, res: Response, next: NextFunction) {
    try {
      const { data } = req.body;
      res.json(data);
    } catch (e) {
      next(e);
      //res.status(401).json({ status: AUTH.REFRESH_ERROR, message: 'Error refresh token' });
    }
  }
}

const transportsController = new TransportsController();

export { transportsController };
