const modulealias = require('module-alias/register');

exports.up = function() {
  return this.addForeignKey('products',
      { name:       'category_id',
      references: { table: 'categories', column: 'id' }
  });
};
  
exports.down = function () {
  return this.dropForeignKey('products','category_id');
};
  