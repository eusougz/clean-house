const express = require('express');
const routes = express.Router();

const UserController = require('./controllers/UserController');
const TaskController = require('./controllers/TaskController');
const TaskWeekController = require('./controllers/TaskWeekController');


routes.get('/users', UserController.getAll );

routes.post('/users', UserController.add );


routes.get('/tasks', TaskController.getAll );

routes.get('/tasks/:name', TaskController.getByUser );

routes.post('/tasks', TaskController.add );

routes.delete('/tasks/:id', TaskController.delete )


routes.get('/tasksWeek', TaskWeekController.getAll );

routes.delete('/tasksWeek/:id', TaskWeekController.delete )


module.exports = routes;

