import express from 'express';
import { execute } from '@getvim/execute';
import router from './src/app.route.js';
import { APP_PORT } from './src/constants/dev-env.constants.js';
import DB_ENV from './src/constants/db.constants.js';
import databaseConnection from './src/databse/connectionDB.js';
import userBalanceService from './src/userBalance/userBalance.service.js';

const PORT = APP_PORT || 8080;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/', router);

async function startApp() {
  try {
    // backup();
    restore();
    await databaseConnection.query(`CREATE TABLE IF NOT EXISTS users(
            user_id SERIAL PRIMARY KEY,
            balance numeric CHECK (balance > 0)
    );`);
    await userBalanceService.createOne();
  } catch (error) {
    throw new Error(error.message);
  }

  app.listen(PORT, () => {
    console.log(`Server listen in port=${PORT}`);
  });
}

startApp();

function restore() {
  execute(
    `PGPASSWORD=${DB_ENV.password} psql -U postgres -d ${DB_ENV.basename} < test-backup.psql`
  )
    .then(async () => {
      console.log('DB is ready');
    })
    .catch((err) => {
      console.log('error', err);
    });
}

function backup() {
  execute(
    `PGPASSWORD="${DB_ENV.password}" pg_dump -U ${DB_ENV.username} -d ${DB_ENV.basename} -f test-backup.psql`
  )
    .then(async () => {
      console.log('Backup is done');
    })
    .catch((err) => {
      console.log('error', err);
    });
}
