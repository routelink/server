import { Router } from 'express';
import analyticsRoutes from './analytics';
import roueteOrgs from './orgs';

import profile from './profile';

const router = Router();

router.use('/profile', profile);
router.use('/orgs', roueteOrgs);
router.use('/analytics', analyticsRoutes);

export default router;
