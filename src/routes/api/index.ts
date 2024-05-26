import { Router } from 'express';

import transport from '@app/routes/api/transport';

import analyticsRoutes from './analytics';
import roueteOrgs from './organizations';
import profile from './profile';
import users from './users';

const router = Router();

router.use('/transport', transport);
router.use('/profile', profile);
router.use('/organizations', roueteOrgs);
router.use('/analytics', analyticsRoutes);
router.use('/users', users);

export default router;
