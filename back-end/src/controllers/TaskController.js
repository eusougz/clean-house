const connection = require('../database/connection');
const service = require('./services/taskService');

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
    
            const [id] = await connection('tasks').insert({
                user_id,
                name,
                duration,
                recurrent
            });
            
            const task_id = id;

            for (const day of days) {
                let [task_week_id] = await connection('tasks_week').insert({
                    day,
                    user_id,
                    task_id
                });
                task_week_ids.push(task_week_id);
            }
    
            return response.json({ id , task_week_ids });
        }
    
        const [id] = await connection('tasks').insert({
            user_id,
            name,
            duration,
            recurrent,
            date
        });
        
        return response.json({ id });
    },
    async delete (request, response) {
        const { id } = request.params;
    
        await connection('tasks').where('id', id).delete();
    
        return response.status(204).send();
    },
    async deleteAllTasks (request, response) {
        await connection('tasks').delete();
        await connection('tasks_week').delete();

        return response.status(204).send();
    },
    async getTasksDay(request, response) {
        const user = request.params;
        const today = new Date().toISOString().substring(0,10);

        const tasks = await connection('tasks')
            .select('id', 'name', 'duration', 'recurrent', 'date')
            .where('user_id', user.name);
    
        let dayTasks = [];

        for (const task of tasks) {
            let isToday;
            if (task.recurrent) {
                const days  = await connection('tasks_week')
                    .where('task_id', task.id)
                    .where('user_id', user.name)
                    .select('day');
                
                isToday = service.currentDay(days);
            } else {
                isToday = service.currentDate(task);
            }
            
            if (isToday) {
                let completed = false;

                const tasks = await connection('completed_tasks')
                    .select('*')
                    .where('task_id', task.id);

                tasks.forEach(task => {
                    const taskDate = task.date.substring(0,10);
                    if (today === taskDate) {
                        completed = true;
                    }
                });

                dayTasks.push({
                    task,
                    completed
                });
            }
        }

        return response.json(dayTasks);
    }
}