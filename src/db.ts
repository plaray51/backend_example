import { Pool } from 'pg';
import 'dotenv/config';

function getEnvVar(name: string): string {
    const value = process.env[name];
    if (value === undefined) {
        throw new Error(`Environment variable ${name} is not set.`);
    }
    return value;
}

const pool = new Pool({
  user: getEnvVar('DB_USER'),
  host: getEnvVar('DB_HOST'),
  database: getEnvVar('DB_NAME'),
  password: getEnvVar('DB_PASS'),
  port: parseInt(getEnvVar('DB_PORT'), 10)
});

export default pool;