import databaseConnection from '../databse/connectionDB.js';

class UserBalanceService {
  async updateBalance(userId, amount) {
    let result;
    try {
      result = (
        await databaseConnection.query(
          `UPDATE users SET balance = balance + ($2::int)
        WHERE user_id = $1
        RETURNING *;`,
          [userId, amount]
        )
      ).rows;
    } catch (error) {
      result = 'There are insufficient funds in the account';
      console.log(error.message);
    }
    return result;
  }

  async createOne() {
    return await databaseConnection.query(
      `INSERT INTO users(balance) VALUES ($1) RETURNING *;`,
      [10000]
    );
  }
}

export default new UserBalanceService();
