
exports.up = function(knex) {
    return knex.schema.createTable('completed_tasks', function (table) {
        table.increments();
        table.string('date').notNullable();
        
        table.integer('task_id').notNullable();

        table.foreign('task_id').references('id').inTable('tasks');
      });
};

exports.down = function(knex) {
    return knex.schema.dropTable('completed_tasks');
};
