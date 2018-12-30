const Sequelize = require('sequelize');

module.exports = function(sequelize) {
  return sequelize.define('transactionsdetail', {
    id: {
      type: Sequelize.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    transaction_header_id: {
      type: Sequelize.BIGINT,
      allowNull: false,
      references: {
        model: 'transactions_header',
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
    },
    price: {
      type: Sequelize.DOUBLE,
      allowNull: false
    }
  }, {
    tableName: 'transactions_detail',
    timestamps: false
  });
};
