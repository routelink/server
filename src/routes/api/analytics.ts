import { Router } from 'express';

import { fuelController, insureController, serviceController } from '@app/controllers';

const routerAnalytics = Router();

routerAnalytics.get('/insure', insureController.getInsure);
routerAnalytics.get('/service', serviceController.getService);
routerAnalytics.get('/fuel', fuelController.getFuel);

export default routerAnalytics;
