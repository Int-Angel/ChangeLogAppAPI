var DataTypes = require("sequelize").DataTypes;
var _AppUser = require("./AppUser");
var _Point = require("./Point");
var _Project = require("./Project");
var _Project_Update = require("./Project_Update");

function initModels(sequelize) {
  var AppUser = _AppUser(sequelize, DataTypes);
  var Point = _Point(sequelize, DataTypes);
  var Project = _Project(sequelize, DataTypes);
  var Project_Update = _Project_Update(sequelize, DataTypes);

  Project.belongsTo(AppUser, { as: "creator", foreignKey: "creator_id" });
  AppUser.hasMany(Project, { as: "projects", foreignKey: "creator_id" });
  Project_Update.belongsTo(Project, {
    as: "project",
    foreignKey: "project_id",
  });
  Project.hasMany(Project_Update, {
    as: "project_updates",
    foreignKey: "project_id",
  });
  Point.belongsTo(Project_Update, {
    as: "project_update",
    foreignKey: "project_update_id",
  });
  Project_Update.hasMany(Point, {
    as: "points",
    foreignKey: "project_update_id",
  });

  return {
    AppUser,
    Point,
    Project,
    Project_Update,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
