import { Router } from 'express';
import authRoutes from './auth';
import api from './api';
import cookieParser from 'cookie-parser';
import { Auth } from '@app/middlewares';
import { appController } from '@app/controllers';

import routeEmployees from './api/employees';

const router = Router();
const auth = new Auth();

router.get('/healthz', appController.healthz);
router.use('/auth', cookieParser(), authRoutes);
router.use('/api', auth.authenticate, api);
router.use('/employees', routeEmployees);

export default router;
