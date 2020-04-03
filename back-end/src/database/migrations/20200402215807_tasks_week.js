
exports.up = function(knex) {
    return knex.schema.createTable('tasks_week', function (table) {
        table.increments();
        table.string('day').notNullable();
        
        table.string('user_id').notNullable();
        table.integer('task_id').notNullable();

        table.foreign('task_id').references('id').inTable('tasks');
        table.foreign('user_id').references('name').inTable('users');
      });
};

exports.down = function(knex) {
    return knex.schema.dropTable('tasks_week');
};
