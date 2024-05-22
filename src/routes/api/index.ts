import { Router } from 'express';
import transport from '@app/routes/api/transport';

const router = Router();
router.use('/transport', transport);

export default router;
