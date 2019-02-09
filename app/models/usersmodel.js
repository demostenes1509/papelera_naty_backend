const Sequelize = require('sequelize');

module.exports = (sequelize) => {
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
      allowNull: true
    },
    first_name: {
      type: Sequelize.STRING,
      allowNull: true
    },
    last_name: {
      type: Sequelize.STRING,
      allowNull: true
    },
    full_name: {
      type: Sequelize.STRING,
      allowNull: true
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
		},
		provider: {
			type: Sequelize.STRING,
			allowNull: true
		},
		facebook_id: {
			type: Sequelize.STRING,
			allowNull: true
		},
		google_id: {
			type: Sequelize.STRING,
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
					if(user.first_name && user.last_name) user.fullName = `${user.first_name} ${user.last_name}`;
					else user.fullName = `${user.full_name}`;
        }
      }
      else {
				if(result.first_name && result.last_name) {
					result.fullName = `${result.first_name} ${result.last_name}`;
				}
				else {
					result.fullName = `${result.full_name}`;
				}
      }
    }
  });

  return users;
};
