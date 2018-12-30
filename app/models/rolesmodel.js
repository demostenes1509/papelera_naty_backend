const Sequelize = require('sequelize');

module.exports = function(sequelize) {
  return sequelize.define('roles', {
    id: {
      type: Sequelize.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true
    }
  }, {
    tableName: 'roles',
    timestamps: false
  });
};
