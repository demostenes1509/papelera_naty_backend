const Sequelize = require('sequelize');

module.exports = function(sequelize) {
  return sequelize.define('transactionsheader', {
    id: {
      type: Sequelize.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    user_id: {
      type: Sequelize.BIGINT,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    purchase_date: {
      type: Sequelize.DATE,
      allowNull: false
    },
    delivery_type: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    payment_type: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    total_purchase: {
      type: Sequelize.DOUBLE,
      allowNull: false
    },
    mail_sent: {
      type: Sequelize.BOOLEAN,
      allowNull: false
    },
    comments: {
      type: Sequelize.STRING,
      allowNull: true
    }
  }, {
    tableName: 'transactions_header',
    timestamps: false
  });
};
