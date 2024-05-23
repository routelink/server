import { Router } from 'express';
import { getTransportWithUserCount } from '@app/controllers/analytics/insures';

const router = Router();

router.get('/insures/user-count', getTransportWithUserCount);

export default router;
