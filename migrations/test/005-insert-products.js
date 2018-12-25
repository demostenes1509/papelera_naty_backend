const modulealias = require('module-alias/register');

exports.up = function() {

  const insert = `
  insert into products ( name, category_id ) values
  ('producto 1',1),
  ('producto 2',2),
  ('producto 3',3)
  `;

  return this.execQuery(insert,'');
};
  
exports.down = function () {
  return this.execQuery(`delete from products`,'');
};
  