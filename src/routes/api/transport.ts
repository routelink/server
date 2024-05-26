import { Router } from 'express';

import { transportsController } from '@app/controllers';
import { Validation } from '@app/middlewares';
import { Transport } from '@app/models';

const router = Router();
router.route('/types').get(transportsController.getTransportTypes);
router.route('/items').post(transportsController.items);
router.route('/add').post(Validation.req(Transport), transportsController.addItem);
router.route('/delete').post(Validation.req(Transport), transportsController.deleteItem);

export default router;
