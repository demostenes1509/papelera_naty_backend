const modulealias = require('module-alias/register');

exports.up = function() {
  return this.createTable('categories', {
    id     : { type : "serial", key: true },
    name   : { type : "text", required: true }
  });
};
  
exports.down = function () {
  return this.dropTable('categories');
};
  