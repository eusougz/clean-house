const connection = require('../database/connection');

module.exports = {
    async getAll (request, response) {
        const users = await connection('users').select('*');
    
        return response.json(users);
    },
    async add (request, response) {
        const data = request.body;
        const name = data.name;

        const [id] = await connection('users').insert({
            name
        });
    
        return response.json({ id });
    }
}