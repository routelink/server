import { Router } from 'express';
import authRoutes from './auth';
import api from './api';
import cookieParser from 'cookie-parser';
import { Auth } from '@app/middlewares';
import { appController } from '@app/controllers';

import roueteOrgs from './api/orgs';

const router = Router();
const auth = new Auth();

router.get('/healthz', appController.healthz);
router.use('/auth', cookieParser(), authRoutes);
router.use('/api', auth.authenticate, api);

/* temp connect 'orgs' for debug*/
router.use('/orgs', roueteOrgs);

export default router;
