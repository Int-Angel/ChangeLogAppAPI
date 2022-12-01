const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('AppUser', {
    app_user_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    username: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    email: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    pass: {
      type: DataTypes.STRING(255),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'AppUser',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "app_user_id" },
        ]
      },
    ]
  });
};
