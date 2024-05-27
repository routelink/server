import { Router } from 'express';

import { usersController } from '@app/controllers';
import { Validation } from '@app/middlewares';
import { User } from '@app/models';

const router = Router();

router.route('').get(Validation.res(User, ['read']), usersController.getCollections);
router
  .route('')
  .post(
    Validation.req(User, ['write']),
    Validation.res(User, ['read']),
    usersController.create,
  );
router.route('/:id').get(Validation.res(User, ['read']), usersController.getItem);
router
  .route('/:id')
  .patch(
    Validation.req(User, ['write']),
    Validation.res(User, ['read']),
    usersController.update,
  );
router.route('/:id').delete(usersController.delete);

export default router;
