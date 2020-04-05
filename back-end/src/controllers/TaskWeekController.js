const connection = require('../database/connection');

module.exports = {
    async getAll (request, response) {
        const tasks = await connection('tasks_week').select('*');
    
        return response.json(tasks);
    },
    async delete (request, response) {
        const { id } = request.params;
    
        await connection('tasks_week').where('id', id).delete();
    
        return response.status(204).send();
    }
}