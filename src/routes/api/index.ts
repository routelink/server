import { Router } from 'express';
import transport from '@app/routes/api/transport';
import analyticsRoutes from './analytics';
import roueteOrgs from './orgs';
import profile from './profile';

const router = Router();

router.use('/transport', transport);
router.use('/profile', profile);
router.use('/orgs', roueteOrgs);
router.use('/analytics', analyticsRoutes);

export default router;
