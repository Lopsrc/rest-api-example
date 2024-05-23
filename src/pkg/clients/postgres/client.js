const Pool = require('pg').Pool;
const config = require('../../../config/config');

const pool = new Pool({
    max: 10,
    connectionString: config.database
});

module.exports = pool;