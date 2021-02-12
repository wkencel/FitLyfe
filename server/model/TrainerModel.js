const { Pool } = require('pg');
const config = require('../../config')
const PG_URI = config.URI;

// declare a variable for the new pool connection string
const pool = new Pool({
  connectionString: PG_URI,
});

module.exports = pool;

// module.exports = {
//   query: (text, params, callback) => {
//     console.log("executed query", text);
//     return pool.query(text, params, callback);
//   }
// }