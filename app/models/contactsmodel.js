const Sequelize = require('sequelize');

module.exports = (sequelize) => {
  return sequelize.define('contact', {
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
    first_name: {
      type: Sequelize.STRING,
      allowNull: false
    },
    last_name: {
      type: Sequelize.STRING,
      allowNull: false
    },
    comments: {
      type: Sequelize.STRING,
      allowNull: false
    },
    sent: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false
    }
  }, {
    tableName: 'contact',
    timestamps: false
  });
};
