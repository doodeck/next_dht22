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

function id2date(id) {
    return {
        d: parseInt(id.substr(0, 2)),
        m: parseInt(id.substr(2, 2)),
        y: parseInt(id.substr(4, 4))
    }
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
            id: date2id(tuple),
            date: '' + tuple.y + '-' + tuple.m + '-' + tuple.d
        }
    })
    return allTupleData
}

export async function getAllTupleIds() {
    let results
    try {
        results = await pool.query('select extract (day from ts) d, extract (month from ts) m, extract (year from ts) y from measurements group by y, m, d');
    } catch (error) {
        // throw error
        return null
    }
    // console.log('results', results.rows)
    let allTupleIds = results.rows.map(tuple => {
        return {
            params: {
              id: date2id(tuple)
            }
          }
    })
    // console.log('allTupleIds: ', allTupleIds)
    return allTupleIds
}

export async function getAllTupleData(id) {
    let datetuple = id2date(id)
    let datestring = '' + datetuple.y + '-' + datetuple.m + '-' + datetuple.d
    console.log('datestring: ', datestring)
    let results
    try {
        results = await pool.query("select to_char(ts, 'MM-DD-YYYY HH24:MI:SS'),gpio,temp,hum,id_key from measurements where ts >= DATE('" + datestring + "') AND ts < (DATE '" + datestring + "' + interval '1 day') order by ts"); //  integer '1'
    } catch (error) {
        // throw error
        return null
    }
    // console.log('results', results.rows)
    return results.rows
}