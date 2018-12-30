const Sequelize = require('sequelize');

module.exports = function(sequelize) {
  return sequelize.define('mailing', {
    id: {
      type: Sequelize.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    email_address: {
      type: Sequelize.STRING,
      allowNull: false
    },
    token: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true
    },
    verified: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    sent: {
      type: Sequelize.BOOLEAN,
      allowNull: false
    },
    immediate: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false
    }
  }, {
    tableName: 'mailing',
    timestamps: false
  });
};
