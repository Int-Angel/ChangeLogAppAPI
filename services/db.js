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

//console.log("DB CONNECTION");
//console.log(initModels);

const models = initModels(sequelize);
const AppUser = models.AppUser;
const Project = models.Project;
const ProjectUpdate = models.Project_Update;
const Point = models.Point;

module.exports = {
  sequelize,
  models,
  AppUser,
  Project,
  ProjectUpdate,
  Point,
};
