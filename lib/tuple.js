// tuple.js
// interface to rertieve measured data from the backend. for now - postgresql database

const { config } = require('./config')
const { Pool } = require('pg');
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});
const filterNone = config.filter.none;

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

function isFilterNone(val) {
    return val === filterNone
}

// getStaticProps for landing page - list of dates
export async function getSortedTupleData() {
    let results
    try {
        results = await pool.query('select extract (day from ts) d, extract (month from ts) m, extract (year from ts) y from measurements group by y, m, d order by y, m, d')
    } catch (error) {
        throw error
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

// getStaticPaths() for the table view - list of dates
export async function getAllTupleIds() {
    let results
    try {
        results = await pool.query("select to_char(ts, 'DDMMYYYY') dd from measurements group by dd")
    } catch (error) {
        throw error
        return null
    }
    // console.log('results', results.rows)
    let allTupleIds = results.rows.map(tuple => {
        return {
            params: {
              id: tuple.dd
            }
          }
    })
    // console.log('allTupleIds: ', allTupleIds)
    return allTupleIds
}

// getStaticPaths() for the filtered table view - list of dates, ids, gpios
export async function getFilteredTupleIds() {
    let allTupleIds = []
    for (const ddval of [ "to_char(ts, 'DDMMYYYY')", "-1" ]) {
        for (const idval of [ "id_key", "-1" ]) {
            for (const gpval of [ "gpio", "-1" ]) {
                // const values = [ddval, idval, gpval]
                let results
                try {
                    const query = `select ${ddval} dd, ${idval} esp, ${gpval} gp from measurements group by dd,esp,gp`
                    // console.log(query)
                    results = await pool.query(query)
                } catch (error) {
                    console.error(error.stack)
                    throw error
                    return null
                }
                // console.log('results', results.rows)
                allTupleIds.push(...results.rows.map(tuple => {
                    return {
                        params: {
                          id: '' + tuple.dd,
                          esp: '' + tuple.esp,
                          gpio: '' + tuple.gp
                        }
                      }
                }))
            }
        }
    }
    // console.log('allTupleIds: ', allTupleIds)
    return allTupleIds
}

// getStaticProps() - filtered table content
export async function getFilteredTupleData(params) { // params:  { id: '24122021', esp: '-1', gpio: '23' }
    const dateAll = isFilterNone(params.id)
    const espAll = isFilterNone(params.esp)
    const gpioAll = isFilterNone(params.gpio)

    let filterDate = ''
    if (!!dateAll) {
        filterDate = 'TRUE'
    } else {
        let datetuple = id2date(params.id)
        let datestring = '' + datetuple.y + '-' + datetuple.m + '-' + datetuple.d
        filterDate = "m.ts >= DATE('" + datestring + "') AND m.ts < (DATE '" + datestring + "' + interval '1 day')"
    }
    const filterEsp = !!espAll ? 'TRUE' : 'm.id_key = ' + params.esp
    const filterGpio = !!gpioAll ? 'TRUE' : 'm.gpio = ' + params.gpio
    const query = "SELECT m.id_key,TO_CHAR(m.ts, 'MM-DD-YYYY HH24:MI:SS') AS to_char,to_char(m.ts, 'DDMMYYYY') AS dd,m.gpio,m.temp,m.hum,w.temp AS w_temp,w.hum AS w_hum,w.pressure FROM measurements m, weather w WHERE m.weather_key = w.key AND " + filterDate + " AND " + filterEsp + " AND " + filterGpio + " ORDER BY m.ts;"
    // console.log('getFilteredTupleData/query: ', query)
    let results
    try {
        results = await pool.query(query)
    } catch (error) {
        console.error(error.stack)
        throw error
        return null
    }
    // console.log('getFilteredTupleData/results.rows: ', results.rows)
    return results.rows
}

/*
export async function getIsFilterNone(val) {
    return val === filterNone
}
*/

// getStaticProps() - table content for a day
export async function getAllTupleData(id) {
    let datetuple = id2date(id)
    let datestring = '' + datetuple.y + '-' + datetuple.m + '-' + datetuple.d
    console.log('datestring: ', datestring)
    let results
    try {
        results = await pool.query("SELECT m.id_key,TO_CHAR(m.ts, 'MM-DD-YYYY HH24:MI:SS'),m.gpio,m.temp,m.hum,w.temp AS w_temp,w.hum AS w_hum,w.pressure FROM measurements m, weather w WHERE m.weather_key = w.key AND m.ts >= DATE('" + datestring + "') AND m.ts < (DATE '" + datestring + "' + interval '1 day') ORDER BY m.ts;")
    } catch (error) {
        throw error
        return null
    }
    // console.log('results', results.rows)
    return results.rows
}