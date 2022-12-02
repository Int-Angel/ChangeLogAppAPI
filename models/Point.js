const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Point', {
    point_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    description: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    project_update_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'Project_Update',
        key: 'project_update_id'
      }
    }
  }, {
    sequelize,
    tableName: 'Point',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "point_id" },
        ]
      },
      {
        name: "project_update_id",
        using: "BTREE",
        fields: [
          { name: "project_update_id" },
        ]
      },
    ]
  });
};