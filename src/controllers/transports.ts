import { NextFunction, Request, Response } from 'express';

import { TransportService } from '@app/services/transport';
import { GetTransportsPayload, ITransport } from '@app/types';

type RequestWithBody<T> = Request<{}, {}, T>;
// type RequestWithQuery<T> = Request<{}, {}, {}, T>;
// type RequestWithParams<T> = Request<T>

class TransportsController {
  async items(
    req: RequestWithBody<GetTransportsPayload>,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const transportService = new TransportService();
      const rows = await transportService.getItems(req.body);

      res.json({ rows });
    } catch (e) {
      next(e);
    }
  }

  async add(req: RequestWithBody<ITransport>, res: Response, next: NextFunction) {
    try {
      const transportService = new TransportService();
      const newTransport = await transportService.addTransport(req.body);
      res.status(200).json({ ...newTransport });
    } catch (e) {
      console.log(e);
      next(e);
      //res.status(401).json({ status: AUTH.REFRESH_ERROR, message: 'Error refresh token' });
    }
  }
}

const transportsController = new TransportsController();

export { transportsController };
