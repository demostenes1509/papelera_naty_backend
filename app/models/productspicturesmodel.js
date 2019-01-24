const Sequelize = require('sequelize');

module.exports = (sequelize) => {
  return sequelize.define('productspictures', {
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
      }
    },
    content_type: {
      type: Sequelize.STRING,
      allowNull: false
    },
    last_update: {
      type: Sequelize.DATE,
      allowNull: false
    }
  }, {
    tableName: 'products_pictures',
    timestamps: false
  });
};
