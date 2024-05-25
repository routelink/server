import { Router } from 'express';

import { usersController } from '@app/controllers';

const router = Router();

router.route('').get(usersController.getCollections);
router.route('').post(usersController.create);
router.route('/:id').get(usersController.getItem);
router.route('/:id').patch(usersController.update);
router.route('/:id').delete(usersController.delete);

export default router;
