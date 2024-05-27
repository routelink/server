import { Router } from 'express';

import { profileController } from '@app/controllers';

const router = Router();

//router.route('').get(profileController.getProfile);
//router.route('').patch(profileController.updateProfile);
router.route('').get(profileController.getProfile);
router.route('/username').patch(profileController.changeUserName);
router.route('/password').patch(profileController.changePassword);

export default router;
