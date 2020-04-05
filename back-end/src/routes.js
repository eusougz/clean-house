const express = require('express');

const routes = express.Router();

const connection = require('./database/connection');

routes.get('/users', async (request, response) => {
    const users = await connection('users').select('*');

    return response.json(users);
});

routes.post('/users', async (request, response) => {
    const data = request.body;

    const name = data.name;

    const [id] = await connection('users').insert({
        name
    });

    return response.json({ id });
});


routes.get('/tasks', async (request, response) => {
    const tasks = await connection('tasks').select('*');

    return response.json(tasks);
});

routes.get('/tasks/:name', async (request, response) => {
    const user = request.params;
    const tasks = await connection('tasks')
        .select('*')
        .where('user_id', user.name);

    return response.json(tasks);
});

routes.post('/tasks', async (request, response) => {
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
    
});

routes.delete('/tasks/:id', async (request, response) => {
    const { id } = request.params;

    await connection('tasks').where('id', id).delete();

    return response.status(204).send();
})


routes.get('/tasksWeek', async (request, response) => {
    const tasks = await connection('tasks_week').select('*');

    return response.json(tasks);
});

routes.delete('/tasksWeek/:id', async (request, response) => {
    const { id } = request.params;

    await connection('tasks_week').where('id', id).delete();

    return response.status(204).send();
})


module.exports = routes;

