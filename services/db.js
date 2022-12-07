/**
 * Access to all db models and db connection
 */

"use-strict";
const Sequelize = require("sequelize");
const initModels = require("../models/init-models").initModels;
const config = require("../config");

const sequelize = new Sequelize(
  config.dbConfig.DB,
  config.dbConfig.USER,
  config.dbConfig.PASSWORD,
  { dialect: "mysql" }
);

const models = initModels(sequelize);
const AppUser = models.AppUser;
const Project = models.Project;
const ProjectUpdate = models.Project_Update;
const Point = models.Point;

module.exports = {
  Sequelize,
  sequelize,
  models,
  AppUser,
  Project,
  ProjectUpdate,
  Point,
};
