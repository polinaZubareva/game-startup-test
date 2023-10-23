import pkg from 'pg';
import DB_ENV from '../constants/db.constants.js';

const { Pool } = pkg;

const databaseConnection = new Pool({
  database: DB_ENV.basename,
  user: DB_ENV.username,
  port: DB_ENV.port,
  password: DB_ENV.password,
  host: DB_ENV.host,
});

export default databaseConnection;
