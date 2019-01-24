const Sequelize = require('sequelize');

module.exports = (sequelize) => {
  return sequelize.define('packaging', {
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
    tableName: 'packaging',
    timestamps: false
  });
};
