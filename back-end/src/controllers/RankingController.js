const connection = require('../database/connection');
module.exports = {
    async getRanking (request, response) {
        const user = request.params;
    
        return response.json(tasks);
    }
}