const Sequelize = require('sequelize');

module.exports = function(sequelize) {
  const users = sequelize.define('users', {
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

  users.afterFind('afterUserFind', (result) => {
    if(result) {
      if(Array.isArray(result)) {
        for (const user of result) {
          user.fullName = `${user.first_name} ${user.last_name}`;
        }
      }
      else {
        result.fullName = `${result.first_name} ${result.last_name}`;
      }
    }
  });

  return users;
};
