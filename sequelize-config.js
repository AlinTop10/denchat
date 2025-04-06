require('dotenv').config();

/**
 * FYI from oficial documentation
 * Now edit this file and set correct database credentials and dialect.
 * The keys of the objects (e.g. "development") are used on model/index.js
 * for matching process.env.NODE_ENV (When undefined, "development" is a default value).
 */

module.exports = {
  local: {
    dialect: 'mysql',
    host: process.env['DB_HOST'],
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env['DB_PORT'] || 3306,
  },
  dev: {
    dialect: 'mysql',
    host: process.env['DB_HOST'],
    username: process.env['DB_USERNAME'],
    password: process.env['DB_PASSWORD'],
    database: process.env['DB_NAME'],
    port: process.env['DB_PORT'] || 3306,
  },
  production: {
    dialect: 'mysql',
    host: process.env['DB_HOST'],
    username: process.env['DB_USERNAME'],
    password: process.env['DB_PASSWORD'],
    database: process.env['DB_NAME'],
    port: process.env['DB_PORT'] || 3306,
  },
};