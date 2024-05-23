import { Router } from 'express';

import { profileController } from '@app/controllers';

const router = Router();

router.route('').get(profileController.getProfile);
router.route('').patch(profileController.updateProfile);

export default router;
