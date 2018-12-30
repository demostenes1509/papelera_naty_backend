const Sequelize = require('sequelize');

module.exports = function(sequelize) {
  return sequelize.define('users', {
    id: {
      type: Sequelize.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    email_address: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true
    },
    password: {
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
    role_id: {
      type: Sequelize.BIGINT,
      allowNull: false,
      references: {
        model: 'roles',
        key: 'id'
      }
    },
    address: {
      type: Sequelize.STRING,
      allowNull: true
    },
    city: {
      type: Sequelize.STRING,
      allowNull: true
    },
    telephone: {
      type: Sequelize.STRING,
      allowNull: true
    },
    zipcode: {
      type: Sequelize.DOUBLE,
      allowNull: true
    },
    state: {
      type: Sequelize.DOUBLE,
      allowNull: true
    }
  }, {
    tableName: 'users',
    timestamps: false
  });
};
