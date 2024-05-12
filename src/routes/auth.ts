import { Router } from 'express';
import { authController } from '@app/controllers';
import { Credentials } from '@app/models';
import { Validation } from '@app/middlewares';

const router = Router();
router.route('/login').post(Validation.req(Credentials, ['write']), authController.login);
router.route('/refresh').post(authController.refresh);

export default router;
