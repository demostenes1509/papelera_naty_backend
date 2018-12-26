const modulealias = require('module-alias/register');

exports.up = function() {
    return this.createTable('products', {
      id     : { type : "serial", key: true },
      name   : { type : "text", required: true },
      category_id : { type : "integer", size: 8, required: true },
    }); 
};
  
exports.down = function () {
  return this.dropTable('products');
};
  