import { Router } from 'express';

import { authController } from '@app/controllers';
import { Auth, Validation } from '@app/middlewares';
import { Credentials } from '@app/models';

const router = Router();
const auth = new Auth();
router.route('/login').post(Validation.req(Credentials, ['write']), authController.login);
router.route('/refresh').post(authController.refresh);
router.route('/logout').post(auth.authenticate, authController.logout);
router.route('/logout/all').post(auth.authenticate, authController.logoutAll);

export default router;
