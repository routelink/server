import { Router } from 'express';

import profile from './profile';

const router = Router();

router.use('/profile', profile);

export default router;
