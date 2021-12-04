// tuple.js
// interface to rertieve measured data from the backend. for now - postgresql database

const { Pool } = require('pg');
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

export async function getSortedTupleData() {
    let results
    try {
        results = await pool.query('select extract (day from ts) d, extract (month from ts) m from measurements group by m, d');
    } catch (error) {
        // throw error
        return null
    }
    // console.log('results', results.rows)
    return results.rows
}
