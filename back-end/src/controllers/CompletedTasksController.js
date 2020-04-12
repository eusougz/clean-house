const connection = require('../database/connection');

module.exports = {
    async add (request, response) {
        const { task_id, date } = request.body;

        const [id] = await connection('completed_tasks').insert({
            task_id,
            date
        });

        return response.json({ id });
    },
    async getAll (request, response) {
        const completedTasks = await connection('completed_tasks').select('*');
    
        return response.json(completedTasks);
    },
    async deleteAll (request, response) {
        await connection('completed_tasks').delete();

        return response.status(204).send();
    },
    async completedTask (request, response) {
        let completed = false;
        const params = request.params;
        const today = new Date().toISOString().substring(0,10);
        
        const tasks = await connection('completed_tasks')
            .select('*')
            .where('task_id',parseInt(params.taskId));

        tasks.forEach(task => {
            const taskDate = task.date.substring(0,10);
            if (today === taskDate) {
                completed = true;
            }
        });

        return response.json({ completed });
    }
}