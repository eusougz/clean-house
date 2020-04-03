
exports.up = function(knex) {
  return knex.schema.createTable('users', function (table) {
      table.string('name').primary();
    });
};

exports.down = function(knex) {
  return knex.schema.dropTable('users');
};
