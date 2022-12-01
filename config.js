"use-strict";
const dotenv = require("dotenv");
const assert = require("assert");

dotenv.config();

const { PORT, HOST, HOST_URL, DB_HOST, DB_USER, DB_PASS, DB_DATABASE } =
  process.env;

assert(PORT, "PORT is REQUIRED");
assert(HOST, "HOST is REQUIRED");

module.exports = {
  port: PORT,
  host: HOST,
  host_url: HOST_URL,
  dbConfig: {
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASS,
    database: DB_DATABASE,
  },
};
