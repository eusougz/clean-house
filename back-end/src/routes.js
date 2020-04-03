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

routes.post('/tasks', async (request, response) => {
    const { name, duration, recurrent, date  } = request.body;

    const [id] = await connection('tasks').insert({
        name,
        duration,
        recurrent,
        date
    });

    return response.json({ id });
});



module.exports = routes;

