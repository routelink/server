import { NextFunction, Request, Response } from 'express';
import { MapsService } from '@app/services';
class MapsController {
  async getCollection(_: Request, res: Response, next: NextFunction) {
    try {
      const mapsService = new MapsService();

      const data = await mapsService.getCollection();
      res.json(data);
    } catch (e) {
      next(e);
    }
  }
  async getSocket() {
    const mapsService = new MapsService();
    const data = await mapsService.getCollection();
    return data;
  }
  async getItem(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const mapsService = new MapsService();
      const data = await mapsService.getItemById(id);
      res.json(data);
    } catch (error) {
      next(error);
    }
  }

  async create(req: Request, res: Response, next: NextFunction) {
    {
      try {
        const { coords, transportId, userId } = req.body;
        const mapsService = new MapsService();
        const data = await mapsService.create({ coords, transportId, userId });
        return res.json(data);
      } catch (error) {
        next(error);
      }
    }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      console.log(id);

      const mapsService = new MapsService();
      const data = await mapsService.delete(id);
      res.json(data);
    } catch (e) {
      next(e);
    }
  }
  async receiveProductActions(/* socket: Socket, actions: any */) {
    return '123';
  }
}

const mapsController = new MapsController();

export { mapsController };
