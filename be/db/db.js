// db.js

const { config } = require('../lib/config')
const { Pool } = require('pg');
const pool = new Pool({
  connectionString: process.env.SUPA_DATABASE_URL, // DATABASE_URL
  ssl: {
    rejectUnauthorized: false
  }
});

function insert(req, res) {
  // 0.0.2  const sqlquery = 'INSERT INTO measurements(id_key, gpio, temp, hum) VALUES((SELECT key FROM credentials_ids WHERE id = $1), $2, $3, $4)'
  /* 0.0.4 */ const sqlquery = 'INSERT INTO measurements (id_key, gpio, temp, hum, weather_key) ' +
                                      'VALUES((SELECT key FROM credentials_ids WHERE id = $1), $2, $3, $4, ' +
                                      '(SELECT key FROM weather w1 INNER JOIN (SELECT MAX(ts) tsm FROM weather) w2 ON w1.ts = w2.tsm GROUP BY key))'
  const values = [req.query.id, req.query.in, req.query.temp, req.query.hum]

  pool.connect((err, client, done) => {
    if (err) {
      res.send("Error " + err);
    }
    client.query(sqlquery, values, (err, result) => {
      done()
      if (err) {
        console.log(err.stack)
        console.log("Error " + err)
        res.sendStatus(500)
      } else {
        console.log(result.rows[0])
        res.sendStatus(200)
      }
    })
  })
}

// deliberately error not sent back, only logged to the console - background usage
function appendWeather(data_main) {
  const sqlquery = 'INSERT INTO weather (temp, hum, pressure) VALUES ($1, $2, $3);'
  const values = [data_main.temp, data_main.humidity,data_main.pressure]

  pool.connect((err, client, done) => {
    if (err) {
      console.error("Error " + err);
    }
    client.query(sqlquery, values, (err, result) => {
      done()
      if (err) {
        console.error(err.stack)
        console.error("Error(1) " + err)
      } else {
        console.log(result.rows[0])
      }
    })
  })
}

// deliberately error not sent back, only logged to the console - background usage
function getWeatherInterval(callback) {
  const interval = config.pollinterval
  const sqlquery = `select EXTRACT(EPOCH FROM (now() - max(ts) - interval '${interval}')) AS interval from weather;`
  // console.log('sqlquery: ', sqlquery)

  pool.connect((err, client, done) => {
    if (err) {
      console.error("Error(2) " + err);
    }
    client.query(sqlquery, (err, result) => {
      done()
      if (err) {
        console.error(err.stack)
        console.error("Error(3) " + err)
      } else {
        console.log('getWeatherInterval: ', result.rows[0])
        callback(result.rows[0].interval)
      }
    })
  })

}

async function db_test(req, res) {
    try {
      const client = await pool.connect();
      const result = await client.query('SELECT * FROM test_table');
      const results = { 'results': (result) ? result.rows : null};
      console.log(JSON.stringify(results))
      res.status(200).json(results );
      client.release();
    } catch (err) {
      console.error(err);
      res.send("Error " + err);
    }
};

module.exports = {
  insert: insert,
  appendWeather: appendWeather,
  getWeatherInterval: getWeatherInterval,
  test: db_test
}