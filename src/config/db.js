const { Pool } = require('pg')

module.exports = new Pool ({
    user: 'postgres',
    password: '123hawk',
    host: 'localhost',
    port: 5432,
    database: 'launchstoredb'
})