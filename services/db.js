"use-strict";
const mysql = require("mysql");
const config = require("../config");

const conn = mysql.createConnection(config.dbConfig);

conn.connect();

module.exports = conn;
