const knex = require('knex');
const configuration_database = require('../../knexfile');

const connection = knex(configuration_database.development);

module.exports = connection;