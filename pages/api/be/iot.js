// iot.js

const db = require("../../../be/db/db");
const auth = require('../../../be/lib/authentication.js')
const weather = require('../../../be/lib/weather-api')

/*
app.get('/', function (req, res) {
    console.log('received connection from: ', req.ip, req.ips)
    console.log('  Parameters: ', req.params)
    console.log('  Query: ', req.query)
    db.insert(req,res)
    weather.logWeather()
})*/

export default function handler(req, res) {
    // console.log('iot.js:handler')
    return new Promise((resolve) => {
        try {
            auth(req, res, (err) => {
                if (!err) {
                    weather.logWeather(() => { // TODO: relocate logWeather() to a separate cron activated endpoint
                        db.insert(req,res)
                    })
                } else {
                    throw err
                }
            })  
        } catch (error) {
            console.error(JSON.stringify(error));
            res.status(error.status || 500).send(error.message || 'Internal server error');
            return resolve()
        }
    })
}