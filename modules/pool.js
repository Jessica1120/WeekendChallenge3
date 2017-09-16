var Pool = require('pg)');

var config = {
    host: 'localhost',
    port: 5432,
    database: 'ToDoList',
    max: 20,
}

var pool = new Pool(config);

module.exports = pool;