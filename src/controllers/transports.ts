import { NextFunction, Request, Response } from 'express';
import fs from 'fs';
import path from 'path';

import { TransportService } from '@app/services/transport';
import { GetTransportsPayload, ITransport } from '@app/types';

const jsonFilePath = path.join(__dirname, '../../config/transportTypes.json');

type RequestWithBody<T> = Request<{}, {}, T>;
// type RequestWithQuery<T> = Request<{}, {}, {}, T>;
// type RequestWithParams<T> = Request<T>

class TransportsController {
  async getTransportTypes(_: Request, res: Response) {
    fs.readFile(jsonFilePath, 'utf8', (err, data) => {
      if (err) {
        console.log(err);
        return res.status(500).send('');
      }

      let transportTypes;
      try {
        transportTypes = JSON.parse(data);
      } catch (error) {
        console.error('Error parsing JSON:', error);
        return res.status(500).send('Ошибка чтения');
      }

      res.json(transportTypes);
    });
  }

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
      await transportService.addTransport(req.body);
      res.status(200).json({ response: 'ok' });
    } catch (e) {
      next(e);
      //res.status(401).json({ status: AUTH.REFRESH_ERROR, message: 'Error refresh token' });
    }
  }
}

const transportsController = new TransportsController();

export { transportsController };
