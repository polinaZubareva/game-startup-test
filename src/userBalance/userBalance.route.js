import { Router } from 'express';
import userBalanceController from './userBalance.controller.js';

const userBalanceRouter = Router();

userBalanceRouter.post('/', userBalanceController.updateBalance);

export default userBalanceRouter;
