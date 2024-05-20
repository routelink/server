import { Router } from 'express';
import maps from './maps';
const router = Router();

router.use('/maps', maps);

export default router;
