module.exports = require('knex')({
    client: 'mysql',
    connection: {
        host: '47.100.42.200',
        port: 3306,
        user: 'ChinaVis2019',
        database: 'ChinaVis2019',
        password: 'admin',
        char: 'utf8mb4'
    }
});