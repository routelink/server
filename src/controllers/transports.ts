import { NextFunction, Request, Response } from 'express';

import { TransportService } from '@app/services/transport';
import { GetTransportsPayload, ITransport } from '@app/types';

type RequestWithBody<T> = Request<{}, {}, T>;
type RequestWithQuery<T> = Request<{}, {}, {}, T>;
// type RequestWithParams<T> = Request<T>

class TransportsController {
  async getTransportTypes(_: Request, res: Response, next: NextFunction) {
    try {
      const transportService = new TransportService();
      const rows = await transportService.getTypes();
      res.json(rows);
    } catch (e) {
      next(e);
    }
  }

  async items(
    req: RequestWithQuery<GetTransportsPayload>,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const transportService = new TransportService();
      const rows = await transportService.getItems(req.query);

      res.json({ rows });
    } catch (e) {
      next(e);
    }
  }

  async addItem(req: RequestWithBody<ITransport>, res: Response, next: NextFunction) {
    try {
      const transportService = new TransportService();
      const newTransport = await transportService.addItem(req.body);
      res.status(200).json(newTransport);
    } catch (e) {
      next(e);
    }
  }
  async editItem(req: Request, res: Response, next: NextFunction) {
    try {
      const transportService = new TransportService();
      const newTransport = await transportService.editItem(
        req.body,
        Number(req.params.id),
      );
      res.status(200).json(newTransport);
    } catch (e) {
      next(e);
    }
  }

  async deleteItem(req: any, res: Response, next: NextFunction) {
    try {
      const transportService = new TransportService();
      await transportService.deleteItem(req.params.id);
      res.json({ message: 'Transport deleted' });
    } catch (e) {
      next(e);
    }
  }
}

const transportsController = new TransportsController();

export { transportsController };
