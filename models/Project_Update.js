/**
 * Update db model
 */

const Sequelize = require("sequelize");
module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    "Project_Update",
    {
      project_update_id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      description: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      project_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: "Project",
          key: "project_id",
        },
      },
    },
    {
      sequelize,
      tableName: "Project_Update",
      timestamps: false,
      indexes: [
        {
          name: "PRIMARY",
          unique: true,
          using: "BTREE",
          fields: [{ name: "project_update_id" }],
        },
        {
          name: "project_update_ibfk_1",
          using: "BTREE",
          fields: [{ name: "project_id" }],
        },
      ],
    }
  );
};
