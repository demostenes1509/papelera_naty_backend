const Sequelize = require('sequelize');

module.exports = (sequelize) => {
  return sequelize.define('productsformats', {
    id: {
      type: Sequelize.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    product_id: {
      type: Sequelize.BIGINT,
      allowNull: false,
      references: {
        model: 'products',
        key: 'id'
      },
      unique: true
    },
    format: {
      type: Sequelize.STRING,
      allowNull: false,
      primaryKey: true
    },
    quantity: {
      type: Sequelize.DOUBLE,
      allowNull: false
    },
    units: {
      type: Sequelize.DOUBLE,
      allowNull: false
    },
    wholesale: {
      type: Sequelize.DOUBLE,
      allowNull: false
    },
    retail: {
      type: Sequelize.DOUBLE,
      allowNull: false
    }
  }, {
    tableName: 'products_formats',
    timestamps: false
  });
};
