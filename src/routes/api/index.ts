import { Router } from 'express';
import analyticsRoutes from './analytics';
import roueteOrgs from './orgs';

const router = Router();

router.use('/orgs', roueteOrgs);
router.use('/analytics', analyticsRoutes);

export default router;
