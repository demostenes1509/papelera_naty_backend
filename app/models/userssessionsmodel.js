const Sequelize = require('sequelize');

module.exports = (sequelize) => {
  const userssessions = sequelize.define('userssessions', {
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
    socket_id: {
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

  userssessions.afterFind('afterUserSessionsFind', (result) => {
    if(result) {
      if(Array.isArray(result)) {
        for (const usersession of result) {
          usersession.isLoggedIn = usersession.user_id!==null;
        }
      }
      else {
        result.isLoggedIn = result.user_id!==null;
      }
    }
  });

  return userssessions;

};
