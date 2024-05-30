import { Router } from 'express';

import { fuelController, insureController, serviceController } from '@app/controllers';
import { Validation } from '@app/middlewares';
import { Service } from '@app/models';

const routerAnalytics = Router();

routerAnalytics.get('/insure', insureController.getInsure);
routerAnalytics.get(
  '/service',
  Validation.res(Service, ['read']),
  serviceController.getService,
);
routerAnalytics.get('/fuel', fuelController.getFuel);

export default routerAnalytics;
