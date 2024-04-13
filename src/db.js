"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = require("pg");
require("dotenv/config");
function getEnvVar(name) {
    const value = process.env[name];
    if (value === undefined) {
        throw new Error(`Environment variable ${name} is not set.`);
    }
    return value;
}
const pool = new pg_1.Pool({
    user: getEnvVar('DB_USER'),
    host: getEnvVar('DB_HOST'),
    database: getEnvVar('DB_NAME'),
    password: getEnvVar('DB_PASS'),
    port: parseInt(getEnvVar('DB_PORT'), 10)
});
exports.default = pool;
