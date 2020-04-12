const express = require('express');
const routes = express.Router();

const UserController = require('./controllers/UserController');
const TaskController = require('./controllers/TaskController');
const TaskWeekController = require('./controllers/TaskWeekController');
const CompletedTasksController = require('./controllers/CompletedTasksController');


routes.get('/users', UserController.getAll );

routes.post('/users', UserController.add );


routes.get('/tasks', TaskController.getAll );

routes.get('/tasks/:name', TaskController.getByUser );

routes.post('/tasks', TaskController.add );

routes.delete('/tasks/:id', TaskController.delete );

routes.delete('/tasks', TaskController.deleteAllTasks );


routes.get('/tasksWeek', TaskWeekController.getAll );

routes.get('/tasksWeek/:userId/:taskId', TaskWeekController.getDay );

routes.delete('/tasksWeek/:id', TaskWeekController.delete );


routes.get('/completedTasks', CompletedTasksController.getAll );

routes.get('/completedTasks/:taskId', CompletedTasksController.completedTask );

routes.post('/completedTasks', CompletedTasksController.add );

routes.delete('/completedTasks', CompletedTasksController.deleteAll );


module.exports = routes;

