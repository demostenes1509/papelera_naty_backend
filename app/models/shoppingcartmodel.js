const Sequelize = require('sequelize');

module.exports = function(sequelize) {
  return sequelize.define('shoppingcart', {
    id: {
      type: Sequelize.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    user_session_id: {
      type: Sequelize.BIGINT,
      allowNull: false,
      references: {
        model: 'users_sessions',
        key: 'id'
      }
    },
    product_format_id: {
      type: Sequelize.BIGINT,
      allowNull: false,
      references: {
        model: 'products_formats',
        key: 'id'
      }
    },
    quantity: {
      type: Sequelize.DOUBLE,
      allowNull: false
    }
  }, {
    tableName: 'shopping_cart',
    timestamps: false
  });
};
