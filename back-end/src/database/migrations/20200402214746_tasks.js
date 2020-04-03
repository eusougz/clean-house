
exports.up = function(knex) {
    return knex.schema.createTable('tasks', function (table) {
        table.increments();
        table.string('name').notNullable();
        table.string('duration').notNullable();
        table.boolean('recurrent').notNullable();
        table.date('date');
        
        table.string('user_id').notNullable();

        table.foreign('user_id').references('name').inTable('users');
      });
};

exports.down = function(knex) {
  return knex.schema.dropTable('tasks');
};
