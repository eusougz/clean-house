const connection = require('../database/connection');

module.exports = {
    async getAll (request, response) {
        const tasks = await connection('tasks_week').select('*');
    
        return response.json(tasks);
    },
    async getDay (request, response) {
        const { userId, taskId } = request.params;

        const [{day}]  = await connection('tasks_week')
            .where('task_id', taskId)
            .where('user_id', userId)
            .select('day');

        return response.json({ day });
    },
    async delete (request, response) {
        const { id } = request.params;
    
        await connection('tasks_week').where('id', id).delete();
    
        return response.status(204).send();
    }
}