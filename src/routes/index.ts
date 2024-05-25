import cookieParser from 'cookie-parser';
import { Router } from 'express';

import { appController } from '@app/controllers';
import { Auth } from '@app/middlewares';

import api from './api';
import routeEmployees from './api/employees';
import authRoutes from './auth';

const router = Router();
const auth = new Auth();

router.get('/healthz', appController.healthz);
router.use('/auth', cookieParser(), authRoutes);
router.use('/api', auth.authenticate, api);
router.use('/employees', routeEmployees);

export default router;
