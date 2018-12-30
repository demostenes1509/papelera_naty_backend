const Sequelize = require('sequelize');

module.exports = function(sequelize) {
  return sequelize.define('userssessions', {
    id: {
      type: Sequelize.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    last_access: {
      type: Sequelize.DATE,
      allowNull: false
    },
    token: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true
    },
    user_id: {
      type: Sequelize.BIGINT,
      allowNull: true,
      references: {
        model: 'users',
        key: 'id'
      }
    }
  }, {
    tableName: 'users_sessions',
    timestamps: false
  });
};
