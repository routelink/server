import { Router } from 'express';

import profile from '@app/routes/api/profile';

const router = Router();

router.use('/profile', profile);

export default router;
