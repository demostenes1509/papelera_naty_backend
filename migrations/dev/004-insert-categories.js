const modulealias = require('module-alias/register');

exports.up = function() {

  const insert = `
  insert into categories ( name ) values
  ('categoria 1'),
  ('categoria 2'),
  ('categoria 3')
  `;

  return this.execQuery(insert,'');
};
  
exports.down = function () {
  return this.execQuery(`delete from categories`,'');
};
  