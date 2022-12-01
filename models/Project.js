const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Project', {
    project_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    description: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    publication_date: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    creator_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'AppUser',
        key: 'app_user_id'
      }
    }
  }, {
    sequelize,
    tableName: 'Project',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "project_id" },
        ]
      },
      {
        name: "creator_id",
        using: "BTREE",
        fields: [
          { name: "creator_id" },
        ]
      },
    ]
  });
};
