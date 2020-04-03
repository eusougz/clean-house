const express = require('express');

const routes = require('./routes');

const CORS = require('./cors');

const app = express();

app.use(express.json());

app.use(CORS.SetPolicy);

app.use(routes);

app.listen(3333);
