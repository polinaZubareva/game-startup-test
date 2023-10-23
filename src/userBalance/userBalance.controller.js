import userBalance from './userBalance.service.js';

class UserBalanceController {
  async updateBalance(req, res) {
    const { userId, amount } = req.body;
    res.send({ result: await userBalance.updateBalance(userId, amount) });
  }
}

export default new UserBalanceController();
