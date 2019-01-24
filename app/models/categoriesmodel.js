const Sequelize = require('sequelize');

module.exports = (sequelize) => {
  return sequelize.define('categories', {
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
    },
    url: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true
    }
  }, {
    tableName: 'categories',
    timestamps: false
  });
};
