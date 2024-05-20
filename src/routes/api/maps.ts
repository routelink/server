import { Router } from 'express';
import { mapsController } from '@app/controllers';

const router = Router();
router.route('').get(mapsController.getCollection);
router.route('').post(mapsController.create);
router.route('/:id').delete(mapsController.delete);
router.route('/:id').get(mapsController.getItem);

export default router;
