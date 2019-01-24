const Sequelize = require('sequelize');

module.exports = (sequelize) => {
  return sequelize.define('posters', {
    id: {
      type: Sequelize.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    position: {
      type: Sequelize.INTEGER,
      allowNull: false,
      unique: true
    },
    content_type: {
      type: Sequelize.STRING,
      allowNull: false
    },
    last_update: {
      type: Sequelize.DATE,
      allowNull: false
    },
    category_id: {
      type: Sequelize.BIGINT,
      allowNull: false,
      references: {
        model: 'categories',
        key: 'id'
      }
    },
    product_id: {
      type: Sequelize.BIGINT,
      allowNull: true,
      references: {
        model: 'products',
        key: 'id'
      }
    },
    caption: {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: 'Mensaje'
    }
  }, {
    tableName: 'posters',
    timestamps: false
  });
};
