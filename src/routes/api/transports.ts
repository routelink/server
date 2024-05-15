import { Router } from 'express';
import { transportsController } from '@app/controllers';

const router = Router();
router.route('/get').post(transportsController.get);
router.route('/add').post(transportsController.add);

export default router;
