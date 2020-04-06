const connection = require('../database/connection');

module.exports = {
    async getAll (request, response) {
        const tasks = await connection('tasks').select('*');
    
        return response.json(tasks);
    },
    async getByUser (request, response) {
        const user = request.params;
        const tasks = await connection('tasks')
            .select('id', 'name', 'duration', 'recurrent', 'date')
            .where('user_id', user.name);
    
        return response.json(tasks);
    },
    async add (request, response) {
        const { user_id, name, duration, recurrent, date, days  } = request.body;
    
        if (recurrent) {
            let task_week_ids = [];
    
            const [task_id] = await connection('tasks').insert({
                user_id,
                name,
                duration,
                recurrent
            });
    
            for (const day of days) {
                let [task_week_id] = await connection('tasks_week').insert({
                    day,
                    user_id,
                    task_id
                });
                task_week_ids.push(task_week_id);
            }
    
            return response.json({ task_id, task_week_ids });
        }
    
        const [task_id] = await connection('tasks').insert({
            user_id,
            name,
            duration,
            recurrent,
            date
        });
        
        return response.json({ task_id });
    },
    async delete (request, response) {
        const { id } = request.params;
    
        await connection('tasks').where('id', id).delete();
    
        return response.status(204).send();
    }
}