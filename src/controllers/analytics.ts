import { NextFunction, Request, Response } from 'express';
import { Op } from 'sequelize';

import { FuelService, InsureService, ServiceService } from '@app/services/analytics';

class InsureController {
  async getInsure(_req: Request, res: Response, next: NextFunction) {
    try {
      const insureService = new InsureService();
      const insure = await insureService.findAll();

      if (!insure || insure.length === 0) {
        return res.status(400).json({ message: `not found any insures` });
      }
      return res.status(200).json({ message: `insures: ${insure}` });
    } catch (error) {
      next(error);
    }
  }
}

class ServiceController {
  async getService(req: Request, res: Response, next: NextFunction) {
    try {
      const serviceService = new ServiceService();
      const { beginDate, endDate } = req.query;
      if (beginDate && endDate) {
        return res.json(
          await serviceService.findAll({
            where: {
              updatedAt: {
                [Op.between]: [beginDate, endDate],
              },
            },
          }),
        );
      } else return res.json(await serviceService.findAll());
    } catch (error) {
      next(error);
    }
  }
}

class FuelController {
  async getFuel(_req: Request, res: Response, next: NextFunction) {
    try {
      const fuelService = new FuelService();
      const fuel = await fuelService.findAll();

      if (!fuel || fuel.length === 0) {
        return res.status(400).json({ message: `not found any fuel` });
      }
      return res.status(200).json({ message: `insures: ${fuel}` });
    } catch (error) {
      next(error);
    }
  }
}

const insureController = new InsureController();
const serviceController = new ServiceController();
const fuelController = new FuelController();

export { insureController, serviceController, fuelController };
