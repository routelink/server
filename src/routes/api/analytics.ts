import { Router } from 'express';
import { getTransportWithUserCount } from '@app/controllers';

const router = Router();

router.get('/insures/user-count', getTransportWithUserCount);

export default router;
