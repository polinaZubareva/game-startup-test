import { Router } from 'express';
import userBalanceRouter from './userBalance/userBalance.route.js';

const router = Router();

router.use('/', userBalanceRouter);

export default router;
