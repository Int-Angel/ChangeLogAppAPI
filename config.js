"use-strict";
const dotenv = require("dotenv");
const assert = require("assert");

dotenv.config();

const {
  PORT,
  HOST,
  HOST_URL,
  DB_HOST,
  DB_USER,
  DB_PASS,
  DB_DATABASE,
  COOKIE_SECRET,
} = process.env;

assert(PORT, "PORT is REQUIRED");
assert(HOST, "HOST is REQUIRED");

module.exports = {
  port: PORT,
  host: HOST,
  host_url: HOST_URL,
  dbConfig: {
    HOST: DB_HOST,
    USER: DB_USER,
    PASSWORD: DB_PASS,
    DB: DB_DATABASE,
    dialect: "mysql",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  },
  cookie_secret: COOKIE_SECRET,
};
