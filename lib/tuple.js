// tuple.js
// interface to rertieve measured data from the backend. for now - postgresql database

const { Pool } = require('pg');
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

// https://stackoverflow.com/questions/2998784/how-to-output-numbers-with-leading-zeros-in-javascript
function pad(num, size) {
    var s = "000000000" + num;
    return s.substr(s.length-size);
}

function date2id(tuple) {
    return '' + pad(tuple.d, 2) + pad(tuple.m, 2) + tuple.y
}

export async function getSortedTupleData() {
    let results
    try {
        results = await pool.query('select extract (day from ts) d, extract (month from ts) m, extract (year from ts) y from measurements group by y, m, d order by y, m, d');
    } catch (error) {
        // throw error
        return null
    }
    // console.log('results', results.rows)
    let allTupleData = results.rows.map(tuple => {
        return {
            id: date2id(tuple)
        }
    })
    return allTupleData
}
